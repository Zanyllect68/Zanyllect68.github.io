export const NAV_LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Sobre mí', href: '#sobre-mi' },
  { label: 'Experiencia', href: '#experiencia' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Blog', href: '#blog' },
  { label: 'Educación', href: '#educacion' },
  { label: 'Certificaciones', href: '#certificaciones' },
  { label: 'Contacto', href: '#contacto' },
] as const

export const SOCIALS = {
  github: 'https://github.com/Zanyllect68',
  linkedin: 'https://www.linkedin.com/in/andres-felipe-galeano-tellez-a7285a250',
  email: 'andres.galeano@usantoto.edu.co',
  phone: '+57 316 368 4112',
}

export const ROLES = [
  'Data Engineer',
  'AI Engineer',
  'Software Engineer',
  'Especialista en Ciencia de Datos',
]

export const STATS = [
  { value: 10, suffix: '+', label: 'Tecnologías' },
  { value: 7, suffix: '', label: 'Certificaciones' },
]

export type TimelineItem = {
  title: string
  org: string
  period: string
  description: string
  tags?: string[]
}

export const EDUCATION: TimelineItem[] = [
  {
    title: 'Ingeniería de Sistemas',
    org: 'Universidad Santo Tomás',
    period: 'ene. 2022 — nov. 2026',
    description: 'Formación en fundamentos de software, algoritmos, estructuras de datos, arquitectura de sistemas y fundamentos de DevOps.',
    tags: ['Ingeniería de sistemas', 'Fundamentos de DevOps'],
  },
  {
    title: 'Ingeniería de Datos e Inteligencia Artificial',
    org: 'Universidad Santo Tomás',
    period: 'ago. 2026 — ago. 2028',
    description: 'Enfoque en pipelines de datos, machine learning e inteligencia artificial aplicada, con almacenamiento y bases de datos.',
    tags: ['Almacenamiento de datos', 'Bases de datos'],
  },
  {
    title: 'Especialización en Ciencia de Datos',
    org: 'Universidad Santo Tomás',
    period: 'ago. 2026 — ago. 2027',
    description: 'Análisis estadístico avanzado, modelado predictivo, visualización de datos y analítica moderna.',
    tags: ['Estadística', 'Visualización de datos'],
  },
  {
    title: 'IA Generativa: Ingeniería de Prompts y Agentes Inteligentes',
    org: 'Universidad de La Sabana',
    period: 'may. 2026 — ago. 2026',
    description: 'Diplomado en IA generativa, ingeniería de prompts y construcción de agentes inteligentes.',
    tags: ['IA generativa', 'Agentes inteligentes'],
  },
  {
    title: 'Arquitectura de Software',
    org: 'Universidad de La Sabana',
    period: 'ene. 2026 — mar. 2026',
    description: 'Diplomado en patrones de diseño, arquitectura en la nube y arquitecturas escalables.',
    tags: ['Arquitectura en la nube', 'Patrones de diseño'],
  },
  {
    title: 'Data Science en People Analytics',
    org: 'Universidad del Rosario',
    period: 'feb. 2025 — may. 2025',
    description: 'Diplomado en aplicación de ciencia de datos a analítica de personas con Microsoft Power BI.',
    tags: ['Microsoft Power BI', 'People Analytics'],
  },
  {
    title: 'Excel',
    org: 'Universidad EAN',
    period: 'jun. 2024 — ago. 2024',
    description: 'Diplomado en análisis avanzado, tablas dinámicas y modelado de datos en hojas de cálculo.',
    tags: ['Microsoft Excel', 'Modelo de datos'],
  },
]

export type Certification = {
  name: string
  org: string
  year: string
  description: string
}

export const CERTIFICATIONS: Certification[] = [
  {
    name: 'Google Data Analytics',
    org: 'Google',
    year: '2024',
    description: 'Análisis de datos, limpieza, visualización y toma de decisiones basada en datos.',
  },
  {
    name: 'Snowflake',
    org: 'Snowflake',
    year: '2024',
    description: 'Data warehousing en la nube, modelado y consultas analíticas escalables.',
  },
  {
    name: 'Deep Learning Specialization',
    org: 'DeepLearning.AI',
    year: '2024',
    description: 'Redes neuronales, deep learning y fundamentos de inteligencia artificial.',
  },
  {
    name: 'Hedera',
    org: 'Hedera',
    year: '2023',
    description: 'Tecnologías de contabilidad distribuida y desarrollo Web3.',
  },
  {
    name: 'Python',
    org: 'Certificación Profesional',
    year: '2023',
    description: 'Programación orientada a objetos, scripting y automatización con Python.',
  },
  {
    name: 'Excel',
    org: 'Certificación Profesional',
    year: '2022',
    description: 'Análisis avanzado, tablas dinámicas y modelado de datos en hojas de cálculo.',
  },
  {
    name: 'MySQL',
    org: 'Certificación Profesional',
    year: '2022',
    description: 'Diseño de bases de datos relacionales, consultas y optimización SQL.',
  },
]

export const EXPERIENCE: TimelineItem[] = [
  {
    title: 'Ciberseguridad como hobby',
    org: 'TryHackMe',
    period: 'ene. 2023 — Actualidad',
    description: 'En mi tiempo libre exploro ciberseguridad como hobby a través de laboratorios prácticos en TryHackMe.',
    tags: ['Hobby', 'Top 4% global', '120+ rooms', 'Ciberseguridad'],
  },
  {
    title: 'Desarrollador de proyectos académicos',
    org: 'Universidad Santo Tomás — Seccional Tunja',
    period: 'ene. 2023 — Actualidad',
    description: 'Desarrollo de proyectos académicos aplicando buenas prácticas de ingeniería, backend, datos e IA generativa. Código público en GitHub, control de versiones con Git, documentación y despliegue reproducible. Destacan PRICEPULSE-AI, CMS Multipaís y Sistema PQRS.',
    tags: ['Backend', 'IA generativa', 'Git', 'Docker'],
  },
]

