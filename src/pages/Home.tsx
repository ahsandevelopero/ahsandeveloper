import React, { useEffect, useState } from "react";
import "./Home.css";

const Home: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="home-section" id="home">
      {/* Animated Background */}
      <div className="background-container">
        <div className="gradient-bg"></div>
        <div className="animated-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          <div className="shape shape-5"></div>
        </div>
        <div
          className="parallax-layer"
          style={{
            transform: `translate(${mousePosition.x * 0.05}px, ${
              mousePosition.y * 0.05
            }px)`,
          }}
        ></div>
      </div>

      {/* Content */}
      <div className={`home-content ${isVisible ? "visible" : ""}`}>
        <div className="content-wrapper">
          <div className="text-content">
            {/* <div className="greeting">
              <span className="wave">👋</span>
              <h3>Hello, I'm</h3>
            </div> */}

            <h1 className="main-title">
              <span className="title-line">Ahsan Hanif</span>
              <span className="title-gradient">Software Engineer</span>
            </h1>

            <p className="description">
              I craft beautiful, responsive, and user-friendly digital
              experiences that bring ideas to life. Specializing in modern web
              technologies and innovative design solutions.
            </p>

            <div className="cta-buttons">
              <button className="btn btn-primary">
                <span>View My Work</span>
                <svg
                  className="btn-icon"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M4 10H16M16 10L11 5M16 10L11 15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button className="btn btn-secondary">
                <span>Get In Touch</span>
              </button>
            </div>

            <div className="social-links">
              <a href="#" className="social-link" aria-label="GitHub">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>

              <a href="#" className="social-link" aria-label="LinkedIn">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>

              <a href="#" className="social-link" aria-label="Twitter">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              <a href="#" className="social-link" aria-label="Email">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </a>
            </div>
          </div>

          <div className="visual-content">
            <div className="profile-container">
              <div className="profile-ring ring-1"></div>
              <div className="profile-ring ring-2"></div>
              <div className="profile-ring ring-3"></div>
              {/* <div className="profile-image">
                <div className="image-placeholder">
                  <svg
                    width="120"
                    height="120"
                    viewBox="0 0 120 120"
                    fill="none"
                  >
                    <circle
                      cx="60"
                      cy="40"
                      r="20"
                      fill="currentColor"
                      opacity="0.3"
                    />
                    <path
                      d="M30 90c0-16.569 13.431-30 30-30s30 13.431 30 30"
                      fill="currentColor"
                      opacity="0.3"
                    />
                  </svg>
                </div>
              </div> */}

              <div className="profile-image">
                <div className="image-placeholder">
                  <img
                    src="src/assets/ahsan.png"
                    alt="Ahsan Profile"
                    className="profile-photo"
                  />
                  {/* <svg
                    width="120"
                    height="120"
                    viewBox="0 0 120 120"
                    fill="none"
                  >
                    <circle
                      cx="60"
                      cy="40"
                      r="20"
                      fill="currentColor"
                      opacity="0.3"
                    />
                    <path
                      d="M30 90c0-16.569 13.431-30 30-30s30 13.431 30 30"
                      fill="currentColor"
                      opacity="0.3"
                    />
                  </svg> */}
                </div>
              </div>

              <div className="floating-badge badge-1">
                <span>🚀</span>
              </div>
              <div className="floating-badge badge-2">
                <span>💡</span>
              </div>
              <div className="floating-badge badge-3">
                <span>⚡</span>
              </div>
            </div>
          </div>
        </div>

        <div className="scroll-indicator">
          <span>Scroll Down</span>
          <div className="scroll-arrow">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M10 4V16M10 16L4 10M10 16L16 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
