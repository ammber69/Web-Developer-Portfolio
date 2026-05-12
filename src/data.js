export const projectsData = [
  {
    id: 101,
    title: 'Data Lakehouse Nissan',
    description: 'Desarrollo de Data Lake y estudio de datos para scraping en tiempo real de leads. Inspección de pipeline, análisis de embudos de procesos, detección de tendencias e implementación de planes de mejora y evaluación de vendedores para el área de mercadotecnia.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
    technologies: ['Python', 'SQL', 'Data Lake', 'Scraping'],
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    id: 102,
    title: 'Central de Publicidad Nissan',
    description: 'Solución web en tiempo real para centralizar el control de anuncios en las pantallas de todas las agencias Nissan. Optimiza tiempos de implementación, reduce costos operativos y minimiza errores para mejorar la evaluación en auditorías corporativas.',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1000',
    technologies: ['React', 'Node.js', 'WebSockets', 'Dashboard'],
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    id: 103,
    title: 'CheckCore – Centralización de Checadores Nissan Gasme',
    description: 'Sistema web para la gestión centralizada de todos los checadores biométricos de Nissan Gasme. Incluye interfaz moderna e intuitiva, automatización del cálculo de faltas y retardos, dashboards con datos clave para dirección, y un sistema de monitoreo con auto-reparación remota que detecta y corrige anomalías en los dispositivos sin necesidad de intervención física del equipo de soporte.\n\nImpacto: Ahorro significativo de horas de trabajo manual, reducción de errores y eliminación de tiempos muertos por fallas en equipos remotos.',
    image: '/checkcore_preview.png',
    youtubeId: 'INVFL_my0KA',
    technologies: ['React', 'Node.js', 'Biometrics', 'Automation', 'Monitoring'],
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    id: 1,
    title: 'Modelo Predictivo Dengue',
    description: 'Sistema de predicción para detección temprana de brotes de dengue en México, con análisis de datos epidemiológicos y modelos de Machine Learning.',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=1000',
    youtubeId: 'ZZfEujb1vRA',
    technologies: ['Python', 'Pandas', 'Scikit-learn', 'React'],
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    id: 2,
    title: 'Plataforma de Donaciones de Sangre – Ángeles Rojos',
    description: "Panel administrativo y gestor de la red social de donaciones sanguíneas 'Ángeles Rojos'. Permite la gestión integral de donantes, solicitudes de sangre, logística y notificaciones en tiempo real, actuando como el núcleo operativo de la plataforma social.",
    images: [
      '/3.png', '/4.png', '/6.png', '/7.png', '/8.png', 
      '/9.png', '/10.png', '/12.png', '/13.png', '/14.png'
    ],
    technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    id: 3,
    title: 'Gestión de Ventas Minoristas',
    description: 'Aplicación robusta de gestión de ventas para una franquicia de tiendas. Incluye módulos avanzados de seguridad, control de acceso basado en roles y análisis de ventas.',
    images: [
      '/20.png', '/21.png', '/22.png', '/25.png', '/26.png',
    ],
    technologies: ['Java', 'Spring Boot', 'MySQL', 'React'],
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    id: 4,
    title: 'Web Publicitaria El Merengue',
    description: "Desarrollo de plataforma web para 'El Merengue', empresa líder en repostería y venta de insumos. Incluye catálogo interactivo, gestión de productos y una interfaz visualmente atractiva diseñada para maximizar la conversión y el alcance publicitario de la marca.",
    images: [
      '/1.png', '/2.png',
    ],
    youtubeId: '-2iTnWxOCl4',
    technologies: ['React', 'Node.js', 'UI/UX', 'Catalog'],
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    id: 6,
    title: 'Gestión de Servicios TI (GLPI)',
    description: `Diseño, configuración e implementación desde cero de una plataforma ITSM basada en GLPI para una organización de más de 100 usuarios. El proyecto incluyó catálogo de servicios, gestión de activos, SLAs, flujos de atención y un programa de adopción cultural del sistema.

Logro principal:
Reducción notable en tiempos de atención a usuarios al pasar de un proceso informal (correo/verbal) a un sistema estructurado con prioridades, SLAs y trazabilidad completa de cada solicitud. (+100 Usuarios atendidos, 3-6 Meses de implementación).

Entregables clave:
• Catálogo de servicios TI: Definición y clasificación de servicios disponibles.
• SLAs y tiempos de atención: Reglas de escalamiento, prioridades y medición.
• Gestión de activos (FusionInventory): Inventario automatizado integrado al sistema.
• Flujos de soporte: Reglas de asignación automática, categorías y grupos.
• Capacitación: Talleres para adopción del sistema como canal oficial de soporte.`,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000',
    youtubeIds: ['wV8AmYiWMPw', '0zehoKQrgUc'],
    technologies: ['GLPI', 'FusionInventory', 'ITSM', 'SLA', 'Soporte TI'],
    liveUrl: '#',
    githubUrl: '#'
  }
];

export const skills = [
  { name: 'JavaScript', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', level: 95 },
  { name: 'TypeScript', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', level: 85 },
  { name: 'Python', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', level: 90 },
  { name: 'Java', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', level: 80 },
  { name: 'React', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', level: 95 },
  { name: 'Next.js', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', level: 85 },
  { name: 'Node.js', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', level: 85 },
  { name: 'PostgreSQL', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', level: 80 },
  { name: 'Docker', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', level: 75 },
  { name: 'Git', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', level: 90 },
  { name: 'Análisis de Datos', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg', level: 85 },
  { name: 'SQL', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', level: 85 },
  { name: 'Linux', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg', level: 80 },
];
