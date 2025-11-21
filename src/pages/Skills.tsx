import React, { useState, useEffect, useRef } from "react";
import "./Skills.css";

interface Skill {
  id: number;
  name: string;
  level: number;
  category: string;
  icon: string;
  color: string;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
}

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleSkills, setVisibleSkills] = useState<number[]>([]);
  const [animatedValues, setAnimatedValues] = useState<{
    [key: number]: number;
  }>({});
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const categories: Category[] = [
    {
      id: "all",
      name: "All Skills",
      icon: "🎯",
      description: "Complete skill set overview",
    },
    {
      id: "frontend",
      name: "Frontend",
      icon: "🎨",
      description: "UI/UX & Client-side technologies",
    },
    {
      id: "backend",
      name: "Backend",
      icon: "⚙️",
      description: "Server-side & Database management",
    },
    {
      id: "tools",
      name: "Tools & Others",
      icon: "🛠️",
      description: "Development tools & utilities",
    },
  ];

  const skills: Skill[] = [
    // Frontend
    {
      id: 1,
      name: "React",
      level: 95,
      category: "frontend",
      icon: "⚛️",
      color: "#61dafb",
    },
    {
      id: 2,
      name: "TypeScript",
      level: 90,
      category: "frontend",
      icon: "📘",
      color: "#3178c6",
    },
    {
      id: 3,
      name: "JavaScript",
      level: 95,
      category: "frontend",
      icon: "🟨",
      color: "#f7df1e",
    },
    {
      id: 4,
      name: "HTML5",
      level: 98,
      category: "frontend",
      icon: "🌐",
      color: "#e34f26",
    },
    {
      id: 5,
      name: "CSS3/SASS",
      level: 92,
      category: "frontend",
      icon: "🎨",
      color: "#1572b6",
    },
    {
      id: 6,
      name: "Vue.js",
      level: 85,
      category: "frontend",
      icon: "💚",
      color: "#42b883",
    },
    {
      id: 7,
      name: "Next.js",
      level: 88,
      category: "frontend",
      icon: "▲",
      color: "#000000",
    },
    {
      id: 8,
      name: "Tailwind CSS",
      level: 90,
      category: "frontend",
      icon: "💨",
      color: "#06b6d4",
    },

    // Backend
    {
      id: 9,
      name: "Node.js",
      level: 90,
      category: "backend",
      icon: "🟢",
      color: "#339933",
    },
    {
      id: 10,
      name: "Python",
      level: 85,
      category: "backend",
      icon: "🐍",
      color: "#3776ab",
    },
    {
      id: 11,
      name: "Express.js",
      level: 88,
      category: "backend",
      icon: "🚂",
      color: "#000000",
    },
    {
      id: 12,
      name: "MongoDB",
      level: 86,
      category: "backend",
      icon: "🍃",
      color: "#47a248",
    },
    {
      id: 13,
      name: "PostgreSQL",
      level: 82,
      category: "backend",
      icon: "🐘",
      color: "#336791",
    },
    {
      id: 14,
      name: "GraphQL",
      level: 80,
      category: "backend",
      icon: "◈",
      color: "#e10098",
    },
    {
      id: 15,
      name: "REST APIs",
      level: 92,
      category: "backend",
      icon: "🔌",
      color: "#009688",
    },
    {
      id: 16,
      name: "Firebase",
      level: 85,
      category: "backend",
      icon: "🔥",
      color: "#ffca28",
    },

    // Tools
    {
      id: 17,
      name: "Git",
      level: 93,
      category: "tools",
      icon: "📦",
      color: "#f05032",
    },
    {
      id: 18,
      name: "Docker",
      level: 80,
      category: "tools",
      icon: "🐳",
      color: "#2496ed",
    },
    {
      id: 19,
      name: "Webpack",
      level: 82,
      category: "tools",
      icon: "📦",
      color: "#8dd6f9",
    },
    {
      id: 20,
      name: "Figma",
      level: 88,
      category: "tools",
      icon: "🎨",
      color: "#f24e1e",
    },
    {
      id: 21,
      name: "VS Code",
      level: 95,
      category: "tools",
      icon: "💻",
      color: "#007acc",
    },
    {
      id: 22,
      name: "AWS",
      level: 78,
      category: "tools",
      icon: "☁️",
      color: "#ff9900",
    },
    {
      id: 23,
      name: "Jest",
      level: 85,
      category: "tools",
      icon: "🃏",
      color: "#c21325",
    },
    {
      id: 24,
      name: "CI/CD",
      level: 80,
      category: "tools",
      icon: "🔄",
      color: "#667eea",
    },
  ];

  const filteredSkills =
    activeCategory === "all"
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const skillId = parseInt(
              entry.target.getAttribute("data-skill-id") || "0"
            );
            setVisibleSkills((prev) => [...new Set([...prev, skillId])]);

            // Animate the progress value
            const skill = skills.find((s) => s.id === skillId);
            if (skill) {
              animateValue(skillId, 0, skill.level, 1500);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    const skillElements = document.querySelectorAll(
      ".skill-item, .circular-skill"
    );
    skillElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [filteredSkills]);

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

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = start + (end - start) * easeOutQuart;

      setAnimatedValues((prev) => ({ ...prev, [id]: Math.round(current) }));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  const topSkills = skills.sort((a, b) => b.level - a.level).slice(0, 6);

  return (
    <section className="skills-section" id="skills" ref={sectionRef}>
      {/* Animated Background */}
      <div className="skills-background">
        <div className="wave-container">
          <svg
            className="wave wave-1"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z" />
          </svg>
          <svg
            className="wave wave-2"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path d="M0,50 C200,100 400,20 600,70 C800,120 1000,40 1200,90 L1200,120 L0,120 Z" />
          </svg>
          <svg
            className="wave wave-3"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path d="M0,80 C250,50 450,100 600,60 C750,20 950,90 1200,70 L1200,120 L0,120 Z" />
          </svg>
        </div>

        <div className="code-rain">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="code-column"
              style={{ left: `${i * 5}%`, animationDelay: `${i * 0.1}s` }}
            >
              {["<", ">", "{", "}", "/", "=", "+", "-", "*"].map((char, j) => (
                <span key={j}>{char}</span>
              ))}
            </div>
          ))}
        </div>

        <div className="hexagon-grid">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="hexagon"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            ></div>
          ))}
        </div>

        <div
          className="skill-cursor-glow"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
          }}
        ></div>
      </div>

      <div className="skills-container">
        {/* Header */}
        <div className="skills-header">
          <div className="section-badge">
            <span className="badge-pulse"></span>
            <span className="badge-icon">💪</span>
            <span className="badge-text">My Expertise</span>
          </div>
          <h2 className="skills-title">
            Technical <span className="title-gradient">Skills</span>
          </h2>
          <p className="skills-description">
            A comprehensive overview of my technical abilities and proficiency
            levels across various technologies, frameworks, and tools.
          </p>
        </div>

        {/* Category Filters */}
        <div className="category-filters">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-btn ${
                activeCategory === category.id ? "active" : ""
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              <span className="category-icon">{category.icon}</span>
              <div className="category-info">
                <span className="category-name">{category.name}</span>
                <span className="category-desc">{category.description}</span>
              </div>
              <span className="category-count">
                {category.id === "all"
                  ? skills.length
                  : skills.filter((s) => s.category === category.id).length}
              </span>
            </button>
          ))}
        </div>

        {/* Top Skills - Circular Progress */}
        <div className="top-skills-section">
          <h3 className="subsection-title">
            <span className="title-icon">🌟</span>
            Top Skills
          </h3>
          <div className="circular-skills-grid">
            {topSkills.map((skill, index) => (
              <div
                key={skill.id}
                data-skill-id={skill.id}
                className={`circular-skill ${
                  visibleSkills.includes(skill.id) ? "visible" : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="circular-progress">
                  <svg className="progress-ring" viewBox="0 0 120 120">
                    <circle
                      className="progress-ring-bg"
                      cx="60"
                      cy="60"
                      r="54"
                    />
                    <circle
                      className="progress-ring-fill"
                      cx="60"
                      cy="60"
                      r="54"
                      style={{
                        strokeDashoffset:
                          339.292 -
                          (339.292 * (animatedValues[skill.id] || 0)) / 100,
                        stroke: skill.color,
                      }}
                    />
                  </svg>
                  <div className="progress-content">
                    <span className="progress-icon">{skill.icon}</span>
                    <span className="progress-value">
                      {animatedValues[skill.id] || 0}%
                    </span>
                  </div>
                </div>
                <h4 className="skill-name">{skill.name}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* All Skills - Linear Progress */}
        <div className="all-skills-section">
          <h3 className="subsection-title">
            <span className="title-icon">📊</span>
            All Skills ({filteredSkills.length})
          </h3>
          <div className="skills-list">
            {filteredSkills.map((skill, index) => (
              <div
                key={skill.id}
                data-skill-id={skill.id}
                className={`skill-item ${
                  visibleSkills.includes(skill.id) ? "visible" : ""
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="skill-header">
                  <div className="skill-info">
                    <span className="skill-icon">{skill.icon}</span>
                    <span className="skill-label">{skill.name}</span>
                  </div>
                  <span className="skill-percentage">
                    {animatedValues[skill.id] || 0}%
                  </span>
                </div>
                <div className="skill-bar-container">
                  <div
                    className="skill-bar"
                    style={{
                      width: `${animatedValues[skill.id] || 0}%`,
                      background: `linear-gradient(90deg, ${skill.color}, ${skill.color}dd)`,
                    }}
                  >
                    <div className="bar-shine"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Summary */}
        <div className="skills-summary">
          <div className="summary-card">
            <div className="summary-icon">🎯</div>
            <div className="summary-content">
              <h4>Frontend Development</h4>
              <p>Expert in modern UI frameworks and responsive design</p>
              <div className="summary-badge">8 Skills</div>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon">⚙️</div>
            <div className="summary-content">
              <h4>Backend Development</h4>
              <p>Proficient in server-side technologies and databases</p>
              <div className="summary-badge">8 Skills</div>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon">🛠️</div>
            <div className="summary-content">
              <h4>Tools & DevOps</h4>
              <p>Experienced with modern development workflows</p>
              <div className="summary-badge">8 Skills</div>
            </div>
          </div>
        </div>

        {/* Learning Progress */}
        <div className="learning-section">
          <div className="learning-header">
            <h3 className="subsection-title">
              <span className="title-icon">📚</span>
              Currently Learning
            </h3>
          </div>
          <div className="learning-grid">
            <div className="learning-card">
              <div className="learning-icon">🦀</div>
              <h4>Rust</h4>
              <p>Systems programming language</p>
              <div className="learning-progress">
                <div className="learning-bar" style={{ width: "45%" }}></div>
              </div>
              <span className="learning-percentage">45%</span>
            </div>

            <div className="learning-card">
              <div className="learning-icon">🤖</div>
              <h4>Machine Learning</h4>
              <p>AI & neural networks</p>
              <div className="learning-progress">
                <div className="learning-bar" style={{ width: "60%" }}></div>
              </div>
              <span className="learning-percentage">60%</span>
            </div>

            <div className="learning-card">
              <div className="learning-icon">🔷</div>
              <h4>Kubernetes</h4>
              <p>Container orchestration</p>
              <div className="learning-progress">
                <div className="learning-bar" style={{ width: "35%" }}></div>
              </div>
              <span className="learning-percentage">35%</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="skills-cta">
          <div className="cta-content">
            <h3>Want to see these skills in action?</h3>
            <p>
              Check out my portfolio to explore projects showcasing these
              technologies
            </p>
            <div className="cta-buttons">
              <button className="cta-btn primary">
                <span>View Projects</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M4 10H16M16 10L11 5M16 10L11 15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button className="cta-btn secondary">
                <span>Download Resume</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M10 3V13M10 13L6 9M10 13L14 9M4 17H16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
