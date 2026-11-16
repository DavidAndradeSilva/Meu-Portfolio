"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiExternalLink, FiGithub, FiFolder, FiSmartphone } from "react-icons/fi";
import { useLanguage } from "@/contexts/LanguageContext";
import EstacaoAkiraIcon from "./EstacaoAkiraIcon";

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  language: string;
}

const repoSlugs = ["EstacaoAkira", "controle_do_mes", "sistema-folha-pagamento-java"];

const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Java: "#b07219",
  HTML: "#e34f26",
  CSS: "#1572b6",
};

const fallbackRepos: Repo[] = [
  {
    id: 1,
    name: "EstacaoAkira",
    description:
      "Projeto mobile focado em informações climáticas, utilizando React Native, Expo e APIs REST para exibir dados meteorológicos através de dashboards interativos.",
    html_url: "https://github.com/DavidSenai/EstacaoAkira",
    homepage: "",
    language: "JavaScript",
  },
  {
    id: 2,
    name: "controle_do_mes",
    description:
      "App de controle financeiro pessoal para registrar e acompanhar os gastos do mês de forma simples e organizada, com dashboard interativo e categorização de despesas.",
    html_url: "https://github.com/DavidSenai/controle_do_mes",
    homepage: "",
    language: "JavaScript",
  },
  {
    id: 3,
    name: "sistema-folha-pagamento-java",
    description:
      "Sistema de folha de pagamento completo em Java, com lógica de cálculo de salários, descontos e geração de relatórios.",
    html_url: "https://github.com/DavidSenai/sistema-folha-pagamento-java",
    homepage: "",
    language: "Java",
  },
];

export default function Projects() {
  const { t } = useLanguage();
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    Promise.all(
      repoSlugs.map((slug) =>
        fetch(`https://api.github.com/repos/DavidSenai/${slug}`)
          .then((res) => (res.ok ? (res.json() as Promise<Repo>) : null))
          .catch(() => null)
      )
    ).then((results) => {
      if (cancelled) return;
      const merged = results.map((repo, i) => repo ?? fallbackRepos[i]);
      setRepos(merged.filter((repo): repo is Repo => repo !== undefined));
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="projects" className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="section-title"
        >
          {t.projects.title} <span>{t.projects.titleSpan}</span>
        </motion.h2>

        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="glass rounded-2xl p-6 animate-pulse">
                <div className="w-10 h-10 rounded-xl bg-white/5 mb-4" />
                <div className="h-5 bg-white/5 rounded w-3/4 mb-3" />
                <div className="h-4 bg-white/5 rounded w-full mb-2" />
                <div className="h-4 bg-white/5 rounded w-2/3 mb-4" />
                <div className="flex gap-3">
                  <div className="h-10 bg-white/5 rounded-xl flex-1" />
                  <div className="h-10 bg-white/5 rounded-xl flex-1" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo, i) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div className="absolute -inset-[1px] bg-gradient-to-br from-blue-500/0 via-cyan-500/0 to-blue-500/0 group-hover:from-blue-500/30 group-hover:via-cyan-500/20 group-hover:to-blue-500/30 rounded-2xl blur-sm transition-all duration-500 opacity-0 group-hover:opacity-100" />
                <div className="glass glass-hover rounded-2xl p-6 h-full flex flex-col transition-all duration-300 border border-transparent hover:border-blue-500/30 relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                      {repo.name === "EstacaoAkira" ? (
                        <EstacaoAkiraIcon className="w-5 h-5 text-blue-400" />
                      ) : (
                        <FiFolder className="w-5 h-5 text-blue-400" />
                      )}
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors capitalize">
                    {repo.name.replace(/[-_]/g, " ")}
                  </h3>

                  <p className="text-gray-400 text-sm mb-4 flex-1 leading-relaxed">
                    {t.projectDesc[repo.name] || repo.description || t.projects.fallbackDesc}
                  </p>

                  {repo.language && (
                    <div className="flex items-center gap-2 mb-4">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{
                          backgroundColor: languageColors[repo.language] || "#60a5fa",
                        }}
                      />
                      <span className="text-xs text-gray-500">{repo.language}</span>
                    </div>
                  )}

                  <div className="flex gap-3 mt-auto">
                    {repo.homepage && repo.name !== "EstacaoAkira" && (
                      <motion.a
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl"
                      >
                        <FiExternalLink className="w-4 h-4" />
                        {t.projects.view}
                      </motion.a>
                    )}
                    {repo.name === "EstacaoAkira" &&
                      (repo.homepage ? (
                        <motion.a
                          href={repo.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium glass glass-hover text-gray-300 rounded-xl"
                        >
                          <FiSmartphone className="w-4 h-4" />
                          Mobile
                        </motion.a>
                      ) : (
                        <div className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium glass glass-hover text-gray-300 rounded-xl opacity-60">
                          <FiSmartphone className="w-4 h-4" />
                          Mobile
                        </div>
                      ))}
                    <motion.a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium glass glass-hover text-gray-300 rounded-xl ${
                        repo.homepage || repo.name === "EstacaoAkira" ? "" : "flex-1"
                      }`}
                    >
                      <FiGithub className="w-4 h-4" />
                      {t.projects.code}
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && repos.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-gray-500">
              {t.projects.empty}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}