import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, X, Code, MessageSquare, Phone, Mail, Briefcase, MapPin, Building2, Globe } from 'lucide-react';
import { projectsData, services, categorizedSkills } from './data';
import "./App.css";

// ============================================
// SECTION CONFIGURATION
// ============================================
const SCROLL_COOLDOWN = 1200; // ms between section transitions
const TOUCH_THRESHOLD = 50; // minimum px for swipe detection

const getSections = (lang) => [
  { id: 'hero',     label: lang === 'en' ? 'Home'       : 'Inicio'      },
  { id: 'skills',   label: lang === 'en' ? 'Skills'     : 'Habilidades' },
  { id: 'projects', label: lang === 'en' ? 'Projects'   : 'Proyectos'   },
];

// ============================================
// PROJECT CARD COMPONENT
// ============================================
const ProjectCard = React.memo(({ project, index, onClick, lang }) => {
  const title = lang === 'en' ? (project.titleEn || project.title) : project.title;
  const techs = lang === 'en' ? (project.technologiesEn || project.technologies) : project.technologies;

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
              alt={title}
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
            alt={title} 
            className="project-card-image"
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800' }}
            loading="lazy"
          />
        )}
        <div className="project-card-overlay">
          <span className="view-project-label">
            {lang === 'en' ? 'View Details' : 'Ver Detalles'}
          </span>
        </div>
      </div>
      <div className="project-card-content">
        <h3 className="project-card-title">
          {title}
        </h3>
        <div className="project-card-tech">
          {techs.slice(0, 3).map((tech, i) => (
            <span key={i} className="tech-pill">
              {tech}
            </span>
          ))}
          {techs.length > 3 && <span className="tech-pill">+{techs.length - 3}</span>}
        </div>
      </div>
    </div>
  );
});

// ============================================
// LANGUAGE TOGGLE BUTTON (3D Roll Glass Switch)
// ============================================
const LangToggle = ({ lang, onToggle, isSwitching }) => (
  <button
    className={`lang-toggle ${isSwitching ? 'switching' : ''}`}
    onClick={onToggle}
    aria-label="Toggle language / Cambiar idioma"
    title={lang === 'en' ? 'Cambiar a Español' : 'Switch to English'}
  >
    <Globe size={14} className="lang-globe-icon" />
    <div className="lang-pill-container">
      <div className={`lang-pill-slider ${lang === 'es' ? 'is-es' : 'is-en'}`} />
      <div className="lang-option-wrapper">
        <span className={`lang-option ${lang === 'en' ? 'lang-active' : ''}`}>EN</span>
      </div>
      <div className="lang-option-wrapper">
        <span className={`lang-option ${lang === 'es' ? 'lang-active' : ''}`}>ES</span>
      </div>
    </div>
  </button>
);

