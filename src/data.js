export const services = [
  {
    id: 1,
    title: 'Desarrollo de Plataformas Web',
    titleEn: 'Web Platform Development',
    icon: '🖥️',
    description: 'Sistemas full-stack escalables para empresas, integrando UI/UX de alto nivel y arquitecturas sólidas.',
    descriptionEn: 'Scalable full-stack systems for enterprises, integrating high-level UI/UX design and solid software architectures.'
  },
  {
    id: 2,
    title: 'Análisis de Datos e IA',
    titleEn: 'Data Analytics & AI',
    icon: '📊',
    description: 'Dashboards ejecutivos e inteligencia comercial para convertir métricas complejas en decisiones estratégicas.',
    descriptionEn: 'Executive dashboards and business intelligence solutions that turn complex metrics into actionable strategic decisions.'
  },
  {
    id: 3,
    title: 'Automatización de Procesos',
    titleEn: 'Process Automation',
    icon: '⚙️',
    description: 'Eliminación de tareas manuales con software a medida, sincronización en tiempo real e integración de sistemas.',
    descriptionEn: 'Elimination of manual tasks through custom software, real-time synchronization, and seamless system integration.'
  },
  {
    id: 4,
    title: 'Infraestructura & Soporte TI',
    titleEn: 'IT Infrastructure & Support',
    icon: '🛡️',
    description: 'Plataformas ITSM, gestión centralizada de activos, monitoreo de dispositivos y gestión de SLAs.',
    descriptionEn: 'ITSM platforms, centralized asset management, device monitoring, and SLA governance.'
  }
];

