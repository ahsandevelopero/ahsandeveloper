import React, { useState, useEffect, useRef } from "react";
import "./About.css";

interface TimelineItem {
  id: number;
  year: string;
  title: string;
  company: string;
  description: string;
  icon: string;
  color: string;
}

interface Stat {
  id: number;
  value: number;
  label: string;
  icon: string;
  suffix: string;
}

const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState("bio");
  const [visibleElements, setVisibleElements] = useState<number[]>([]);
  const [animatedStats, setAnimatedStats] = useState<{ [key: number]: number }>(
    {}
  );
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  const tabs = [
    { id: "bio", label: "Biography", icon: "👤" },
    { id: "experience", label: "Experience", icon: "💼" },
    { id: "education", label: "Education", icon: "🎓" },
    { id: "interests", label: "Interests", icon: "🎯" },
  ];

  const stats: Stat[] = [
    { id: 1, value: 5, label: "Years Experience", icon: "📅", suffix: "+" },
    { id: 2, value: 100, label: "Projects Completed", icon: "✅", suffix: "+" },
    { id: 3, value: 50, label: "Happy Clients", icon: "😊", suffix: "+" },
    { id: 4, value: 25, label: "Awards Won", icon: "🏆", suffix: "+" },
  ];

  const timeline: TimelineItem[] = [
    {
      id: 1,
      year: "2023 - Present",
      title: "Senior Full Stack Developer",
      company: "Tech Innovations Inc.",
      description:
        "Leading development of scalable web applications using React, Node.js, and cloud technologies. Mentoring junior developers and architecting complex solutions.",
      icon: "🚀",
      color: "#667eea",
    },
    {
      id: 2,
      year: "2021 - 2023",
      title: "Full Stack Developer",
      company: "Digital Solutions Ltd.",
      description:
        "Developed and maintained multiple client projects using modern JavaScript frameworks. Implemented CI/CD pipelines and improved application performance by 40%.",
      icon: "💻",
      color: "#f093fb",
    },
    {
      id: 3,
      year: "2019 - 2021",
      title: "Frontend Developer",
      company: "Creative Agency",
      description:
        "Created responsive and interactive user interfaces for various clients. Collaborated with designers to bring creative visions to life with pixel-perfect implementations.",
      icon: "🎨",
      color: "#4facfe",
    },
    {
      id: 4,
      year: "2018 - 2019",
      title: "Junior Developer",
      company: "StartUp Ventures",
      description:
        "Started my professional journey building web applications. Learned industry best practices and contributed to multiple successful product launches.",
      icon: "🌱",
      color: "#43e97b",
    },
  ];

  const education = [
    {
      id: 1,
      year: "2014 - 2018",
      degree: "Bachelor of Science in Computer Science",
      institution: "Tech University",
      description:
        "Graduated with honors. Specialized in software engineering and web technologies.",
      icon: "🎓",
      color: "#667eea",
    },
    {
      id: 2,
      year: "2020",
      degree: "Full Stack Web Development",
      institution: "Online Bootcamp",
      description:
        "Intensive program covering modern web development technologies and best practices.",
      icon: "💡",
      color: "#f093fb",
    },
  ];

  const interests = [
    {
      id: 1,
      name: "Open Source",
      icon: "🌐",
      description: "Contributing to community projects",
    },
    {
      id: 2,
      name: "AI & Machine Learning",
      icon: "🤖",
      description: "Exploring artificial intelligence",
    },
    {
      id: 3,
      name: "Photography",
      icon: "📸",
      description: "Capturing beautiful moments",
    },
    {
      id: 4,
      name: "Travel",
      icon: "✈️",
      description: "Exploring new cultures",
    },
    {
      id: 5,
      name: "Music",
      icon: "🎵",
      description: "Playing guitar and piano",
    },
    {
      id: 6,
      name: "Reading",
      icon: "📚",
      description: "Tech blogs and sci-fi novels",
    },
  ];

  const skills = [
    "Problem Solving",
    "Team Leadership",
    "Agile Methodologies",
    "Code Review",
    "Technical Writing",
    "UI/UX Design",
    "API Development",
    "Database Design",
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elementId = parseInt(
              entry.target.getAttribute("data-element-id") || "0"
            );
            setVisibleElements((prev) => [...new Set([...prev, elementId])]);
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll("[data-element-id]");
    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [activeTab]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            stats.forEach((stat) => {
              animateValue(stat.id, 0, stat.value, 2000);
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    const statsSection = document.querySelector(".about-stats");
    if (statsSection) {
      observer.observe(statsSection);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (section) {
        section.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  const animateValue = (
    id: number,
    start: number,
    end: number,
    duration: number
  ) => {
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = start + (end - start) * easeOutQuart;

      setAnimatedStats((prev) => ({ ...prev, [id]: Math.round(current) }));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <section className="about-section" id="about" ref={sectionRef}>
      {/* Animated Background */}
      <div className="about-background">
        <div className="gradient-orbs">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>

        <div className="mesh-gradient"></div>

        <div className="particle-field">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`,
              }}
            ></div>
          ))}
        </div>

        <div
          className="about-cursor-glow"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
          }}
        ></div>
      </div>

      <div className="about-container">
        {/* Header */}
        <div className="about-header">
          <div className="header-badge">
            <span className="badge-dot"></span>
            <span className="badge-icon">🙋‍♂️</span>
            <span className="badge-text">Get To Know Me</span>
          </div>
          <h2 className="about-title">
            About <span className="title-gradient">Me</span>
          </h2>
          <p className="about-subtitle">
            Passionate developer crafting digital experiences with code and
            creativity
          </p>
        </div>

        {/* Stats */}
        <div className="about-stats">
          {stats.map((stat) => (
            <div key={stat.id} className="stat-box" data-element-id={stat.id}>
              <div className="stat-icon-wrapper">
                <span className="stat-icon">{stat.icon}</span>
              </div>
              <div className="stat-number">
                {animatedStats[stat.id] || 0}
                {stat.suffix}
              </div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-progress">
                <div className="stat-progress-bar"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="about-content">
          {/* Left Side - Image & Info */}
          <div className="about-left">
            <div className="profile-card">
              {/* <div className="profile-image-wrapper">
                <div className="profile-rings">
                  <div className="ring ring-1"></div>
                  <div className="ring ring-2"></div>
                  <div className="ring ring-3"></div>
                </div>
                <div className="profile-image">
                  <div className="image-placeholder">
                    <img
                      src="src/assets/ahsan.png"
                      alt="Profile"
                      className="profile-photo"
                    />
                  </div>
                </div>
                <div className="status-badge">
                  <span className="status-dot"></span>
                  Available for work
                </div>
              </div> */}

              <div className="profile-image-wrapper">
                <div className="profile-rings">
                  <div className="ring ring-1"></div>
                  <div className="ring ring-2"></div>
                  <div className="ring ring-3"></div>
                </div>
                <div className="profile-image">
                  <div className="image-placeholder">
                    <img
                      src="src/assets/ahsan.png"
                      alt="Profile"
                      className="profile-photo"
                    />
                  </div>
                </div>
                {/* <div className="status-badge">
                  <span className="status-dot"></span>
                  Available for work
                </div> */}
              </div>

              <div className="profile-info">
                <h3 className="profile-name">Ahsan Hanif</h3>
                <p className="profile-role">Software Engineer</p>
                <div className="profile-location">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M8 8C9.10457 8 10 7.10457 10 6C10 4.89543 9.10457 4 8 4C6.89543 4 6 4.89543 6 6C6 7.10457 6.89543 8 8 8Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M8 14C8 14 13 10 13 6C13 3.23858 10.7614 1 8 1C5.23858 1 3 3.23858 3 6C3 10 8 14 8 14Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                  <span>Islamabad, Pakistan</span>
                </div>

                <div className="social-links">
                  <a
                    href="https://github.com/ahsandevelopero/"
                    className="social-icon"
                    aria-label="GitHub"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 0C4.475 0 0 4.475 0 10c0 4.425 2.8625 8.1625 6.8375 9.4875.5.0875.6875-.2125.6875-.475 0-.2375-.0125-1.025-.0125-1.8625-2.5125.4625-3.1625-.6125-3.3625-1.175-.1125-.2875-.6-1.175-1.025-1.4125-.35-.1875-.85-.65-.0125-.6625.7875-.0125 1.35.725 1.5375 1.025.9 1.5125 2.3375 1.0875 2.9125.825.0875-.65.35-1.0875.6375-1.3375-2.225-.25-4.55-1.1125-4.55-4.9375 0-1.0875.3875-1.9875 1.025-2.6875-.1-.25-.45-1.275.1-2.65 0 0 .8375-.2625 2.75 1.025.8-.225 1.65-.3375 2.5-.3375s1.7.1125 2.5.3375c1.9125-1.3 2.75-1.025 2.75-1.025.55 1.375.2 2.4.1 2.65.6375.7 1.025 1.5875 1.025 2.6875 0 3.8375-2.3375 4.6875-4.5625 4.9375.3625.3125.675.9125.675 1.85 0 1.3375-.0125 2.4125-.0125 2.75 0 .2625.1875.575.6875.475C17.1375 18.1625 20 14.4125 20 10c0-5.525-4.475-10-10-10z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/ahsan-hanif-055114139/"
                    className="social-icon"
                    aria-label="LinkedIn"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M17.04 17.043h-2.962v-4.64c0-1.107-.022-2.531-1.544-2.531-1.544 0-1.78 1.204-1.78 2.449v4.722H7.793V7.5h2.845v1.301h.039c.397-.75 1.364-1.54 2.808-1.54 3.001 0 3.556 1.975 3.556 4.546v5.236zM4.447 6.194c-.954 0-1.72-.775-1.72-1.72s.766-1.72 1.72-1.72c.954 0 1.72.775 1.72 1.72s-.773 1.72-1.72 1.72zm1.484 10.85h-2.97V7.5h2.97v9.543zM18.521 0H1.476C.66 0 0 .645 0 1.44v17.12C0 19.355.66 20 1.476 20h17.042c.815 0 1.482-.645 1.482-1.44V1.44C20 .645 19.333 0 18.518 0h.003z" />
                    </svg>
                  </a>
                  {/* <a href="#" className="social-icon" aria-label="Twitter">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M15.203 1.875h2.757l-6.023 6.883 7.088 9.367h-5.545l-4.345-5.681-4.972 5.681H1.405l6.442-7.363L1.25 1.875h5.688l3.928 5.19 4.337-5.19zm-.968 14.6h1.527L6.153 3.43H4.51l9.725 13.045z" />
                    </svg>
                  </a> */}
                  {/* <a href="#" className="social-icon" aria-label="Email">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M3.33 3.33h13.34c.92 0 1.66.75 1.66 1.67v10c0 .92-.74 1.67-1.66 1.67H3.33c-.92 0-1.66-.75-1.66-1.67V5c0-.92.74-1.67 1.66-1.67z" />
                      <path d="M18.33 5L10 10.83 1.67 5" />
                    </svg>
                  </a> */}
                </div>

                {/* <button className="download-cv-btn">
                  <span>Download CV</span>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path
                      d="M9 3V12M9 12L5.5 8.5M9 12L12.5 8.5M3 15H15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button> */}
              </div>

              <div className="quick-skills">
                {skills.map((skill, index) => (
                  <span key={index} className="quick-skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Tabs Content */}
          <div className="about-right">
            {/* Tabs */}
            <div className="tabs-container">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="tab-icon">{tab.icon}</span>
                  <span className="tab-label">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="tab-content">
              {/* Biography */}
              {activeTab === "bio" && (
                <div className="bio-content" data-element-id={100}>
                  <h3 className="content-title">Hello! I'm Ahsan Hanif👋</h3>
                  <p className="bio-text">
                    {/* I'm a passionate Full Stack Developer with over 5 years of
                    experience in creating beautiful, functional, and
                    user-centered digital experiences. My journey in web
                    development started with a curiosity about how things work
                    on the internet, and it has evolved into a career that I'm
                    truly passionate about. */}
                    I’m a passionate Software Engineer and Full Stack Developer
                    with over 3 years of experience building beautiful,
                    functional, and user-centered digital products. My journey
                    began with a simple curiosity about how the web works, which
                    quickly grew into a career I genuinely love.
                  </p>
                  <p className="bio-text">
                    {/* I specialize in building modern web applications using
                    cutting-edge technologies like React, Node.js, and
                    TypeScript. I'm constantly learning and adapting to new
                    technologies to ensure I deliver the best solutions for my
                    clients. */}
                    I specialize in creating modern web applications using
                    technologies such as React, Node.js, and TypeScript. I’m
                    always learning, experimenting, and staying up-to-date with
                    emerging tools and best practices to deliver high-quality
                    solutions.
                  </p>
                  <p className="bio-text">
                    {/* When I'm not coding, you'll find me exploring new
                    technologies, contributing to open-source projects, or
                    capturing moments through my camera lens. I believe in
                    continuous learning and sharing knowledge with the
                    community. */}
                  </p>

                  <div className="bio-highlights">
                    <div className="highlight-item">
                      <span className="highlight-icon">💼</span>
                      <div>
                        <h4>Professional</h4>
                        <p>5+ years building web applications</p>
                      </div>
                    </div>
                    <div className="highlight-item">
                      <span className="highlight-icon">🎯</span>
                      <div>
                        <h4>Focus Areas</h4>
                        <p>Full Stack Development & UI/UX</p>
                      </div>
                    </div>
                    <div className="highlight-item">
                      <span className="highlight-icon">🌍</span>
                      <div>
                        <h4>Remote Ready</h4>
                        <p>Available for global opportunities</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Experience */}
              {activeTab === "experience" && (
                <div className="experience-content">
                  <h3 className="content-title">Work Experience</h3>
                  <div className="timeline">
                    {timeline.map((item, index) => (
                      <div
                        key={item.id}
                        className="timeline-item"
                        data-element-id={item.id + 200}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div
                          className="timeline-dot"
                          style={{ background: item.color }}
                        >
                          <span className="timeline-icon">{item.icon}</span>
                        </div>
                        <div className="timeline-content">
                          <span className="timeline-year">{item.year}</span>
                          <h4 className="timeline-title">{item.title}</h4>
                          <p className="timeline-company">{item.company}</p>
                          <p className="timeline-description">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {activeTab === "education" && (
                <div className="education-content">
                  <h3 className="content-title">Education & Certifications</h3>
                  <div className="education-list">
                    {education.map((item, index) => (
                      <div
                        key={item.id}
                        className="education-item"
                        data-element-id={item.id + 300}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div
                          className="education-icon"
                          style={{ background: item.color }}
                        >
                          {item.icon}
                        </div>
                        <div className="education-details">
                          <span className="education-year">{item.year}</span>
                          <h4 className="education-degree">{item.degree}</h4>
                          <p className="education-institution">
                            {item.institution}
                          </p>
                          <p className="education-description">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="certifications">
                    <h4 className="cert-title">Certifications</h4>
                    <div className="cert-badges">
                      <span className="cert-badge">AWS Certified</span>
                      <span className="cert-badge">React Professional</span>
                      <span className="cert-badge">Node.js Expert</span>
                      <span className="cert-badge">Agile Practitioner</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Interests */}
              {activeTab === "interests" && (
                <div className="interests-content">
                  <h3 className="content-title">Interests & Hobbies</h3>
                  <p className="interests-intro">
                    Beyond coding, I have a diverse range of interests that keep
                    me inspired and balanced.
                  </p>
                  <div className="interests-grid">
                    {interests.map((interest, index) => (
                      <div
                        key={interest.id}
                        className="interest-card"
                        data-element-id={interest.id + 400}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <span className="interest-icon">{interest.icon}</span>
                        <h4 className="interest-name">{interest.name}</h4>
                        <p className="interest-description">
                          {interest.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
