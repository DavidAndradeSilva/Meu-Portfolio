"use client";

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";

type Locale = "pt-BR" | "en";

interface Translations {
  nav: Record<string, string>;
  hero: { badge: string; tagline: string };
  terminal: { whoamiCmd: string; whoamiOut: string; skillsCmd: string; skillsOut: string };
  about: { title: string; titleSpan: string; p1: string; p2a: string; p2b: string; p3: string; highlights: string[] };
  tech: { title: string };
  projects: { title: string; titleSpan: string; view: string; code: string; empty: string; fallbackDesc: string };
  projectDesc: Record<string, string>;
  contact: { title: string; titleSpan: string; desc: string; click: string };
  footer: { rights: string };
  loading: { text: string };
  journey: {
    subtitle: string;
    s1Title: string;
    s1Institution: string;
    s1Period: string;
    s1Desc: string;
    s2Title: string;
    s2Institution: string;
    s2Period: string;
    s2Desc: string;
  };
}

const translations: Record<Locale, Translations> = {
  "pt-BR": {
    nav: {
      "#hero": "Início",
      "#about": "Sobre",
      "#journey": "Jornada",
      "#technologies": "Tecnologias",
      "#projects": "Projetos",
      "#contact": "Contato",
    },
    hero: {
      badge: "Desenvolvedor Back-End",
      tagline:
        "Estudante de Ciência da Computação e Técnico em Desenvolvimento de Sistemas, com foco em desenvolvimento Back-End, APIs, bancos de dados e construção de soluções funcionais.",
    },
    terminal: {
      whoamiCmd: "whoami",
      whoamiOut: "David Andrade - Desenvolvedor Back-End",
      skillsCmd: "cat skills.txt",
      skillsOut: "Java, Python, MySQL, APIs REST",
    },
    about: {
      title: "Sobre",
      titleSpan: "Mim",
      p1: "Sou um desenvolvedor Back-End apaixonado por tecnologia, sempre em busca de evolução constante. Meu foco está em desenvolvimento Back-End: APIs REST, bancos de dados e lógica de programação, transformando ideias em soluções funcionais e eficientes.",
      p2a: "Através de projetos pessoais e aprendizado contínuo, venho trabalhando com tecnologias como",
      p2b: "aplicando boas práticas de programação, lógica, banco de dados e integração de APIs em cada projeto.",
      p3: "Acredito que a tecnologia tem o poder de transformar vidas e estou comprometido em construir soluções Back-End sólidas e escaláveis que façam a diferença, combinando código limpo, boas práticas e as melhores ferramentas do mercado.",
      highlights: [
        "Lógica de programação",
        "Orientação a Objetos",
        "APIs REST",
        "Banco de Dados",
      ],
    },
    tech: {
      title: "Tecnologias",
    },
    projects: {
      title: "Meus",
      titleSpan: "Projetos",
      view: "Ver Projeto",
      code: "Código",
      empty: "Nenhum repositório encontrado no momento.",
      fallbackDesc: "Projeto desenvolvido com tecnologias modernas.",
    },
    projectDesc: {
      EstacaoAkira:
        "Projeto mobile focado em informações climáticas, utilizando React Native, Expo e APIs REST para exibir dados meteorológicos através de dashboards interativos.",
      controle_do_mes:
        "App de controle financeiro pessoal para registrar e acompanhar os gastos do mês de forma simples e organizada, com dashboard interativo e categorização de despesas.",
      "sistema-folha-pagamento-java":
        "Sistema de folha de pagamento completo em Java, com lógica de cálculo de salários, descontos e geração de relatórios.",
    },
    contact: {
      title: "Entre em",
      titleSpan: "Contato",
      desc: "Vamos trabalhar juntos? Estou aberto a novas oportunidades e colaborações.",
      click: "Clique para abrir",
    },
    footer: {
      rights: "Todos os direitos reservados.",
    },
    loading: {
      text: "Carregando...",
    },
    journey: {
      subtitle: "Minha trajetória na tecnologia.",
      s1Title: "Desenvolvimento de Sistemas",
      s1Institution: "SENAI — Curso Técnico",
      s1Period: "Jan 2024 — Dez 2025",
      s1Desc: "Formação técnica focada em lógica de programação, desenvolvimento de software, banco de dados, Java, desenvolvimento web, versionamento com Git e boas práticas de desenvolvimento.",
      s2Title: "Ciência da Computação",
      s2Institution: "Universidade Anhembi Morumbi — Graduação",
      s2Period: "Jan 2026 — Dez 2029",
      s2Desc: "Graduação voltada para engenharia de software, algoritmos, estruturas de dados, inteligência artificial, computação em nuvem, banco de dados e desenvolvimento de aplicações escaláveis.",
    },
  },
  en: {
    nav: {
      "#hero": "Home",
      "#about": "About",
      "#journey": "Journey",
      "#technologies": "Technologies",
      "#projects": "Projects",
      "#contact": "Contact",
    },
    hero: {
      badge: "Back-End Developer",
      tagline:
        "Computer Science student and Systems Development Technician, focused on Back-End development, APIs, databases, and building functional solutions.",
    },
    terminal: {
      whoamiCmd: "whoami",
      whoamiOut: "David Andrade - Back-End Developer",
      skillsCmd: "cat skills.txt",
      skillsOut: "Java, Python, MySQL, REST APIs",
    },
    about: {
      title: "About",
      titleSpan: "Me",
      p1: "I am a Back-End developer passionate about technology, always seeking constant evolution. My focus is on Back-End development: REST APIs, databases, and programming logic, turning ideas into functional and efficient solutions.",
      p2a: "Through personal projects and continuous learning, I have been working with technologies such as",
      p2b: "applying best practices in programming, logic, databases, and API integration in every project.",
      p3: "I believe technology has the power to transform lives, and I am committed to building solid, scalable Back-End solutions that make a difference, combining clean code, best practices, and the best tools in the market.",
      highlights: [
        "Programming logic",
        "Object-Oriented Programming",
        "REST APIs",
        "Databases",
      ],
    },
    tech: {
      title: "Technologies",
    },
    projects: {
      title: "My",
      titleSpan: "Projects",
      view: "View Project",
      code: "Code",
      empty: "No repositories found at the moment.",
      fallbackDesc: "Project built with modern technologies.",
    },
    projectDesc: {
      EstacaoAkira:
        "Mobile project focused on climate information, using React Native, Expo and REST APIs to display weather data through interactive dashboards.",
      controle_do_mes:
        "Personal finance tracking app to record and monitor monthly expenses in a simple, organized way, with an interactive dashboard and expense categorization.",
      "sistema-folha-pagamento-java":
        "Complete payroll system in Java, with salary and deduction calculation logic and report generation.",
    },
    contact: {
      title: "Get in",
      titleSpan: "Touch",
      desc: "Let's work together? I'm open to new opportunities and collaborations.",
      click: "Click to open",
    },
    footer: {
      rights: "All rights reserved.",
    },
    loading: {
      text: "Loading...",
    },
    journey: {
      subtitle: "My journey in technology.",
      s1Title: "Systems Development",
      s1Institution: "SENAI — Technical Course",
      s1Period: "Jan 2024 — Dec 2025",
      s1Desc: "Technical education focused on programming logic, software development, databases, Java, web development, Git versioning, and development best practices.",
      s2Title: "Computer Science",
      s2Institution: "Anhembi Morumbi University — Bachelor's",
      s2Period: "Jan 2026 — Dec 2029",
      s2Desc: "Bachelor's degree focused on software engineering, algorithms, data structures, artificial intelligence, cloud computing, databases, and scalable application development.",
    },
  },
};

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("pt-BR");

  useEffect(() => {
    let cancelled = false;
    const timer = setTimeout(() => {
      if (cancelled) return;
      const stored = localStorage.getItem("locale") as Locale | null;
      if (stored && translations[stored]) {
        setLocaleState(stored);
      } else {
        const browserLang = navigator.language;
        const detected = browserLang.startsWith("en") ? "en" : "pt-BR";
        setLocaleState(detected);
        localStorage.setItem("locale", detected);
      }
    }, 0);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("locale", newLocale);
  }, []);

  const value: LanguageContextType = {
    locale,
    setLocale,
    t: translations[locale],
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