export const categorizedSkills = [
  {
    category: 'Frontend',
    categoryEn: 'Frontend',
    skills: [
      { name: 'JavaScript', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'TypeScript', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'React', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Next.js', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' }
    ]
  },
  {
    category: 'Backend & Real-Time',
    categoryEn: 'Backend & Real-Time',
    skills: [
      { name: 'Node.js', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Python', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'Java', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
      { name: 'WebSockets', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg' }
    ]
  },
  {
    category: 'Data & Analytics',
    categoryEn: 'Data & Analytics',
    skills: [
      { name: 'PostgreSQL', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
      { name: 'SQL', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
      { name: 'Análisis de Datos', nameEn: 'Data Analysis', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg' }
    ]
  },
  {
    category: 'DevOps & Infraestructura',
    categoryEn: 'DevOps & Infrastructure',
    skills: [
      { name: 'Docker', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
      { name: 'Git', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'Linux', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' }
    ]
  }
];

export const projectsData = [
  {
    id: 6,
    title: 'Gestión de Servicios TI (GLPI)',
    titleEn: 'IT Service Management (GLPI)',
    description: `Diseño, configuración e implementación desde cero de una plataforma ITSM basada en GLPI para una organización de más de 300 usuarios. El proyecto incluyó catálogo de servicios, gestión de activos, SLAs, flujos de atención y un programa de adopción cultural del sistema.

Logro principal:
Reducción notable en tiempos de atención a usuarios al pasar de un proceso informal (correo/verbal) a un sistema estructurado con prioridades, SLAs y trazabilidad completa de cada solicitud. (+300 Usuarios atendidos, 3-6 Meses de implementación).

Entregables clave:
• Catálogo de servicios TI: Definición y clasificación de servicios disponibles.
• SLAs y tiempos de atención: Reglas de escalamiento, prioridades y medición.
• Gestión de activos (FusionInventory): Inventario automatizado integrado al sistema.
• Flujos de soporte: Reglas de asignación automática, categorías y grupos.
• Capacitación: Talleres para adopción del sistema como canal oficial de soporte.`,
    descriptionEn: `Full design, configuration, and implementation from scratch of a GLPI-based ITSM platform for an organization with over 300 users. The project included a service catalog, asset management, SLAs, support workflows, and a cultural adoption program.

Key Achievement:
Significant reduction in user response times by replacing an informal process (email/verbal) with a structured system featuring priorities, SLAs, and full request traceability. (+300 Users served, 3–6 months of implementation).

Key Deliverables:
• IT Service Catalog: Definition and classification of all available services.
• SLAs and Response Times: Escalation rules, priority levels, and performance measurement.
• Asset Management (FusionInventory): Automated inventory fully integrated with the platform.
• Support Workflows: Automatic assignment rules, categories, and team groups.
• Training: Workshops to drive system adoption as the official support channel.`,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000',
    youtubeIds: ['wV8AmYiWMPw', '0zehoKQrgUc'],
    technologies: ['GLPI', 'FusionInventory', 'ITSM', 'SLA', 'Soporte TI'],
    technologiesEn: ['GLPI', 'FusionInventory', 'ITSM', 'SLA', 'IT Support'],
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    id: 7,
    title: 'Plataforma Web Transportes Alegra',
    titleEn: 'Transportes Alegra Corporate Website',
    description: `Diseño y desarrollo de sitio web corporativo para Transportes Alegra, empresa especializada en servicios de transporte y logística. La plataforma presenta de manera clara y profesional el catálogo completo de servicios, fortaleciendo la presencia digital de la marca y facilitando el contacto directo con clientes potenciales.

Objetivo principal:
Crear un canal digital efectivo que impulse la captación de nuevos clientes, transmita confianza y profesionalismo, y simplifique el proceso de cotización y contratación de servicios de transporte.

Características clave:
• Presentación de servicios: Secciones detalladas con la oferta completa de soluciones de transporte y logística.
• Formulario de contacto: Canal directo para solicitudes de cotización, consultas y contratación de servicios.
• Diseño responsive: Experiencia optimizada para cualquier dispositivo, desde escritorio hasta móvil.
• Identidad de marca: Estética alineada con la imagen corporativa de Transportes Alegra, generando confianza y credibilidad.
• SEO optimizado: Estructura pensada para mejorar el posicionamiento en buscadores y la visibilidad online.`,
    descriptionEn: `Design and development of a corporate website for Transportes Alegra, a company specializing in transportation and logistics services. The platform clearly and professionally showcases the full service catalog, strengthening the brand's digital presence and facilitating direct contact with potential clients.

Main Objective:
Build an effective digital channel that drives new client acquisition, projects trust and professionalism, and simplifies the quoting and contracting process for transportation services.

Key Features:
• Service Showcase: Detailed sections covering the full range of transport and logistics solutions.
• Contact Form: A direct channel for quote requests, inquiries, and service contracting.
• Responsive Design: Optimized experience across all devices, from desktop to mobile.
• Brand Identity: Aesthetics aligned with the corporate image of Transportes Alegra, building trust and credibility.
• SEO Optimization: Structure designed to improve search engine rankings and online visibility.`,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000',
    youtubeId: 'PMpbZ9fQx1I',
    technologies: ['Desarrollo Web', 'UI/UX', 'SEO', 'Responsive Design', 'Branding'],
    technologiesEn: ['Web Development', 'UI/UX', 'SEO', 'Responsive Design', 'Branding'],
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    id: 104,
    title: 'Portal de Reclutamiento & ATS Nissan Gasme',
    titleEn: 'Nissan Gasme Recruitment Portal & ATS',
    description: `Sistema integral de reclutamiento desarrollado para Nissan Gasme que digitaliza y centraliza todo el proceso de atracción y selección de talento. Incluye un portal público de postulación para candidatos y un ATS (Applicant Tracking System) interno para que los reclutadores gestionen el seguimiento completo de cada vacante y postulante en tiempo real.

Objetivo principal:
Eliminar procesos manuales y dispersos de reclutamiento, centralizando la gestión de vacantes, postulaciones y seguimiento de candidatos en una sola plataforma eficiente y trazable.

Características clave:
• Portal de postulación: Interfaz pública donde los candidatos consultan vacantes disponibles y envían su postulación de forma directa.
• ATS para reclutadores: Panel de seguimiento interno con flujos de selección, estados de candidatos, filtros avanzados y trazabilidad completa del proceso.
• Gestión de vacantes: Creación, publicación y administración centralizada de todas las posiciones abiertas en la organización.
• Flujos de selección configurables: Etapas personalizables del proceso de reclutamiento con visibilidad en tiempo real del avance de cada candidato.
• Dashboard de métricas: Indicadores clave de rendimiento del proceso de reclutamiento para la toma de decisiones estratégicas.`,
    descriptionEn: `A comprehensive recruitment system built for Nissan Gasme that fully digitalizes and centralizes the talent attraction and selection process. It includes a public candidate application portal and an internal ATS (Applicant Tracking System) so recruiters can manage the complete lifecycle of every job opening and applicant in real time.

Main Objective:
Eliminate manual and fragmented recruitment processes by centralizing vacancy management, applications, and candidate tracking into a single, efficient, and fully traceable platform.

Key Features:
• Application Portal: A public-facing interface where candidates browse open positions and submit their applications directly.
• Recruiter ATS: An internal tracking panel with selection workflows, candidate status management, advanced filters, and full process traceability.
• Vacancy Management: Centralized creation, publication, and administration of all open positions across the organization.
• Configurable Selection Workflows: Customizable recruitment stages with real-time visibility into each candidate's progress.
• Metrics Dashboard: Key performance indicators for the recruitment process to support strategic decision-making.`,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1000',
    youtubeId: 'wecQMx2WSl4',
    technologies: ['React', 'Node.js', 'ATS', 'Recruitment', 'HR Tech'],
    technologiesEn: ['React', 'Node.js', 'ATS', 'Recruitment', 'HR Tech'],
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    id: 4,
    title: 'Web Publicitaria El Merengue',
    titleEn: 'El Merengue Advertising Website',
    description: "Desarrollo de plataforma web para 'El Merengue', empresa líder en repostería y venta de insumos. Incluye catálogo interactivo, gestión de productos y una interfaz visualmente atractiva diseñada para maximizar la conversión y el alcance publicitario de la marca.",
    descriptionEn: "Development of a web platform for 'El Merengue', a leading pastry and baking supply company. Features an interactive product catalog, product management, and a visually compelling interface designed to maximize brand conversion and advertising reach.",
    images: [
      '/1.jpg', '/2.jpg',
    ],
    youtubeId: '-2iTnWxOCl4',
    technologies: ['React', 'Node.js', 'UI/UX', 'Catalog'],
    technologiesEn: ['React', 'Node.js', 'UI/UX', 'Catalog'],
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    id: 101,
    title: 'Data Lake & NissanIQ — Inteligencia Comercial Ejecutiva',
    titleEn: 'Data Lake & NissanIQ — Executive Business Intelligence',
    description: 'Dashboard ejecutivo de inteligencia comercial desarrollado para Nissan Gasme, que centraliza y transforma datos brutos del pipeline digital en visualizaciones estratégicas de alto impacto. Resuelve el problema de dispersión de datos entre agencias, equipos y leads individuales, convirtiendo métricas crudas del sistema Komo en decisiones accionables para directivos en tiempo real.\n\nIncluye análisis de rendimiento vs. benchmark nacional, trazabilidad completa del embudo de conversión, y un asistente IA integrado para exploración asistida de métricas. Diseñado con estética ejecutiva premium (Glassmorphism + sistema de temas dinámico), pensado para tomadores de decisiones, no para analistas.',
    descriptionEn: 'An executive business intelligence dashboard developed for Nissan Gasme that centralizes and transforms raw digital pipeline data into high-impact strategic visualizations. It solves the problem of data fragmentation across agencies, teams, and individual leads by converting raw Komo system metrics into real-time actionable decisions for executives.\n\nFeatures performance analysis vs. national benchmarks, full conversion funnel traceability, and an integrated AI assistant for metric exploration. Built with a premium executive aesthetic (Glassmorphism + dynamic theme system), designed for decision-makers, not analysts.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
    youtubeId: 'vh00t8_6vWA',
    technologies: ['React', 'Vite', 'Framer Motion', 'AI Integration', 'Data Analytics'],
    technologiesEn: ['React', 'Vite', 'Framer Motion', 'AI Integration', 'Data Analytics'],
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    id: 102,
    title: 'Nissan AdControl — Red Publicitaria Multi-Agencia',
    titleEn: 'Nissan AdControl — Multi-Agency Advertising Network',
    description: 'Solución empresarial robusta diseñada para la gestión centralizada y distribución de contenido publicitario en tiempo real para una red de 6 agencias Nissan. Este sistema permite la sincronización instantánea de campañas en pantallas digitales, eliminando la latencia en cambios de precios o promociones y erradicando errores de implementación manual.\n\nImpacto: Centralización total de activos, reducción drástica de costos operativos y eliminación del 100% de errores de publicación manual entre múltiples sucursales.',
    descriptionEn: 'A robust enterprise solution designed for the centralized management and real-time distribution of advertising content across a network of 6 Nissan dealerships. The system enables instant campaign synchronization on digital displays, eliminating latency in price or promotion updates and eradicating manual implementation errors.\n\nImpact: Full asset centralization, drastic reduction in operational costs, and 100% elimination of manual publishing errors across multiple branches.',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1000',
    youtubeIds: ['gS6SZXqtujk', 'kTS8-nAld1I'],
    technologies: ['React', 'Node.js', 'WebSockets', 'Digital Signage', 'Real-Time'],
    technologiesEn: ['React', 'Node.js', 'WebSockets', 'Digital Signage', 'Real-Time'],
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    id: 103,
    title: 'CheckCore — Centralización de Checadores Nissan',
    titleEn: 'CheckCore — Nissan Biometric Clock Centralization',
    description: 'Sistema web para la gestión centralizada de todos los checadores biométricos de Nissan Gasme. Incluye interfaz moderna e intuitiva, automatización del cálculo de faltas y retardos, dashboards con datos clave para dirección, y un sistema de monitoreo con auto-reparación remota que detecta y corrige anomalías en los dispositivos sin necesidad de intervención física del equipo de soporte.\n\nImpacto: Ahorro significativo de horas de trabajo manual, reducción de errores y eliminación de tiempos muertos por fallas en equipos remotos.',
    descriptionEn: 'A web system for the centralized management of all biometric time clocks at Nissan Gasme. Features a modern and intuitive interface, automated calculation of absences and tardiness, executive dashboards with key data, and a remote self-healing monitoring system that detects and corrects device anomalies without requiring physical intervention from the support team.\n\nImpact: Significant savings in manual work hours, reduction of errors, and elimination of downtime caused by remote device failures.',
    image: '/checkcore_preview.jpg',
    youtubeId: 'INVFL_my0KA',
    technologies: ['React', 'Node.js', 'Biometrics', 'Automation', 'Monitoring'],
    technologiesEn: ['React', 'Node.js', 'Biometrics', 'Automation', 'Monitoring'],
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    id: 1,
    title: 'Modelo Predictivo Dengue',
    titleEn: 'Dengue Predictive Model',
    description: 'Sistema de predicción para detección temprana de brotes de dengue en México, con análisis de datos epidemiológicos y modelos de Machine Learning.',
    descriptionEn: 'A predictive system for the early detection of dengue outbreaks in Mexico, using epidemiological data analysis and Machine Learning models.',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=1000',
    youtubeId: 'ZZfEujb1vRA',
    technologies: ['Python', 'Pandas', 'Scikit-learn', 'React'],
    technologiesEn: ['Python', 'Pandas', 'Scikit-learn', 'React'],
    liveUrl: '#',
    githubUrl: '#'
  }
];

// Flat array fallback if needed elsewhere
export const skills = categorizedSkills.flatMap(c => c.skills);