// ============================================
// SECTION DOT INDICATORS
// ============================================
const SectionDots = ({ activeIndex, onDotClick, sections }) => (
  <div className="section-dots">
    {sections.map((section, i) => (
      <button
        key={section.id}
        className={`section-dot ${i === activeIndex ? 'active' : ''}`}
        onClick={() => onDotClick(i)}
        aria-label={`Go to ${section.label}`}
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
  const [lang, setLang] = useState('en');
  const [isLangSwitching, setIsLangSwitching] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  // Detect mobile — on mobile we use native CSS scroll-snap instead of JS
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  // Track which sections have played their stagger animation
  const animatedSectionsRef = useRef(new Set());

  const navLinksRef = useRef(null);
  const glassIndicatorRef = useRef(null);
  const scrollWrapperRef = useRef(null);
  const lastScrollTime = useRef(0);
  const touchStartY = useRef(0);
  const isProjectsInternalScroll = useRef(false);

  // Update isMobile on resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const SECTIONS = useMemo(() => getSections(lang), [lang]);
  const activeSection = SECTIONS[currentSectionIndex]?.id || 'hero';

  const toggleLang = useCallback(() => {
    if (isLangSwitching) return;
    setIsLangSwitching(true);
    setTimeout(() => {
      setLang(prev => prev === 'en' ? 'es' : 'en');
    }, 140);
    setTimeout(() => {
      setIsLangSwitching(false);
    }, 280);
  }, [isLangSwitching]);

  // ============================================
  // NAVIGATE TO SECTION (core function)
  // ============================================
  const navigateToSection = useCallback((targetIndex, smooth = true) => {
    if (targetIndex < 0 || targetIndex >= SECTIONS.length) return;

    const wrapper = scrollWrapperRef.current;
    if (!wrapper) return;

    const targetSection = document.getElementById(SECTIONS[targetIndex].id);
    if (!targetSection) return;

    // Trigger transition overlay
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 600);

    // Trigger stagger animation on target section
    if (!animatedSectionsRef.current.has(SECTIONS[targetIndex].id)) {
      animatedSectionsRef.current.add(SECTIONS[targetIndex].id);
      targetSection.classList.add('section-animated');
    }

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
  }, [SECTIONS]);

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

      // Special handling for projects section (allows internal scroll for grid + footer)
      if (sectionId === 'projects') {
        const currentEl = document.getElementById('projects');
        if (!currentEl) return;

        const wrapperScrollTop = wrapper.scrollTop;
        const currentTop = currentEl.offsetTop;
        const wrapperHeight = wrapper.clientHeight;
        const totalScrollable = wrapper.scrollHeight - wrapperHeight;
        const scrolledPastCurrent = wrapperScrollTop - currentTop;

        // Scrolling UP from top of projects → snap back to skills
        if (e.deltaY < 0 && scrolledPastCurrent <= 5) {
          e.preventDefault();
          if (now - lastScrollTime.current < SCROLL_COOLDOWN) return;
          lastScrollTime.current = now;
          navigateToSection(currentSectionIndex - 1);
          return;
        }

        // In projects at bottom of everything → block further scroll down
        if (e.deltaY > 0 && wrapperScrollTop >= totalScrollable - 5) {
          e.preventDefault();
          return;
        }

        // Allow natural internal scroll inside projects grid
        return;
      }

      // For Hero & Skills: strict section-by-section snap hijacking
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

    // Only apply wheel hijack on desktop
    if (!isMobile) {
      wrapper.addEventListener('wheel', handleWheel, { passive: false });
    }
    return () => wrapper.removeEventListener('wheel', handleWheel);
  }, [currentSectionIndex, selectedProject, navigateToSection, SECTIONS, isMobile]);

  // ============================================
  // TOUCH SUPPORT (swipe detection — desktop only)
  // On mobile, CSS scroll-snap handles this natively without jumps
  // ============================================
  useEffect(() => {
    const wrapper = scrollWrapperRef.current;
    if (!wrapper || isMobile) return; // Skip on mobile — CSS snap handles it

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (selectedProject) return;

      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY.current - touchEndY;
      const sectionId = SECTIONS[currentSectionIndex]?.id;

      if (sectionId === 'projects') {
        const currentEl = document.getElementById('projects');
        if (!currentEl) return;
        const scrolledPastCurrent = wrapper.scrollTop - currentEl.offsetTop;

        if (deltaY < -TOUCH_THRESHOLD && scrolledPastCurrent <= 5) {
          const now = Date.now();
          if (now - lastScrollTime.current < SCROLL_COOLDOWN) return;
          lastScrollTime.current = now;
          navigateToSection(currentSectionIndex - 1);
        }
        return;
      }

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
  }, [currentSectionIndex, selectedProject, navigateToSection, SECTIONS, isMobile]);

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
          if (sectionId === 'projects') return;
          e.preventDefault();
          navigateToSection(currentSectionIndex + 1);
          break;
        case 'ArrowUp':
          if (sectionId === 'projects') {
            const wrapper = scrollWrapperRef.current;
            const currentEl = document.getElementById('projects');
            if (wrapper && currentEl) {
              const scrolledPast = wrapper.scrollTop - currentEl.offsetTop;
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
  }, [currentSectionIndex, selectedProject, navigateToSection, SECTIONS]);

  // ============================================
  // ENABLE/DISABLE SCROLL WRAPPER OVERFLOW
  // ============================================
  useEffect(() => {
    const wrapper = scrollWrapperRef.current;
    if (!wrapper) return;

    // On mobile, wrapper is always scrollable (CSS scroll-snap handles sections)
    if (isMobile) {
      wrapper.classList.remove('projects-scrollable');
      return;
    }

    if (SECTIONS[currentSectionIndex]?.id === 'projects') {
      wrapper.classList.add('projects-scrollable');
    } else {
      wrapper.classList.remove('projects-scrollable');
    }
  }, [currentSectionIndex, SECTIONS, isMobile]);

  // ============================================
  // STAGGER ANIMATION TRIGGER (cosmetic only — content always visible)
  // ============================================
  useEffect(() => {
    // Hero always gets animated immediately
    const heroEl = document.getElementById('hero');
    if (heroEl && !animatedSectionsRef.current.has('hero')) {
      animatedSectionsRef.current.add('hero');
      heroEl.classList.add('section-animated');
    }
  }, []);

  // ============================================
  // SCROLL TRACKING (updates active section & progress bar)
  // ============================================
  useEffect(() => {
    const wrapper = scrollWrapperRef.current;
    if (!wrapper) return;

    const handleScroll = () => {
      const scrollTop = wrapper.scrollTop;
      const scrollHeight = wrapper.scrollHeight - wrapper.clientHeight;
      if (scrollHeight > 0) {
        setScrollProgress((scrollTop / scrollHeight) * 100);
      }

      // Determine active section
      const wrapperRect = wrapper.getBoundingClientRect();
      const wrapperMid = wrapperRect.top + wrapperRect.height * 0.5;
      SECTIONS.forEach((sec, idx) => {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= wrapperMid && rect.bottom >= wrapperMid * 0.6) {
            setCurrentSectionIndex(idx);
          }
        }
      });
    };

    wrapper.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => wrapper.removeEventListener('scroll', handleScroll);
  }, [SECTIONS]);

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

  const scrollToSection = (sectionId) => {
    const targetIndex = SECTIONS.findIndex(s => s.id === sectionId);
    if (targetIndex !== -1) {
      navigateToSection(targetIndex);
    }
    setIsMobileMenuOpen(false);
  };

  const handleDotClick = useCallback((index) => {
    navigateToSection(index);
  }, [navigateToSection]);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'hidden';
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
  }, [activeSection, lang]);

  // Helpers for bilingual content in modal
  const getProjectTitle = (project) => lang === 'en' ? (project.titleEn || project.title) : project.title;
  const getProjectDesc = (project) => lang === 'en' ? (project.descriptionEn || project.description) : project.description;
  const getProjectTechs = (project) => lang === 'en' ? (project.technologiesEn || project.technologies) : project.technologies;

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className={`app-container ${isLangSwitching ? 'lang-switching' : ''}`}>
      {/* Scroll Progress Bar */}
      <ScrollProgressBar progress={scrollProgress} />

      {/* Section Transition Overlay */}
      <div className={`section-transition-overlay ${isTransitioning ? 'transitioning' : ''}`} />

      {/* Lateral Dot Indicators */}
      <SectionDots activeIndex={currentSectionIndex} onDotClick={handleDotClick} sections={SECTIONS} />

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
            <a href="#hero" data-section="hero" className={activeSection === 'hero' ? 'nav-active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}>
              {lang === 'en' ? 'Home' : 'Inicio'}
            </a>
            <a href="#skills" data-section="skills" className={activeSection === 'skills' ? 'nav-active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('skills'); }}>
              {lang === 'en' ? 'Skills' : 'Habilidades'}
            </a>
            <a href="#projects" data-section="projects" className={activeSection === 'projects' ? 'nav-active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}>
              {lang === 'en' ? 'Projects' : 'Proyectos'}
            </a>
          </div>
          
          <div className="nav-right-controls">
            <LangToggle lang={lang} onToggle={toggleLang} isSwitching={isLangSwitching} />
            <button 
              className={`hamburger-btn ${isMobileMenuOpen ? 'is-open' : ''}`} 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              <span className="hamburger-line line-top" />
              <span className="hamburger-line line-mid" />
              <span className="hamburger-line line-bot" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}>
            {lang === 'en' ? 'Home' : 'Inicio'}
          </a>
          <a href="#skills" onClick={(e) => { e.preventDefault(); scrollToSection('skills'); }}>
            {lang === 'en' ? 'Skills' : 'Habilidades'}
          </a>
          <a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}>
            {lang === 'en' ? 'Projects' : 'Proyectos'}
          </a>
        </div>
      </div>

      {/* Scroll Wrapper */}
      <div className="scroll-wrapper" ref={scrollWrapperRef}>
        {/* Hero Section */}
        <section id="hero" className="hero-section fullscreen-section section-visible">
          <div className="section-inner">
            <div className="hero-grid">
              <div className="hero-text">
                <h1 className="hero-title reveal-element reveal-delay-0">
                  {lang === 'en'
                    ? <>Hi, I'm Antonio. <br/><span className="text-gradient">Software Engineer & Data Analyst.</span></>
                    : <>Hola, soy Antonio. <br/><span className="text-gradient">Ingeniero de Software y Analista de Datos.</span></>
                  }
                </h1>
                <p className="hero-subtitle reveal-element reveal-delay-1">
                  {lang === 'en'
                    ? 'I design and build digital solutions, combining creativity, clean code, and exceptional user experiences. Specialized in data analytics, identifying opportunities, and optimizing business processes.'
                    : 'Diseño y construyo soluciones digitales, combinando creatividad, código limpio y experiencias de usuario excepcionales. Especialista en análisis de datos, identificando áreas de oportunidad y optimizando procesos empresariales.'
                  }
                </p>
                
                {/* Stats Bar */}
                <div className="hero-stats reveal-element reveal-delay-2">
                  <div className="stat-card">
                    <span className="stat-number">5+</span>
                    <span className="stat-label">
                      {lang === 'en' ? 'Enterprise Systems' : 'Sistemas Empresariales'}
                    </span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-number">6</span>
                    <span className="stat-label">
                      {lang === 'en' ? 'Connected Agencies' : 'Agencias Conectadas'}
                    </span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-number">300+</span>
                    <span className="stat-label">
                      {lang === 'en' ? 'Employees Impacted' : 'Empleados Impactados'}
                    </span>
                  </div>
                </div>

                <div className="hero-actions reveal-element reveal-delay-3">
                  <a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }} className="btn-primary">
                    {lang === 'en' ? 'View Projects' : 'Ver Proyectos'}
                  </a>
                  <a href="/Jose_Antonio_Monterrosas_CV.pdf" className="btn-secondary" download="Jose_Antonio_Monterrosas_CV.pdf">
                    {lang === 'en' ? 'Download CV' : 'Descargar CV'}
                  </a>
                </div>
              </div>

              <div className="hero-visual">
                <div className="hero-avatar-container reveal-scale reveal-delay-1">
                  <img src="/PerfilIMG.jpg" alt="Antonio" className="hero-avatar" loading="eager" onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Bouncing Scroll Hint */}
          <div className="scroll-hint reveal-element reveal-delay-4" onClick={() => scrollToSection('skills')}>
            <span>Scroll</span>
            <ChevronDown className="scroll-hint-icon" size={18} />
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="skills-section fullscreen-section section-visible">
          <div className="section-inner">
            <div className="section-header reveal-element reveal-delay-0">
              <h2>{lang === 'en' ? 'Services & Technical Skills' : 'Servicios & Habilidades Técnicas'}</h2>
              <p>{lang === 'en'
                ? 'Comprehensive software solutions and the technology stack I use to build them.'
                : 'Soluciones integrales de software y el conjunto de tecnologías que utilizo para construirlas.'
              }</p>
            </div>
            
            {/* Services */}
            <div className="services-grid reveal-element reveal-delay-1">
              {services.map((service) => (
                <div key={service.id} className="service-card">
                  <span className="service-icon">{service.icon}</span>
                  <h3 className="service-title">
                    {lang === 'en' ? (service.titleEn || service.title) : service.title}
                  </h3>
                  <p className="service-desc">
                    {lang === 'en' ? (service.descriptionEn || service.description) : service.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Tech Categories */}
            <div className="tech-categories-container reveal-element reveal-delay-2">
              {categorizedSkills.map((cat, catIdx) => (
                <div key={catIdx} className="category-group">
                  <h4 className="category-title">
                    {lang === 'en' ? (cat.categoryEn || cat.category) : cat.category}
                  </h4>
                  <div className="skills-category-bento">
                    {cat.skills.map((skill, skillIdx) => (
                      <div key={skillIdx} className="skill-card">
                        <div className="skill-icon-wrapper">
                          <img src={skill.img} alt={lang === 'en' ? (skill.nameEn || skill.name) : skill.name} className="skill-icon" />
                        </div>
                        <span className="skill-name">
                          {lang === 'en' ? (skill.nameEn || skill.name) : skill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="projects-section fullscreen-section section-visible">
          <div className="section-inner">
            <div className="section-header reveal-element reveal-delay-0">
              <h2>{lang === 'en' ? 'Featured Projects' : 'Proyectos Destacados'}</h2>
              <p>{lang === 'en'
                ? 'A curated selection of my most recent and relevant work.'
                : 'Una selección de mi trabajo más reciente y relevante.'
              }</p>
            </div>

            <div className="projects-bento-grid">
              {projectsData.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onClick={handleProjectClick}
                  lang={lang}
                />
              ))}
            </div>
          </div>

          {/* Footer integrated into projects section */}
          <footer className="footer">
            <div className="footer-content">
              {/* Mini About Me Card */}
              <div className="about-me-card">
                <div className="about-me-header">
                  {lang === 'en' ? 'About Me & Availability' : 'Acerca de mí & Disponibilidad'}
                </div>
                <p className="about-me-body">
                  {lang === 'en'
                    ? 'Software engineer at Nissan Gasme. Specialized in full-stack web development, process automation, and data intelligence. Available for selective freelance projects with businesses and individual clients.'
                    : 'Ingeniero de software en Nissan Gasme. Especializado en desarrollo web full-stack, automatización de procesos e inteligencia de datos. Disponible para proyectos freelance selectos con empresas y clientes particulares.'
                  }
                </p>
                <div className="about-me-pills">
                  <span className="about-pill"><Building2 size={14} /> Nissan Gasme ({lang === 'en' ? 'On-site' : 'Presencial'})</span>
                  <span className="about-pill"><Briefcase size={14} /> Freelance ({lang === 'en' ? 'Remote' : 'Remoto'})</span>
                  <span className="about-pill"><MapPin size={14} /> Córdoba, Ver., México</span>
                </div>
              </div>

              <div className="footer-heading">
                <h3>{lang === 'en' ? 'Need a custom system?' : '¿Necesitas un sistema a medida?'}</h3>
                <p>{lang === 'en' ? "Let's talk about your next digital project." : 'Hablemos de tu próximo proyecto digital.'}</p>
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
                  <span>{lang === 'en' ? 'Message me on WhatsApp' : 'Escríbeme por WhatsApp'}</span>
                </a>
              </div>
              <div className="footer-bottom">
                <p>© {new Date().getFullYear()} Antonio Monterrosas. {lang === 'en' ? 'All rights reserved.' : 'Todos los derechos reservados.'}</p>
              </div>
            </div>
          </footer>
        </section>
      </div>

      {/* Detail Modal */}
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
                    alt={getProjectTitle(selectedProject)} 
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
                  alt={getProjectTitle(selectedProject)} 
                  className="modal-media"
                />
              )}
            </div>

            <div className="modal-info-section">
              <div className="modal-info-header">
                <h2 className="modal-title">
                  {getProjectTitle(selectedProject)}
                </h2>
                
                <div className="modal-tech-list">
                  {getProjectTechs(selectedProject).map((tech, i) => (
                    <span key={i} className="modal-tech-pill">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="modal-description-content">
                {getProjectDesc(selectedProject).split('\n\n').map((block, blockIdx) => {
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
                  
                  const allBlocks = getProjectDesc(selectedProject).split('\n\n');
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
                <a href="https://wa.me/522712831339" className="btn-primary modal-btn" target="_blank" rel="noopener noreferrer">
                  <MessageSquare size={18} /> {lang === 'en' ? 'Request a Demo' : 'Solicitar Demo'}
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