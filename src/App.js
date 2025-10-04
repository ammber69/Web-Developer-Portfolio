// App.jsx
import React, { useState, useEffect, useRef } from "react";
import { ExternalLink, Github, ChevronLeft, ChevronRight, StickyNote } from 'lucide-react';
import "./App.css";

const projectsData = [
  {
    id: 1,
    title: 'Modelo Predictivo Dengue',
    description: 'Sistema de predicción para detección temprana de brotes de dengue en México, con análisis de datos epidemiológicos.',
    image: 'https://via.placeholder.com/400x250',
    technologies: ['Python', 'Pandas', 'Scikit-learn', 'React'],
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    id: 2,
    title: 'Plataforma de Donaciones',
    description: 'Aplicación web administrativa para la gestión de donaciones sanguíneas con APIs REST e integración de servicios externos.',
    images: [
      '/3.png',
      '/4.png',
        '/6.png',
         '/7.png',
          '/8.png',
           '/9.png',
            '/10.png',
             '/12.png',
              '/13.png',
               '/14.png'
    ],
    technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    id: 3,
    title: 'Gestión de Ventas Minoristas',
    description: 'Aplicación de gestión de ventas para una franquicia de tiendas con módulos de seguridad y control de acceso.',
    images: [
      '/20.png',
      '/21.png',
      '/22.png',
      '/25.png',
      '/26.png',
    ],
    technologies: ['Java', 'Spring Boot', 'MySQL', 'React'],
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    id: 4,
    title: 'Punto de Venta NFC',
    description: 'Sistema integral de punto de venta con gestión de almacén y fidelización de clientes mediante dispositivos NFC.',
    images: [
      '/1.png',
      '/2.png',
     
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'NFC'],
    liveUrl: '#',
    githubUrl: '#'
  }
];

const skills = [
  { name: 'JavaScript', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', level: 90 },
  { name: 'Python', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', level: 85 },
  { name: 'Java', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', level: 80 },
  { name: 'C++', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg', level: 75 },
  { name: 'React', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', level: 95 },
  { name: 'Angular', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg', level: 80 },
  { name: 'Ionic', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ionic/ionic-original.svg', level: 75 },
  { name: 'Git', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', level: 90 },
  { name: 'Docker', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', level: 70 },
  { name: 'VS Code', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', level: 95 }
];

function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const intervalRef = useRef(null);
  const [activeSkill, setActiveSkill] = useState(null);
  const [activeLevel, setActiveLevel] = useState(0);
  const [showInfoPopup, setShowInfoPopup] = useState(false);

  const handleSkillMouseOver = (index, level) => {
    setActiveSkill(index);
    setActiveLevel(level);
  };

  const handleSkillMouseOut = () => {
    setActiveSkill(null);
    setActiveLevel(0);
  };

  // Funciones del carrusel de proyectos
  const handleProjectClick = (project) => {
    setSelectedProject(project);
    // Detener el carrusel automático cuando se abre el modal
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const closeModal = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
    // Reanudar el carrusel automático cuando se cierra el modal
    startAutoRotate();
  };

  const startAutoRotate = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === projectsData.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000); // 10 segundos
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === projectsData.length - 1 ? 0 : prevIndex + 1
    );
    // Reiniciar el conteo
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      startAutoRotate();
    }
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? projectsData.length - 1 : prevIndex - 1
    );
    // Reiniciar el conteo
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      startAutoRotate();
    }
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    // Reiniciar el conteo
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      startAutoRotate();
    }
  };

  // Funciones para navegar entre imágenes
  const nextImage = () => {
    if (selectedProject && selectedProject.images) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === selectedProject.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject && selectedProject.images) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? selectedProject.images.length - 1 : prevIndex - 1
      );
    }
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  // Funciones de navegación
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Auto-rotate carousel
  useEffect(() => {
    startAutoRotate();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Manejar autoplay de videos
  useEffect(() => {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
      video.muted = true;
      video.play().catch(error => {
        console.log('Video autoplay blocked:', error);
      });
    });
  }, [currentIndex, selectedProject]);

  return (
    <div className="container">
      {/* Navigation */}
      <nav className="nav">
        <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}>Inicio</a>
        <a href="#skills" onClick={(e) => { e.preventDefault(); scrollToSection('skills'); }}>Habilidades</a>
        <a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}>Proyectos</a>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero">
        <div className="hero-content">
          <h1>
            Hola, soy Antonio,
            <br />
           Ingeniero de Software.
          </h1>
          <p>
            Apasionado por la tecnología y el aprendizaje constante. 
            Me gusta crear soluciones simples que aporten valor real, combinando creatividad con disciplina. 
            Siempre buscando nuevas formas de crecer y compartir conocimiento.
          </p>
          <a
  href="/MonterrosasSolisJoseAntonioCV.pdf"
  className="download-btn"
  download="MonterrosasSolisJoseAntonioCV.pdf"
