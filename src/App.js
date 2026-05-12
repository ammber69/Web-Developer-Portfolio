import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X, Code, Menu, Lock, MessageSquare } from 'lucide-react';
import { projectsData, skills } from './data';
import "./App.css";

function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Manejar View Transitions al abrir un proyecto
  const handleProjectClick = (project) => {
    if (!document.startViewTransition) {
      setSelectedProject(project);
      setCurrentImageIndex(0);
      return;
    }

    document.startViewTransition(() => {
      setSelectedProject(project);
      setCurrentImageIndex(0);
    });
  };

  // Manejar View Transitions al cerrar un proyecto
  const closeModal = () => {
    if (!document.startViewTransition) {
      setSelectedProject(null);
      return;
    }

    document.startViewTransition(() => {
      setSelectedProject(null);
    });
  };

  const nextImage = (e) => {
    e.stopPropagation();
    const mediaArray = selectedProject.youtubeIds || selectedProject.images;
    if (selectedProject && mediaArray) {
      setCurrentImageIndex((prev) =>
        prev === mediaArray.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = (e) => {
    e.stopPropagation();
    const mediaArray = selectedProject.youtubeIds || selectedProject.images;
    if (selectedProject && mediaArray) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? mediaArray.length - 1 : prev - 1
      );
    }
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  // Prevenir scroll en body cuando modal está abierto
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedProject]);

  return (
    <div className="app-container">
      {/* Navigation */}
      <nav className="nav-bar">
        <div className="nav-content">
          <div className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-color)' }}>
            <Code size={28} strokeWidth={2.5} />
            <span className="logo-text">
              Antonio <span className="logo-lastname">Monterrosas</span>
            </span>
          </div>
          <div className="nav-links desktop-only">
            <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}>Inicio</a>
            <a href="#skills" onClick={(e) => { e.preventDefault(); scrollToSection('skills'); }}>Habilidades</a>
            <a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}>Proyectos</a>
          </div>
          
          <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}>Inicio</a>
          <a href="#skills" onClick={(e) => { e.preventDefault(); scrollToSection('skills'); }}>Habilidades</a>
          <a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}>Proyectos</a>
        </div>
      </div>

      {/* Hero Section */}
      <section id="hero" className="hero-section section-padding">
        <div className="hero-grid">
          <div className="hero-text">
            <h1 className="hero-title">
              Hola, soy Antonio. <br/>
              <span className="text-gradient">Ingeniero de Software y Analista de Datos.</span>
            </h1>
            <p className="hero-subtitle">
              Diseño y construyo soluciones digitales premium, combinando creatividad, código limpio y experiencias de usuario excepcionales. Especialista en análisis de datos, identificando áreas de oportunidad y optimizando procesos empresariales.
            </p>
            <div className="hero-actions">
              <a href="/MonterrosasSolisJoseAntonioCV.pdf" className="btn-primary" download>
                Descargar CV
              </a>
              <a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }} className="btn-secondary">
                Ver Proyectos
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-avatar-container">
              <img src="/perfil.png" alt="Antonio" className="hero-avatar" onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills-section section-padding">
        <div className="section-header">
          <h2 style={{ viewTransitionName: 'skills-title' }}>Habilidades Técnicas</h2>
          <p>Herramientas y tecnologías que utilizo para dar vida a las ideas.</p>
        </div>
        
        <div className="skills-bento">
          {skills.map((skill, index) => (
            <div key={index} className="skill-card">
              <div className="skill-icon-wrapper">
                <img src={skill.img} alt={skill.name} className="skill-icon" />
              </div>
              <span className="skill-name">{skill.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section section-padding">
        <div className="section-header">
          <h2>Proyectos Destacados</h2>
          <p>Una selección de mi trabajo más reciente y relevante.</p>
        </div>

        <div className="projects-bento-grid">
          {projectsData.map((project, index) => (
            <div 
              key={project.id} 
              className={`project-card bento-item-${index % 4}`}
              onClick={() => handleProjectClick(project)}
              style={{ viewTransitionName: selectedProject?.id === project.id ? 'none' : `project-card-bg-${project.id}` }}
            >
              <div className="project-card-image-wrapper">
                {project.youtubeIds || project.youtubeId ? (
                  <iframe 
                    className="project-card-image"
                    src={`https://www.youtube.com/embed/${(project.youtubeIds && project.youtubeIds[0]) || project.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${(project.youtubeIds && project.youtubeIds[0]) || project.youtubeId}&controls=0&modestbranding=1&showinfo=0`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    style={{ viewTransitionName: `project-media-${project.id}`, pointerEvents: 'none' }}
                  />
                ) : project.video ? (
                  <video 
                    src={project.video} 
                    className="project-card-image"
                    autoPlay muted loop playsInline
                    poster={project.image || (project.images && project.images[0]) || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800'}
                    style={{ viewTransitionName: `project-media-${project.id}` }}
                  />
                ) : (
                  <img 
                    src={project.image || (project.images && project.images[0])} 
                    alt={project.title} 
                    className="project-card-image"
                    style={{ viewTransitionName: `project-media-${project.id}` }}
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800' }}
                  />
                )}
                <div className="project-card-overlay">
                  <span className="view-project-label">Ver Detalles</span>
                </div>
              </div>
              <div className="project-card-content">
                <h3 className="project-card-title" style={{ viewTransitionName: selectedProject?.id === project.id ? `project-title-${project.id}` : `project-title-${project.id}` }}>
                  {project.title}
                </h3>
                <div className="project-card-tech">
                  {project.technologies.slice(0, 3).map((tech, i) => (
                    <span 
                      key={i} 
                      className="tech-pill"
                      style={{ viewTransitionName: selectedProject?.id === project.id ? `tech-pill-${project.id}-${i}` : `tech-pill-${project.id}-${i}` }}
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && <span className="tech-pill">+{project.technologies.length - 3}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Detail Modal with View Transitions */}
      {selectedProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div 
            className="modal-container" 
            onClick={(e) => e.stopPropagation()}
            style={{ viewTransitionName: `project-card-bg-${selectedProject.id}` }}
          >
            <button className="modal-close-btn" onClick={closeModal}>
              <X size={24} />
            </button>
            
            <div className="modal-media-section">
              {selectedProject.youtubeIds && selectedProject.youtubeIds.length > 0 ? (
                <div className="modal-carousel" style={{ viewTransitionName: `project-media-${selectedProject.id}` }}>
                   <iframe 
                    className="modal-media"
                    src={`https://www.youtube.com/embed/${selectedProject.youtubeIds[currentImageIndex]}?autoplay=1`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                  {selectedProject.youtubeIds.length > 1 && (
                    <>
                      <button className="modal-nav-btn prev" onClick={prevImage}><ChevronLeft size={24}/></button>
                      <button className="modal-nav-btn next" onClick={nextImage}><ChevronRight size={24}/></button>
                      <div className="modal-indicators">
                        {selectedProject.youtubeIds.map((_, i) => (
                          <div key={i} className={`indicator-dot ${i === currentImageIndex ? 'active' : ''}`} />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ) : selectedProject.youtubeId ? (
                <iframe 
                  className="modal-media"
                  src={`https://www.youtube.com/embed/${selectedProject.youtubeId}?autoplay=1`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{ viewTransitionName: `project-media-${selectedProject.id}` }}
                />
              ) : selectedProject.video ? (
                <video 
                  src={selectedProject.video} 
                  className="modal-media"
                  controls autoPlay loop muted playsInline
                  poster={selectedProject.image || (selectedProject.images && selectedProject.images[0]) || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200'}
                  style={{ viewTransitionName: `project-media-${selectedProject.id}` }}
                />
              ) : selectedProject.images && selectedProject.images.length > 0 ? (
                <div className="modal-carousel" style={{ viewTransitionName: `project-media-${selectedProject.id}` }}>
                  <img 
                    src={selectedProject.images[currentImageIndex]} 
                    alt={selectedProject.title} 
                    className="modal-media"
                    onError={(e) => { e.target.src = selectedProject.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200' }}
                  />
                  {selectedProject.images.length > 1 && (
                    <>
                      <button className="modal-nav-btn prev" onClick={prevImage}><ChevronLeft size={24}/></button>
                      <button className="modal-nav-btn next" onClick={nextImage}><ChevronRight size={24}/></button>
                      <div className="modal-indicators">
                        {selectedProject.images.map((_, i) => (
                          <div key={i} className={`indicator-dot ${i === currentImageIndex ? 'active' : ''}`} />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="modal-media"
                  style={{ viewTransitionName: `project-media-${selectedProject.id}` }}
                />
              )}
            </div>

            <div className="modal-info-section">
              <h2 className="modal-title" style={{ viewTransitionName: `project-title-${selectedProject.id}` }}>
                {selectedProject.title}
              </h2>
              
              <div className="modal-tech-list">
                {selectedProject.technologies.map((tech, i) => (
                  <span 
                    key={i} 
                    className="tech-pill"
                    style={{ viewTransitionName: `tech-pill-${selectedProject.id}-${i}` }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <p className="modal-description">{selectedProject.description}</p>

              <div className="modal-actions-row">
                <div className="private-project-badge">
                  <Lock size={16} />
                  <span>Proyecto Privado / Confidencial</span>
                </div>
                <a href="https://wa.me/521234567890" className="btn-primary modal-btn" target="_blank" rel="noopener noreferrer">
                  <MessageSquare size={18} /> Solicitar Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Antonio. Construido con React.</p>
      </footer>
    </div>
  );
}

export default App;