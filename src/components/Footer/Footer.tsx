import React, { useState, useEffect, useRef } from "react";
import "./Footer.css";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Initialize particles
  useEffect(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        x: Math.random() * (window.innerWidth || 1200),
        y: Math.random() * 600,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
      });
    }
    setParticles(newParticles);
  }, []);

  // Animate particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96, 165, 250, ${Math.random() * 0.5 + 0.3})`;
        ctx.fill();
      });

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${
              0.2 * (1 - distance / 150)
            })`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [particles]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail("");
        setSubscribed(false);
      }, 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: "About Us", url: "#about" },
      { name: "Our Team", url: "#team" },
      { name: "Careers", url: "#careers" },
      //   { name: "Press Kit", url: "#press" },
      { name: "Contact", url: "#contact" },
    ],
    resources: [
      { name: "Blog", url: "#blog" },
      { name: "Documentation", url: "#docs" },
      { name: "Help Center", url: "#help" },
      { name: "Community", url: "#community" },
      //   { name: "API Status", url: "#status" },
    ],
    legal: [
      { name: "Privacy Policy", url: "#privacy" },
      { name: "Terms of Service", url: "#terms" },
      { name: "Cookie Policy", url: "#cookies" },
      { name: "GDPR", url: "#gdpr" },
      //   { name: "Licenses", url: "#licenses" },
    ],
  };

  const socialMedia = [
    { name: "GitHub", icon: "💻", url: "#github", color: "#333" },
    // { name: "Twitter", icon: "🐦", url: "#twitter", color: "#1DA1F2" },
    { name: "LinkedIn", icon: "💼", url: "#linkedin", color: "#0077B5" },
    // { name: "Discord", icon: "💬", url: "#discord", color: "#5865F2" },
    { name: "YouTube", icon: "📺", url: "#youtube", color: "#FF0000" },
    { name: "Instagram", icon: "📸", url: "#instagram", color: "#E4405F" },
  ];

  return (
    <footer className="footer">
      {/* Animated Canvas Background */}
      <canvas ref={canvasRef} className="footer-canvas" />

      {/* Animated Waves */}
      <div className="waves-container">
        <svg
          className="waves"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            className="wave wave-1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,101.3C1248,85,1344,75,1392,69.3L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>
        <svg
          className="waves"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            className="wave wave-2"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,208C960,192,1056,160,1152,154.7C1248,149,1344,171,1392,181.3L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>
        <svg
          className="waves"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            className="wave wave-3"
            d="M0,160L48,170.7C96,181,192,203,288,197.3C384,192,480,160,576,144C672,128,768,128,864,138.7C960,149,1056,171,1152,165.3C1248,160,1344,128,1392,112L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>
      </div>

      <div className="footer-content">
        {/* Main Content Grid */}
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-column footer-brand">
            <div className="brand-wrapper">
              <div className="brand-logo-container">
                <div className="logo-hexagon">
                  <span className="logo-symbol">⚡</span>
                </div>
              </div>
              <h2 className="brand-title">NexaFlow</h2>
            </div>
            <p className="brand-tagline">
              Empowering innovation through cutting-edge technology solutions.
              Building the future, one line of code at a time.
            </p>
            <div className="brand-stats">
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">50K+</span>
                <span className="stat-label">Users</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">99%</span>
                <span className="stat-label">Satisfaction</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div className="footer-column">
            <h3 className="column-title">
              <span className="title-icon">🏢</span>
              Company
            </h3>
            <ul className="footer-links">
              {footerLinks.company.map((link, index) => (
                <li
                  key={link.name}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <a href={link.url} className="footer-link">
                    <span className="link-dot"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div className="footer-column">
            <h3 className="column-title">
              <span className="title-icon">📚</span>
              Resources
            </h3>
            <ul className="footer-links">
              {footerLinks.resources.map((link, index) => (
                <li
                  key={link.name}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <a href={link.url} className="footer-link">
                    <span className="link-dot"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="footer-column">
            <h3 className="column-title">
              <span className="title-icon">⚖️</span>
              Legal
            </h3>
            <ul className="footer-links">
              {footerLinks.legal.map((link, index) => (
                <li
                  key={link.name}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <a href={link.url} className="footer-link">
                    <span className="link-dot"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          {/* <div className="footer-column footer-newsletter">
            <h3 className="column-title">
              <span className="title-icon">✉️</span>
              Stay Connected
            </h3>
            <p className="newsletter-text">
              Join our newsletter for exclusive updates, tips, and special
              offers.
            </p>
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <div className="form-group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="newsletter-input"
                  required
                  disabled={subscribed}
                />
                <button
                  type="submit"
                  className={`newsletter-submit ${
                    subscribed ? "subscribed" : ""
                  }`}
                  disabled={subscribed}
                >
                  {subscribed ? (
                    <>
                      <span className="submit-icon">✓</span>
                      Subscribed!
                    </>
                  ) : (
                    <>
                      <span className="submit-icon">→</span>
                      Subscribe
                    </>
                  )}
                </button>
              </div>
            </form>
            <div className="trust-badges">
              <div className="badge">🔒 Secure</div>
              <div className="badge">🚀 Fast</div>
              <div className="badge">💎 Premium</div>
            </div>
          </div> */}
        </div>

        {/* Social Media Section */}
        <div className="social-section">
          <h3 className="social-title">Connect With Us</h3>
          <div className="social-grid">
            {socialMedia.map((social, index) => (
              <a
                key={social.name}
                href={social.url}
                className="social-card"
                style={{ animationDelay: `${index * 0.1}s` }}
                aria-label={social.name}
              >
                <div className="social-icon-wrapper">
                  <span className="social-icon">{social.icon}</span>
                </div>
                <span className="social-name">{social.name}</span>
                <div className="social-hover-effect"></div>
              </a>
            ))}
          </div>
        </div>

        {/* Divider with Animation */}
        <div className="footer-divider">
          <div className="divider-line"></div>
          <div className="divider-decoration">
            <span className="decoration-dot"></span>
            <span className="decoration-dot"></span>
            <span className="decoration-dot"></span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="bottom-left">
            <p className="copyright">
              © {currentYear} <strong>Ahsan Hanif</strong>. All rights reserved.
            </p>
            {/* <p className="crafted-text">
              Crafted with <span className="heart">❤️</span> and{" "}
              <span className="coffee">☕</span>
            </p> */}
          </div>
          <div className="bottom-right">
            <div className="language-selector">
              <span className="globe-icon">🌐</span>
              <select className="language-select">
                {/* <option value="en">English</option> */}
                {/* <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="ja">日本語</option> */}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        className="scroll-top-btn"
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <span className="scroll-icon">↑</span>
        <span className="scroll-text">Top</span>
      </button>

      {/* Floating Elements */}
      <div className="floating-elements">
        <div className="floating-element element-1">✨</div>
        <div className="floating-element element-2">⭐</div>
        <div className="floating-element element-3">💫</div>
        <div className="floating-element element-4">🌟</div>
      </div>
    </footer>
  );
};

export default Footer;