>
  Descargar Currículum
</a>
        </div>
        <div className="hero-image">
          <img
            src="/perfil.png"
            alt="John Profile"
            className="profile-pic"
          />
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="blog-section">
        <div className="blog-header">
          <h2>Habilidades y Tecnologías</h2>
          <p>Tecnologías con las que trabajo para crear soluciones innovadoras</p>
        </div>
        <div className="skills-container">
          {/* Lenguajes */}
          <div className="skills-category">
            <h3>Lenguajes</h3>
            <div className="skills-grid">
              {skills.slice(0, 4).map((skill, index) => (
                <div
                  className="skill-item"
                  key={index}
                  onMouseOver={() => handleSkillMouseOver(index, skill.level)}
                  onMouseOut={handleSkillMouseOut}
                >
                  <img src={skill.img} alt={skill.name} />
                  <p>{skill.name}</p>
                  {activeSkill === index && (
                    <div className="skill-progress">
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${activeLevel}%` }}></div>
                      </div>
                      <span className="progress-text">{activeLevel}%</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* Frameworks */}
          <div className="skills-category">
            <h3>Frameworks</h3>
            <div className="skills-grid">
              {skills.slice(4, 7).map((skill, index) => (
                <div
                  className="skill-item"
                  key={index}
                  onMouseOver={() => handleSkillMouseOver(index + 4, skill.level)}
                  onMouseOut={handleSkillMouseOut}
                >
                  <img src={skill.img} alt={skill.name} />
                  <p>{skill.name}</p>
                  {activeSkill === index + 4 && (
                    <div className="skill-progress">
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${activeLevel}%` }}></div>
                      </div>
                      <span className="progress-text">{activeLevel}%</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* Herramientas */}
          <div className="skills-category">
            <h3>Herramientas</h3>
            <div className="skills-grid">
              {skills.slice(7).map((skill, index) => (
                <div
                  className="skill-item"
                  key={index}
                  onMouseOver={() => handleSkillMouseOver(index + 7, skill.level)}
                  onMouseOut={handleSkillMouseOut}
                >
                  <img src={skill.img} alt={skill.name} />
                  <p>{skill.name}</p>
                  {activeSkill === index + 7 && (
                    <div className="skill-progress">
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${activeLevel}%` }}></div>
                      </div>
                      <span className="progress-text">{activeLevel}%</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section">
        <div className="projects-header">
          <div className="projects-header-title-row">
            <h2>Mis Proyectos</h2>
            <button
              className="info-note-btn"
              onClick={() => setShowInfoPopup(true)}
              title="Ver nota de confidencialidad"
            >
              <StickyNote size={26} />
            </button>
          </div>
          <div className="projects-header-row">
            <p>Una selección de proyectos que demuestran mis habilidades y experiencia</p>
            {showInfoPopup && (
              <div className="info-popup-overlay" onClick={() => setShowInfoPopup(false)}>
                <div className="info-popup" onClick={e => e.stopPropagation()}>
                  <button className="info-popup-close" onClick={() => setShowInfoPopup(false)}>×</button>
                  <h4>Nota de Confidencialidad</h4>
                  <p>
                    Los proyectos mostrados en este portafolio corresponden únicamente a la parte que, por contrato, se me permite compartir.<br /><br />
                    Algunos trabajos completos permanecen privados por confidencialidad empresarial.<br /><br />
                    Lo que aquí se presenta son fragmentos o esquemas autorizados como evidencia de mi experiencia profesional.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="carousel-container">
          <button className="carousel-btn carousel-btn-prev" onClick={prevSlide}>
            <ChevronLeft size={24} />
          </button>
          <div className="carousel-3d">
            <div className="carousel-track">
              {(() => {
                const project = projectsData[currentIndex];
                return (
                  <div
                    key={project.id}
                    className="project-card carousel-card active"
                    onClick={() => handleProjectClick(project)}
                  >
                    <div className="project-image-container">
                      {project.title === 'Modelo Predictivo Dengue' ? (
                        <video
                          src="/videoDengueScan.mp4"
                          className="project-image"
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="auto"
                        />
                      ) : project.images ? (
                        <div className="image-carousel">
                          <img
                            src={project.images[0]}
                            alt={`Imagen del ${project.title}`}
                            className="project-image"
                          />
                          {project.images.length > 1 && (
                            <div className="image-indicators">
                              {project.images.map((_, index) => (
                                <span
                                  key={index}
                                  className={`image-dot ${index === 0 ? 'active' : ''}`}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <img
                          src={project.image}
                          alt={`Imagen del ${project.title}`}
                          className="project-image"
                        />
                      )}
                      <div className="project-overlay">
                        <div className="project-actions">
                          <a
                            href={project.liveUrl}
                            className="project-action-btn project-live-btn"
                            onClick={(e) => e.stopPropagation()}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink size={20} />
                          </a>
                          <a
                            href={project.githubUrl}
                            className="project-action-btn project-github-btn"
                            onClick={(e) => e.stopPropagation()}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github size={20} />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="project-info">
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <div className="project-technologies">
                        {project.technologies.map((tech, techIndex) => (
                          <span key={techIndex} className="tech-badge">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <button className="project-details-btn">
                        Ver Detalles
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
          <button className="carousel-btn carousel-btn-next" onClick={nextSlide}>
            <ChevronRight size={24} />
          </button>
        </div>
        {/* Indicadores del carrusel */}
        <div className="carousel-indicators">
          {projectsData.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
        {/* Modal para detalles del proyecto */}
        {selectedProject && (
          <div className="project-modal" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeModal}>×</button>
              <h3>{selectedProject.title}</h3>
              {selectedProject.title === 'Modelo Predictivo Dengue' ? (
                <video
                  src="/videoDengueScan.mp4"
                  className="modal-image"
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  style={{ background: '#000', borderRadius: '12px', marginBottom: '1.5rem' }}
                />
              ) : selectedProject.images ? (
                <div className="modal-image-carousel">
                  <button className="modal-carousel-btn modal-carousel-prev" onClick={prevImage}>
                    <ChevronLeft size={20} />
                  </button>
                  <img
                    src={selectedProject.images[currentImageIndex]}
                    alt={`Imagen ${currentImageIndex + 1} del ${selectedProject.title}`}
                    className="modal-image"
                  />
                  <button className="modal-carousel-btn modal-carousel-next" onClick={nextImage}>
                    <ChevronRight size={20} />
                  </button>
                  <div className="modal-image-indicators">
                    {selectedProject.images.map((_, index) => (
                      <button
                        key={index}
                        className={`modal-image-dot ${index === currentImageIndex ? 'active' : ''}`}
                        onClick={() => goToImage(index)}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="modal-image"
                />
              )}
              <p>{selectedProject.description}</p>
              <div className="modal-technologies">
                {selectedProject.technologies.map((tech, index) => (
                  <span key={index} className="tech-badge">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="modal-actions">
                <a
                  href={selectedProject.liveUrl}
                  className="modal-btn modal-live-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={16} />
                  Ver Proyecto
                </a>
                <a
                  href={selectedProject.githubUrl}
                  className="modal-btn modal-github-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={16} />
                  Ver Código
                </a>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;