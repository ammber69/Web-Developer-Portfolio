import React, { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, X, Code, Menu, Lock, MessageSquare, Phone, Mail } from 'lucide-react';
import { projectsData, skills } from './data';
import "./App.css";

// ============================================
// SECTION CONFIGURATION
// ============================================
const SECTIONS = [
  { id: 'hero', label: 'Inicio' },
  { id: 'skills', label: 'Habilidades' },
  { id: 'projects', label: 'Proyectos' },
];

const SCROLL_COOLDOWN = 1200; // ms between section transitions
const TOUCH_THRESHOLD = 50; // minimum px for swipe detection

// ============================================
// PROJECT CARD COMPONENT
// ============================================
const ProjectCard = React.memo(({ project, index, onClick }) => {
  return (
    <div 
      className={`project-card bento-item-${index % 4}`}
      onClick={() => onClick(project)}
    >
      <div className="project-card-image-wrapper">
        {project.youtubeIds || project.youtubeId ? (
          <div className="youtube-thumbnail-wrapper" style={{ width: '100%', height: '100%', position: 'relative' }}>
            <img 
              src={`https://img.youtube.com/vi/${(project.youtubeIds && project.youtubeIds[0]) || project.youtubeId}/maxresdefault.jpg`}
              alt={project.title}
              className="project-card-image"
              loading="lazy"
              onError={(e) => { e.target.src = `https://img.youtube.com/vi/${(project.youtubeIds && project.youtubeIds[0]) || project.youtubeId}/hqdefault.jpg` }}
            />
            <div className="youtube-play-icon">
              <svg viewBox="0 0 24 24" fill="white" width="48" height="48">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        ) : project.video ? (
          <video 
            src={project.video} 
            className="project-card-image"
            autoPlay muted loop playsInline
            poster={project.image || (project.images && project.images[0]) || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800'}
          />
        ) : (
          <img 
            src={project.image || (project.images && project.images[0])} 
            alt={project.title} 
            className="project-card-image"
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800' }}
            loading="lazy"
          />
        )}
        <div className="project-card-overlay">
          <span className="view-project-label">Ver Detalles</span>
        </div>
      </div>
      <div className="project-card-content">
        <h3 className="project-card-title">
          {project.title}
        </h3>
        <div className="project-card-tech">
          {project.technologies.slice(0, 3).map((tech, i) => (
            <span key={i} className="tech-pill">
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && <span className="tech-pill">+{project.technologies.length - 3}</span>}
        </div>
      </div>
    </div>
  );
});

// ============================================
// SECTION DOT INDICATORS
// ============================================
const SectionDots = ({ activeIndex, onDotClick }) => (
  <div className="section-dots">
    {SECTIONS.map((section, i) => (
      <button
        key={section.id}
        className={`section-dot ${i === activeIndex ? 'active' : ''}`}
        onClick={() => onDotClick(i)}
        aria-label={`Ir a ${section.label}`}
      >
        <span className="section-dot-label">{section.label}</span>
      </button>
    ))}
  </div>
);

// ============================================
// SCROLL PROGRESS BAR
// ============================================
const ScrollProgressBar = ({ progress }) => (
  <div 
    className="scroll-progress-bar" 
    style={{ width: `${progress}%` }} 
  />
);

// ============================================
// MAIN APP COMPONENT
// ============================================
function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [visibleSections, setVisibleSections] = useState(new Set(['hero']));
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const navLinksRef = useRef(null);
  const glassIndicatorRef = useRef(null);
  const scrollWrapperRef = useRef(null);
  const lastScrollTime = useRef(0);
  const touchStartY = useRef(0);
  const isProjectsInternalScroll = useRef(false);

  const activeSection = SECTIONS[currentSectionIndex]?.id || 'hero';

  // ============================================
  // NAVIGATE TO SECTION (core function)
  // ============================================
  const navigateToSection = useCallback((targetIndex, smooth = true) => {
    if (targetIndex < 0 || targetIndex >= SECTIONS.length) return;
    if (targetIndex === currentSectionIndex && !isProjectsInternalScroll.current) return;

    const wrapper = scrollWrapperRef.current;
    if (!wrapper) return;

    const targetSection = document.getElementById(SECTIONS[targetIndex].id);
    if (!targetSection) return;

    // Trigger transition overlay
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 600);

    // Mark section as visible for stagger animations
    setVisibleSections(prev => {
      const next = new Set(prev);
      next.add(SECTIONS[targetIndex].id);
      return next;
    });

    // Scroll to target
    wrapper.scrollTo({
      top: targetSection.offsetTop,
      behavior: smooth ? 'smooth' : 'auto',
    });

    setCurrentSectionIndex(targetIndex);
    isProjectsInternalScroll.current = false;

    // Update progress
    const progress = ((targetIndex) / (SECTIONS.length - 1)) * 100;
    setScrollProgress(progress);
  }, [currentSectionIndex]);

  // ============================================
  // SCROLL HIJACKING (wheel event)
  // ============================================
  useEffect(() => {
    const wrapper = scrollWrapperRef.current;
    if (!wrapper) return;

    const handleWheel = (e) => {
      // Don't hijack when modal is open
      if (selectedProject) return;

      const now = Date.now();
      const sectionId = SECTIONS[currentSectionIndex]?.id;

      // Special handling for projects section (allow internal scroll)
      if (sectionId === 'projects') {
        const projectsEl = document.getElementById('projects');
        if (!projectsEl) return;

        const wrapperScrollTop = wrapper.scrollTop;
        const projectsTop = projectsEl.offsetTop;
        const wrapperHeight = wrapper.clientHeight;
        const totalScrollable = wrapper.scrollHeight - wrapperHeight;
        const scrolledPastProjects = wrapperScrollTop - projectsTop;

        // Scrolling UP from top of projects → go back to skills
        if (e.deltaY < 0 && scrolledPastProjects <= 5) {
          e.preventDefault();
          if (now - lastScrollTime.current < SCROLL_COOLDOWN) return;
          lastScrollTime.current = now;
          navigateToSection(currentSectionIndex - 1);
          return;
        }

        // At bottom of everything → block further scroll down
        if (e.deltaY > 0 && wrapperScrollTop >= totalScrollable - 5) {
          e.preventDefault();
          return;
        }

        // Otherwise allow natural scroll within projects
        return;
      }

      // For hero & skills: full scroll hijacking
      e.preventDefault();

      if (now - lastScrollTime.current < SCROLL_COOLDOWN) return;
      lastScrollTime.current = now;

      if (e.deltaY > 0) {
        // Scroll down → next section
        navigateToSection(currentSectionIndex + 1);
      } else if (e.deltaY < 0) {
        // Scroll up → previous section
        navigateToSection(currentSectionIndex - 1);
      }
    };

    wrapper.addEventListener('wheel', handleWheel, { passive: false });
    return () => wrapper.removeEventListener('wheel', handleWheel);
  }, [currentSectionIndex, selectedProject, navigateToSection]);

  // ============================================
  // TOUCH SUPPORT (swipe detection)
  // ============================================
  useEffect(() => {
    const wrapper = scrollWrapperRef.current;
    if (!wrapper) return;

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (selectedProject) return;

      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY.current - touchEndY;
      const sectionId = SECTIONS[currentSectionIndex]?.id;

      // For projects section, only intercept swipe up at top
      if (sectionId === 'projects') {
        const projectsEl = document.getElementById('projects');
        if (!projectsEl) return;
        const scrolledPastProjects = wrapper.scrollTop - projectsEl.offsetTop;

        if (deltaY < -TOUCH_THRESHOLD && scrolledPastProjects <= 5) {
          const now = Date.now();
          if (now - lastScrollTime.current < SCROLL_COOLDOWN) return;
          lastScrollTime.current = now;
          navigateToSection(currentSectionIndex - 1);
        }
        return;
      }

      // For hero & skills
      const now = Date.now();
      if (now - lastScrollTime.current < SCROLL_COOLDOWN) return;

      if (Math.abs(deltaY) < TOUCH_THRESHOLD) return;

      lastScrollTime.current = now;

      if (deltaY > 0) {
        navigateToSection(currentSectionIndex + 1);
      } else {
        navigateToSection(currentSectionIndex - 1);
      }
    };

    wrapper.addEventListener('touchstart', handleTouchStart, { passive: true });
    wrapper.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      wrapper.removeEventListener('touchstart', handleTouchStart);
      wrapper.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentSectionIndex, selectedProject, navigateToSection]);

  // ============================================
  // KEYBOARD SUPPORT
  // ============================================
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedProject) return;

      const sectionId = SECTIONS[currentSectionIndex]?.id;

      switch (e.key) {
        case 'ArrowDown':
        case ' ':
          // In projects section, allow natural scroll unless at hero/skills
          if (sectionId === 'projects') return;
          e.preventDefault();
          navigateToSection(currentSectionIndex + 1);
          break;
        case 'ArrowUp':
          if (sectionId === 'projects') {
            const wrapper = scrollWrapperRef.current;
            const projectsEl = document.getElementById('projects');
            if (wrapper && projectsEl) {
              const scrolledPast = wrapper.scrollTop - projectsEl.offsetTop;
              if (scrolledPast <= 5) {
                e.preventDefault();
                navigateToSection(currentSectionIndex - 1);
              }
            }
            return;
          }
          e.preventDefault();
          navigateToSection(currentSectionIndex - 1);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSectionIndex, selectedProject, navigateToSection]);

  // ============================================
  // ENABLE/DISABLE SCROLL WRAPPER OVERFLOW
  // ============================================
  useEffect(() => {
    const wrapper = scrollWrapperRef.current;
    if (!wrapper) return;

    if (SECTIONS[currentSectionIndex]?.id === 'projects') {
      // Allow internal scrolling for projects
      wrapper.classList.add('projects-scrollable');
    } else {
      wrapper.classList.remove('projects-scrollable');
    }
  }, [currentSectionIndex]);

  // ============================================
  // INITIAL SECTION VISIBILITY (hero starts visible)
  // ============================================
  useEffect(() => {
    // Make hero visible immediately on mount
    setVisibleSections(new Set(['hero']));
  }, []);

  // ============================================
  // PROJECT MODAL HANDLERS
  // ============================================
  const handleProjectClick = useCallback((project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  }, []);

  const closeModal = () => {
    setSelectedProject(null);
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

  // Nav click → navigate to section
  const scrollToSection = (sectionId) => {
    const targetIndex = SECTIONS.findIndex(s => s.id === sectionId);
    if (targetIndex !== -1) {
      navigateToSection(targetIndex);
    }
    setIsMobileMenuOpen(false);
  };

  // Dot click → navigate to section
  const handleDotClick = useCallback((index) => {
    navigateToSection(index);
  }, [navigateToSection]);

  // ============================================
  // PREVENT BODY SCROLL WHEN MODAL IS OPEN
  // ============================================
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'hidden'; // Always hidden (fullscreen scroll)
    }
    return () => {
      document.body.style.overflow = 'hidden';
    };
  }, [selectedProject]);

  // ============================================
  // LIQUID GLASS NAV INDICATOR
  // ============================================
  useEffect(() => {
    const navContainer = navLinksRef.current;
    const indicator = glassIndicatorRef.current;
    if (!navContainer || !indicator) return;

    const activeLink = navContainer.querySelector(`[data-section="${activeSection}"]`);
    if (!activeLink) return;

    const containerRect = navContainer.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();

    indicator.style.width = `${linkRect.width + 20}px`;
    indicator.style.left = `${linkRect.left - containerRect.left - 10}px`;
    indicator.style.opacity = '1';
  }, [activeSection]);

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="app-container">
      {/* Scroll Progress Bar */}
      <ScrollProgressBar progress={scrollProgress} />

      {/* Section Transition Overlay */}
      <div className={`section-transition-overlay ${isTransitioning ? 'transitioning' : ''}`} />

      {/* Lateral Dot Indicators */}
      <SectionDots activeIndex={currentSectionIndex} onDotClick={handleDotClick} />

      {/* Navigation */}
      <nav className="nav-bar">
        <div className="nav-content">
          <div className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-color)' }}>
            <Code size={28} strokeWidth={2.5} />
            <span className="logo-text">
              Antonio <span className="logo-lastname">Monterrosas</span>
            </span>
          </div>
          <div className="nav-links desktop-only" ref={navLinksRef}>
            <div className="liquid-glass-indicator" ref={glassIndicatorRef} />
            <a href="#hero" data-section="hero" className={activeSection === 'hero' ? 'nav-active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}>Inicio</a>
            <a href="#skills" data-section="skills" className={activeSection === 'skills' ? 'nav-active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('skills'); }}>Habilidades</a>
            <a href="#projects" data-section="projects" className={activeSection === 'projects' ? 'nav-active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}>Proyectos</a>
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

      {/* Scroll Wrapper — programmatically controlled */}
      <div className="scroll-wrapper" ref={scrollWrapperRef}>
        {/* Hero Section */}
        <section id="hero" className={`hero-section fullscreen-section ${visibleSections.has('hero') ? 'section-visible' : ''}`}>
          <div className="section-inner">
            <div className="hero-grid">
              <div className="hero-text">
                <h1 className="hero-title reveal-element reveal-delay-0">
                  Hola, soy Antonio. <br/>
                  <span className="text-gradient">Ingeniero de Software y Analista de Datos.</span>
                </h1>
                <p className="hero-subtitle reveal-element reveal-delay-1">
                  Diseño y construyo soluciones digitales premium, combinando creatividad, código limpio y experiencias de usuario excepcionales. Especialista en análisis de datos, identificando áreas de oportunidad y optimizando procesos empresariales.
                </p>
                <div className="hero-actions reveal-element reveal-delay-2">
                  <a href="/CV Monterrosas Solis Jose Antonio.pdf" className="btn-primary" download="CV Monterrosas Solis Jose Antonio.pdf">
                    Descargar CV
                  </a>
                  <a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }} className="btn-secondary">
                    Ver Proyectos
                  </a>
                </div>
              </div>
              <div className="hero-visual">
                <div className="hero-avatar-container reveal-scale reveal-delay-1">
                  <img src="/PerfilIMG.png" alt="Antonio" className="hero-avatar" onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400' }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className={`skills-section fullscreen-section ${visibleSections.has('skills') ? 'section-visible' : ''}`}>
          <div className="section-inner">
            <div className="section-header reveal-element reveal-delay-0">
              <h2>Habilidades Técnicas</h2>
              <p>Herramientas y tecnologías que utilizo para dar vida a las ideas.</p>
            </div>
            
            <div className="skills-bento reveal-element reveal-delay-1">
              {skills.map((skill, index) => (
                <div key={index} className="skill-card">
                  <div className="skill-icon-wrapper">
                    <img src={skill.img} alt={skill.name} className="skill-icon" />
                  </div>
                  <span className="skill-name">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className={`projects-section fullscreen-section ${visibleSections.has('projects') ? 'section-visible' : ''}`}>
          <div className="section-inner">
            <div className="section-header reveal-element reveal-delay-0">
              <h2>Proyectos Destacados</h2>
              <p>Una selección de mi trabajo más reciente y relevante.</p>
            </div>

            <div className="projects-bento-grid">
              {projectsData.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onClick={handleProjectClick}
                />
              ))}
            </div>
          </div>

          {/* Footer integrated into projects section */}
          <footer className="footer">
            <div className="footer-content">
              <div className="footer-heading">
                <h3>¿Tienes un proyecto en mente?</h3>
                <p>Hablemos y hagamos algo increíble juntos.</p>
              </div>
              <div className="footer-contact">
                <a href="tel:+522712831339" className="footer-contact-item">
                  <Phone size={18} />
                  <span>+52 271 283 1339</span>
                </a>
                <a href="mailto:joseantonio042002@gmail.com" className="footer-contact-item">
                  <Mail size={18} />
                  <span>joseantonio042002@gmail.com</span>
                </a>
                <a href="https://wa.me/522712831339" className="footer-contact-item footer-cta" target="_blank" rel="noopener noreferrer">
                  <MessageSquare size={18} />
                  <span>Escríbeme por WhatsApp</span>
                </a>
              </div>
              <div className="footer-bottom">
                <p>© {new Date().getFullYear()} Antonio Monterrosas. Todos los derechos reservados.</p>
              </div>
            </div>
          </footer>
        </section>
      </div>

      {/* Detail Modal - Apple Style */}
      {selectedProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div 
            className="modal-container" 
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close-btn" onClick={closeModal}>
              <X size={24} />
            </button>
            
            <div className="modal-media-section">
              {selectedProject.youtubeIds && selectedProject.youtubeIds.length > 0 ? (
                <div className="modal-carousel">
                   <iframe 
                    className="modal-media"
                    src={`https://www.youtube.com/embed/${selectedProject.youtubeIds[currentImageIndex]}?autoplay=1&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3&color=white&playsinline=1`}
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
                  src={`https://www.youtube.com/embed/${selectedProject.youtubeId}?autoplay=1&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3&color=white&playsinline=1`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : selectedProject.video ? (
                <video 
                  src={selectedProject.video} 
                  className="modal-media"
                  controls autoPlay loop muted playsInline
                  poster={selectedProject.image || (selectedProject.images && selectedProject.images[0]) || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200'}
                />
              ) : selectedProject.images && selectedProject.images.length > 0 ? (
                <div className="modal-carousel">
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
                />
              )}
            </div>

            <div className="modal-info-section">
              <div className="modal-info-header">
                <h2 className="modal-title">
                  {selectedProject.title}
                </h2>
                
                <div className="modal-tech-list">
                  {selectedProject.technologies.map((tech, i) => (
                    <span key={i} className="modal-tech-pill">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="modal-description-content">
                {selectedProject.description.split('\n\n').map((block, blockIdx) => {
                  const lines = block.split('\n');
                  const hasBullets = lines.some(l => l.trim().startsWith('•'));
                  
                  if (hasBullets) {
                    const headerLine = lines.find(l => !l.trim().startsWith('•') && l.trim().length > 0);
                    const bullets = lines.filter(l => l.trim().startsWith('•'));
                    return (
                      <div key={blockIdx} className="modal-desc-card">
                        {headerLine && <h4 className="modal-desc-card-title">{headerLine.replace(':', '').trim()}</h4>}
                        <ul className="modal-desc-list">
                          {bullets.map((bullet, bIdx) => {
                            const text = bullet.replace('•', '').trim();
                            const colonIdx = text.indexOf(':');
                            if (colonIdx > -1 && colonIdx < 40) {
                              return (
                                <li key={bIdx}>
                                  <strong>{text.substring(0, colonIdx)}</strong>
                                  <span>{text.substring(colonIdx)}</span>
                                </li>
                              );
                            }
                            return <li key={bIdx}>{text}</li>;
                          })}
                        </ul>
                      </div>
                    );
                  }
                  
                  const isHeader = block.trim().endsWith(':') && block.trim().length < 60;
                  if (isHeader) return null;
                  
                  const allBlocks = selectedProject.description.split('\n\n');
                  const prevBlock = blockIdx > 0 ? allBlocks[blockIdx - 1] : null;
                  const prevIsHeader = prevBlock && prevBlock.trim().endsWith(':') && prevBlock.trim().length < 60;
                  
                  if (prevIsHeader) {
                    return (
                      <div key={blockIdx} className="modal-desc-card">
                        <h4 className="modal-desc-card-title">{prevBlock.replace(':', '').trim()}</h4>
                        <p className="modal-desc-text">{block}</p>
                      </div>
                    );
                  }
                  
                  return (
                    <p key={blockIdx} className="modal-desc-intro">{block}</p>
                  );
                })}
              </div>

              <div className="modal-actions-row">
                <div className="private-project-badge">
                  <Lock size={16} />
                  <span>Proyecto Privado / Confidencial</span>
                </div>
                <a href="https://wa.me/522712831339" className="btn-primary modal-btn" target="_blank" rel="noopener noreferrer">
                  <MessageSquare size={18} /> Solicitar Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;