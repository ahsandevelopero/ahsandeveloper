import React, { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const navLinks = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "about", label: "About", icon: "👤" },
    { id: "portfolio", label: "Portfolio", icon: "💼" },
    { id: "services", label: "Services", icon: "⚡" },
    { id: "skills", label: "Skills", icon: "🎯" },
    { id: "contact", label: "Contact", icon: "📧" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navLinks.map((link) => link.id);
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = !isMobileMenuOpen ? "hidden" : "auto";
  };

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setIsMobileMenuOpen(false);
    document.body.style.overflow = "auto";

    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        {/* Animated Background */}
        <div className="navbar-background">
          <div className="nav-gradient"></div>
          <div className="nav-particles">
            <div className="particle particle-1"></div>
            <div className="particle particle-2"></div>
            <div className="particle particle-3"></div>
          </div>
          <div
            className="nav-glow"
            style={{
              left: `${mousePosition.x}px`,
              top: `${mousePosition.y}px`,
            }}
          ></div>
        </div>

        <div className="navbar-container">
          {/* Logo */}
          <a
            href="#home"
            className="navbar-logo"
            onClick={() => handleNavClick("home")}
          >
            <div className="logo-icon">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path
                  d="M20 5L35 12.5V27.5L20 35L5 27.5V12.5L20 5Z"
                  stroke="url(#logo-gradient)"
                  strokeWidth="2"
                  fill="none"
                  className="logo-shape"
                />
                <circle
                  cx="20"
                  cy="20"
                  r="6"
                  fill="url(#logo-gradient)"
                  className="logo-center"
                />
                <defs>
                  <linearGradient
                    id="logo-gradient"
                    x1="5"
                    y1="5"
                    x2="35"
                    y2="35"
                  >
                    <stop offset="0%" stopColor="#667eea" />
                    <stop offset="100%" stopColor="#764ba2" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="logo-text">
              {/* <span className="logo-name">DevFolio</span> */}
              <span className="logo-name">Ahsan Hanif</span>
              <span className="logo-tagline">Software Engineer</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <ul className="nav-menu desktop-menu">
            {navLinks.map((link, index) => (
              <li
                key={link.id}
                className="nav-item"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <a
                  href={`#${link.id}`}
                  className={`nav-link ${
                    activeSection === link.id ? "active" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.id);
                  }}
                >
                  <span className="link-icon">{link.icon}</span>
                  <span className="link-text">{link.label}</span>
                  <span className="link-indicator"></span>
                </a>
              </li>
            ))}
          </ul>

          {/* Action Buttons */}
          <div className="navbar-actions">
            <button className="theme-toggle" aria-label="Toggle Theme">
              <svg
                className="theme-icon sun"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <circle
                  cx="10"
                  cy="10"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M10 2V4M10 16V18M18 10H16M4 10H2M15.5 4.5L14 6M6 14L4.5 15.5M15.5 15.5L14 14M6 6L4.5 4.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <button className="cta-button">
              <span>Hire Me</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8H13M13 8L8 3M13 8L8 13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className={`mobile-menu-toggle ${
                isMobileMenuOpen ? "active" : ""
              }`}
              onClick={toggleMobileMenu}
              aria-label="Toggle Mobile Menu"
            >
              <span className="hamburger-line line-1"></span>
              <span className="hamburger-line line-2"></span>
              <span className="hamburger-line line-3"></span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="scroll-progress">
          <div
            className="progress-bar"
            style={{
              width: `${
                (window.scrollY /
                  (document.documentElement.scrollHeight -
                    window.innerHeight)) *
                100
              }%`,
            }}
          ></div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-menu-overlay ${isMobileMenuOpen ? "active" : ""}`}
      >
        <div className="mobile-menu-background">
          <div className="mobile-bg-gradient"></div>
          <div className="mobile-shapes">
            <div className="mobile-shape shape-1"></div>
            <div className="mobile-shape shape-2"></div>
            <div className="mobile-shape shape-3"></div>
          </div>
        </div>

        <div className="mobile-menu-content">
          <div className="mobile-menu-header">
            <div className="mobile-logo">
              <svg width="50" height="50" viewBox="0 0 40 40" fill="none">
                <path
                  d="M20 5L35 12.5V27.5L20 35L5 27.5V12.5L20 5Z"
                  stroke="url(#mobile-logo-gradient)"
                  strokeWidth="2"
                  fill="none"
                />
                <circle
                  cx="20"
                  cy="20"
                  r="6"
                  fill="url(#mobile-logo-gradient)"
                />
                <defs>
                  <linearGradient
                    id="mobile-logo-gradient"
                    x1="5"
                    y1="5"
                    x2="35"
                    y2="35"
                  >
                    <stop offset="0%" stopColor="#667eea" />
                    <stop offset="100%" stopColor="#764ba2" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <button
              className="mobile-menu-close"
              onClick={toggleMobileMenu}
              aria-label="Close Mobile Menu"
            >
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                <path
                  d="M7 7L23 23M23 7L7 23"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <ul className="mobile-nav-menu">
            {navLinks.map((link, index) => (
              <li
                key={link.id}
                className={`mobile-nav-item ${
                  isMobileMenuOpen ? "visible" : ""
                }`}
                style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
              >
                <a
                  href={`#${link.id}`}
                  className={`mobile-nav-link ${
                    activeSection === link.id ? "active" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.id);
                  }}
                >
                  <span className="mobile-link-icon">{link.icon}</span>
                  <span className="mobile-link-text">{link.label}</span>
                  <span className="mobile-link-number">0{index + 1}</span>
                </a>
              </li>
            ))}
          </ul>

          <div
            className={`mobile-menu-footer ${
              isMobileMenuOpen ? "visible" : ""
            }`}
          >
            <div className="mobile-social-links">
              <a href="#" className="mobile-social-link" aria-label="GitHub">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a href="#" className="mobile-social-link" aria-label="LinkedIn">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="#" className="mobile-social-link" aria-label="Twitter">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="mobile-social-link" aria-label="Dribbble">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm8.66 6.78c1.2 1.62 1.93 3.6 2.01 5.76-2.55-.54-4.98-.54-7.26-.09-.21-.51-.42-1.02-.66-1.5 2.46-1.02 4.56-2.49 5.91-4.17zM12 2.04c2.1 0 4.02.69 5.58 1.86-1.2 1.5-3.06 2.82-5.28 3.72-1.29-2.37-2.73-4.35-4.26-5.88 1.23-.45 2.55-.7 3.96-.7zM5.43 3.57c1.56 1.5 3.03 3.48 4.35 5.88-2.64.81-5.64 1.23-8.7 1.23-.03-.39-.06-.78-.06-1.17 0-2.28.81-4.38 2.16-6.03.75.03 1.5.06 2.25.09zm-3.39 8.1c3.27 0 6.42-.48 9.15-1.38.24.45.45.93.66 1.41-3.45 1.08-6.42 3.15-8.52 5.82C1.77 16.02 1.02 14.1 1.02 12c0-.12 0-.21.02-.33zM12 21.96c-1.92 0-3.72-.54-5.25-1.47 1.86-2.43 4.53-4.29 7.65-5.25.78 2.43 1.35 5.04 1.65 7.8-1.35.57-2.82.92-4.35.92zm6.36-1.86c-.27-2.52-.78-4.92-1.5-7.17 2.1-.42 4.35-.36 6.63.21-.57 3.03-2.31 5.64-4.74 7.5.21-.18.42-.36.61-.54z" />
                </svg>
              </a>
            </div>
            <p className="mobile-footer-text">
              Let's create something amazing together
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
