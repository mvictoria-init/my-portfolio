import { PortfolioData } from "./type";

export const DATA: PortfolioData = {
  profile: {
    name: "María Victoria Bastardo Guerra",
    role: { es: "Ingeniera de Sistemas & Full-Stack Developer", en: "Systems Engineer & Full-Stack Developer" },
    about: {
      es: "Ingeniera de Sistemas especializada en desarrollo Full-Stack. Transformo problemas complejos en soluciones elegantes usando React, Python y arquitecturas escalables. Me apasiona fusionar la lógica del backend con experiencias de usuario fluidas y creativas.",
      en: "Systems Engineer specializing in Full-Stack development. I transform complex problems into elegant solutions using React, Python, and scalable architectures. I am passionate about merging backend logic with fluid and creative user experiences."
    },
    location: "Maturín, Venezuela",
    email: "marial5victoria1998@gmail.com",
    linkedin: "https://www.linkedin.com/in/maria-victoria-bastardo-guerra/",
    github: "https://github.com/mvictoria-init"
  },
  experience: [
    {
      company: "CapyMara",
      role: { es: "Co-Fundador & Full-Stack Dev", en: "Co-Founder & Full-Stack Dev" },
      period: "2024 - Present",
      desc: {
        es: "Liderazgo técnico y desarrollo integral de la plataforma. Arquitectura de APIs y optimización de frontend.",
        en: "Technical leadership and comprehensive platform development. API architecture and frontend optimization."
      },
      stack: ["React", "Python", "Django", "Tailwind"],
      achievements: [
        { es: "Mejora del 30% en velocidad de carga del frontend.", en: "30% improvement in frontend load speed." },
        { es: "Diseño y desarrollo de capymara.com", en: "Design and development of capymara.com" }
      ]
    },
    {
      company: "Freelance",
      role: { es: "Backend Developer (Gaming)", en: "Backend Developer (Gaming)" },
      period: "Present",
      desc: {
        es: "Desarrollo de sistemas complejos para videojuegos, incluyendo misiones y recompensas.",
        en: "Development of complex systems for video games, including missions and rewards."
      },
      stack: ["Python", "Django REST", "PostgreSQL", "JWT"],
      achievements: [
        { es: "Automatización 100% del flujo de misiones.", en: "100% automation of mission flow." },
        { es: "Sistema de puntos y validación automática.", en: "Points system and automatic validation." }
      ]
    },
    {
      company: "CANTV",
      role: { es: "Pasante - Automatización", en: "Intern - Automation" },
      period: "2022 - 2023",
      desc: {
        es: "Automatización de reportes y gestión de coordinación de energía.",
        en: "Automation of reports and energy coordination management."
      },
      stack: ["Flutter", "Django", "SQL", "Analytics"],
      achievements: [
        { es: "Automatización del 40% de reportes manuales.", en: "Automation of 40% of manual reports." },
        { es: "Centralización de datos en plataforma unificada.", en: "Data centralization in a unified platform." }
      ]
    }
  ],
  projects: [
    {
      title: "CapyMara Web",
      desc: { es: "Plataforma web optimizada con React y Django.", en: "Optimized web platform with React and Django." },
      tags: ["React", "Django", "Tailwind"],
      link: "https://capymara.com",
      color: "from-pink-500 to-rose-500"
    },
    {
      title: "Game Rewards API",
      desc: { es: "Backend robusto para gestión de misiones en juegos.", en: "Robust backend for game mission management." },
      tags: ["Python", "DRF", "PostgreSQL"],
      color: "from-purple-500 to-indigo-500"
    },
    {
      title: "Doc Gen API",
      desc: { es: "API para generación automática de documentos Word.", en: "API for automated Word document generation." },
      tags: ["Python-docx", "API REST"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "CANTV Dashboard",
      desc: { es: "Sistema de gestión de energía y climatización.", en: "Energy and climate management system." },
      tags: ["Flutter", "Python", "SQL"],
      color: "from-emerald-500 to-teal-500"
    }
  ],
  skills: {
    frontend: ["React", "TypeScript", "Tailwind CSS", "Flutter", "Figma"],
    backend: ["Python", "Django REST", "PostgreSQL", "APIs Design"],
    tools: ["Git", "Docker", "VS Code", "Postman"],
    soft: {
      es: ["Creatividad", "Liderazgo", "Comunicación", "Resolución de Problemas"],
      en: ["Creativity", "Leadership", "Communication", "Problem Solving"]
    }
  },
  education: [
    {
      degree: { es: "Ingeniería de Sistemas", en: "Systems Engineering" },
      institution: "Universidad de Oriente",
      year: "2024"
    }
  ]
};