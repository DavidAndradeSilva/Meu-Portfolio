"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface TermLine {
  prompt: boolean;
  text: string;
}

export default function FakeTerminal() {
  const { locale, t } = useLanguage();

  const lines = useMemo(
    () => [
      { prompt: true, text: t.terminal.whoamiCmd },
      { prompt: false, text: t.terminal.whoamiOut },
      { prompt: true, text: t.terminal.skillsCmd },
      { prompt: false, text: t.terminal.skillsOut },
    ],
    [t]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
      className="w-full max-w-md mx-auto"
    >
      <div className="relative rounded-xl overflow-hidden bg-[#0d1117] border border-[#30363d] shadow-lg shadow-blue-500/5">
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[#30363d] bg-[#161b22]">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 text-[8px] tracking-widest text-[#8b949e] uppercase font-mono">bash</span>
        </div>
        <TerminalContent key={locale} lines={lines} />
      </div>
    </motion.div>
  );
}

function TerminalContent({ lines }: { lines: TermLine[] }) {
  const [displayed, setDisplayed] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  const typeLine = useCallback(
    (full: string, lineIndex: number) =>
      new Promise<void>((resolve) => {
        let charIndex = 0;
        const interval = setInterval(() => {
          charIndex++;
          setDisplayed((prev) => {
            const updated = [...prev];
            updated[lineIndex] = full.slice(0, charIndex);
            return updated;
          });
          if (charIndex >= full.length) {
            clearInterval(interval);
            resolve();
          }
        }, 32);
      }),
    []
  );

  useEffect(() => {
    let cancelled = false;

    (async () => {
      for (let i = 0; i < lines.length; i++) {
        if (cancelled) return;
        setDisplayed((prev) => [...prev, ""]);
        await new Promise((r) => setTimeout(r, 160));
        if (cancelled) return;
        await typeLine(lines[i].text, i);
      }
      if (!cancelled) setDone(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [lines, typeLine]);

  return (
    <div className="p-5 font-mono text-sm leading-relaxed min-h-[160px]">
      {displayed.map((line, i) => (
        <div key={i} className="flex">
          <span className="text-[#8b949e] mr-3 select-none w-4 text-right shrink-0">
            {i + 1}
          </span>
          <span className="min-w-0">
            {lines[i]?.prompt && (
              <span className="text-[#58a6ff] select-none">$ </span>
            )}
            <span className={lines[i]?.prompt ? "text-[#e6edf3]" : "text-[#3fb950]"}>
              {line || " "}
            </span>
          </span>
        </div>
      ))}
      {!done && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity }}
          className="inline-block w-[6px] h-4 bg-[#58a6ff] align-middle ml-0.5"
        />
      )}
    </div>
  );
}