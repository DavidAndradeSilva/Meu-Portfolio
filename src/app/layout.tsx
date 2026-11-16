import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "../contexts/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "David Andrade | Back-End Developer",
  description:
    "Portfólio de David Andrade - Desenvolvedor Back-End. Foco em APIs REST, bancos de dados, Java, Python, lógica de programação e construção de soluções funcionais.",
  keywords: [
    "David Andrade",
    "Back-End Developer",
    "Desenvolvedor Back-End",
    "Desenvolvimento Back-End",
    "APIs REST",
    "Java",
    "Python",
    "MySQL",
    "Banco de Dados",
    "Portfolio",
    "Node.js",
    "Git",
  ],
  authors: [{ name: "David Andrade" }],
  openGraph: {
    title: "David Andrade | Back-End Developer",
    description:
      "Desenvolvedor Back-End focado em APIs REST, bancos de dados e soluções funcionais.",
    type: "website",
    locale: "pt_BR",
    siteName: "David Andrade Portfolio",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} antialiased scroll-smooth`}
    >
      <body className="bg-[#0a0a1a] text-[#ededed] min-h-screen">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