export type Project = {
  title: string
  description: string
  stack: string[]
  repo: string
  index: string
  period: string
}

export const PROJECTS: Project[] = [
  {
    title: 'pricepulse-ai',
    description: 'Sistema automatizado de análisis de precios en e-commerce con IA generativa. Agentes CrewAI, inferencia con NVIDIA NIM, captura de datos con SerpAPI, orquestación de flujos con n8n y contenerización con Docker.',
    stack: ['Python', 'CrewAI', 'NVIDIA NIM', 'SerpAPI', 'n8n', 'Docker'],
    repo: 'https://github.com/AndresF-GaleanoT/pricepulse-ai',
    index: '01',
    period: 'jul. 2026 — Actualidad',
  },
  {
    title: 'CMS Multipaís',
    description: 'API REST + Frontend para sistema de gestión de contenidos multi-país. Express (Node.js), Supabase (PostgreSQL) y Arquitectura Hexagonal para separar la lógica de negocio de la infraestructura.',
    stack: ['JavaScript', 'Node.js', 'Express', 'Supabase', 'Arquitectura Hexagonal'],
    repo: SOCIALS.github,
    index: '02',
    period: 'abr. 2026 — jul. 2026',
  },
  {
    title: 'Sistema PQRS',
    description: 'Sistema web para la gestión y seguimiento de solicitudes PQRS (Peticiones, Quejas, Reclamos y Sugerencias), desarrollado en equipo con arquitectura orientada a servicios y persistencia relacional.',
    stack: ['Java', 'Spring Boot', 'JPA', 'PostgreSQL'],
    repo: SOCIALS.github,
    index: '03',
    period: 'ago. 2025 — sept. 2025',
  },
  {
    title: 'Vibe Coders League — Platzi',
    description: 'Repositorio oficial para la segunda edición de la Vibe Coders League. Documento y programo soluciones a retos diarios con IA: asistentes virtuales, apps full-stack y más. Stack: Next.js 16, React 19, TypeScript, Tailwind CSS, shadcn/ui, Vercel AI SDK, Llama 3.1.',
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Vercel AI SDK', 'Llama 3.1'],
    repo: 'https://github.com/Zanyllect68/platzi-vibe-coders-league-2026',
    index: '04',
    period: '2026',
  },
]

export type BlogPost = {
  title: string
  category: string
  excerpt: string
  date: string
  readTime: string
}

export const BLOG_CATEGORIES = [
  'Data Engineering', 'Python', 'SQL', 'Machine Learning', 'Cloud', 'Docker', 'IA',
]

export const BLOG_POSTS: BlogPost[] = [
  {
    title: 'Construyendo pipelines ETL idempotentes con Python',
    category: 'Data Engineering',
    excerpt: 'Estrategias para diseñar pipelines de datos reproducibles, tolerantes a fallos y fáciles de reprocesar.',
    date: '2025-11-02', readTime: '8 min',
  },
  {
    title: 'Modelado dimensional en Snowflake: buenas prácticas',
    category: 'SQL',
    excerpt: 'Cómo estructurar esquemas estrella y copo de nieve para analítica de alto rendimiento en la nube.',
    date: '2025-10-18', readTime: '6 min',
  },
  {
    title: 'Contenedores para Data Engineering con Docker Compose',
    category: 'Docker',
    excerpt: 'Orquestando entornos reproducibles de desarrollo con bases de datos y workers en contenedores.',
    date: '2025-10-05', readTime: '7 min',
  },
  {
    title: 'Análisis de logs para detección de amenazas',
    category: 'Cloud',
    excerpt: 'Técnicas prácticas de parsing y correlación de logs para identificar comportamiento anómalo.',
    date: '2025-09-21', readTime: '5 min',
  },
  {
    title: 'Fundamentos de redes neuronales explicados',
    category: 'Machine Learning',
    excerpt: 'Una guía intuitiva sobre forward pass, backpropagation y funciones de activación.',
    date: '2025-09-08', readTime: '10 min',
  },
  {
    title: 'FastAPI en producción: patrones y despliegue',
    category: 'Python',
    excerpt: 'Estructura de proyecto, validación con Pydantic y despliegue de APIs con contenedores.',
    date: '2025-08-27', readTime: '6 min',
  },
]

export const GITHUB = {
  username: 'Zanyllect68',
  repos: [
    { name: 'sistema-pqrs', lang: 'Java', stars: 12, desc: 'Gestión PQRS con Spring Boot' },
    { name: 'cms-multiplatform', lang: 'Python', stars: 9, desc: 'CMS con FastAPI y Docker' },
    { name: 'etl-toolkit', lang: 'Python', stars: 7, desc: 'Utilidades para pipelines ETL' },
    { name: 'snowflake-models', lang: 'SQL', stars: 5, desc: 'Modelos dimensionales analíticos' },
  ],
  languages: [
    { name: 'Python', pct: 46 },
    { name: 'SQL', pct: 24 },
    { name: 'Java', pct: 18 },
    { name: 'Shell', pct: 12 },
  ],
}
