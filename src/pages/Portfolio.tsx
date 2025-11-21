import React, { useState, useEffect, useRef } from "react";
import "./Portfolio.css";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  github: string;
}

const Portfolio: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [visibleProjects, setVisibleProjects] = useState<number[]>([]);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: "E-Commerce Platform",
      category: "web",
      description:
        "A full-stack e-commerce solution with real-time inventory management and payment integration.",
      image: "project1",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      link: "#",
      github: "#",
    },
    {
      id: 2,
      title: "AI Chat Application",
      category: "app",
      description:
        "Real-time chat application powered by AI with natural language processing capabilities.",
      image: "project2",
      tags: ["TypeScript", "WebSocket", "OpenAI", "Redis"],
      link: "#",
      github: "#",
    },
    {
      id: 3,
      title: "Brand Identity Design",
      category: "design",
      description:
        "Complete brand identity package including logo, color palette, and style guide.",
      image: "project3",
      tags: ["Figma", "Illustrator", "Branding"],
      link: "#",
      github: "#",
    },
    {
      id: 4,
      title: "Task Management App",
      category: "app",
      description:
        "Collaborative task management tool with drag-and-drop interface and team features.",
      image: "project4",
      tags: ["React Native", "Firebase", "Redux"],
      link: "#",
      github: "#",
    },
    {
      id: 5,
      title: "Portfolio Website",
      category: "web",
      description:
        "Modern portfolio website with smooth animations and interactive 3D elements.",
      image: "project5",
      tags: ["Three.js", "GSAP", "Next.js"],
      link: "#",
      github: "#",
    },
    {
      id: 6,
      title: "Dashboard UI Kit",
      category: "design",
      description:
        "Comprehensive UI kit for admin dashboards with 50+ components and templates.",
      image: "project6",
      tags: ["Figma", "Design System", "UI/UX"],
      link: "#",
      github: "#",
    },
    {
      id: 7,
      title: "Social Media Analytics",
      category: "web",
      description:
        "Analytics dashboard for tracking social media metrics across multiple platforms.",
      image: "project7",
      tags: ["Vue.js", "D3.js", "API Integration"],
      link: "#",
      github: "#",
    },
    {
      id: 8,
      title: "Fitness Tracking App",
      category: "app",
      description:
        "Mobile app for tracking workouts, nutrition, and fitness goals with AI recommendations.",
      image: "project8",
      tags: ["Flutter", "TensorFlow", "Cloud Functions"],
      link: "#",
      github: "#",
    },
    {
      id: 9,
      title: "Restaurant Website",
      category: "web",
      description:
        "Interactive restaurant website with online ordering and reservation system.",
      image: "project9",
      tags: ["React", "Tailwind", "Stripe"],
      link: "#",
      github: "#",
    },
  ];

  const categories = [
    { id: "all", name: "All Projects", icon: "🎯" },
    { id: "web", name: "Web Development", icon: "💻" },
    { id: "app", name: "Mobile Apps", icon: "📱" },
    { id: "design", name: "UI/UX Design", icon: "🎨" },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const projectId = parseInt(
              entry.target.getAttribute("data-project-id") || "0"
            );
            setVisibleProjects((prev) => [...new Set([...prev, projectId])]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const projectCards = document.querySelectorAll(".project-card");
    projectCards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [filteredProjects]);

  return (
    <section className="portfolio-section" id="portfolio" ref={sectionRef}>
      {/* Animated Background */}
      <div className="portfolio-background">
        <div className="bg-gradient"></div>
        <div className="grid-pattern"></div>
        <div className="floating-elements">
          <div className="float-element element-1"></div>
          <div className="float-element element-2"></div>
          <div className="float-element element-3"></div>
          <div className="float-element element-4"></div>
        </div>
      </div>

      {/* Content */}
      <div className="portfolio-container">
        {/* Header */}
        <div className="portfolio-header">
          <div className="section-badge">
            <span className="badge-icon">💼</span>
            <span>My Work</span>
          </div>
          <h2 className="section-title">
            Featured <span className="title-highlight">Projects</span>
          </h2>
          <p className="section-description">
            Explore my latest work spanning web development, mobile
            applications, and creative design solutions. Each project represents
            a unique challenge and innovative solution.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="filter-container">
          <div className="filter-tabs">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`filter-tab ${
                  activeFilter === category.id ? "active" : ""
                }`}
                onClick={() => setActiveFilter(category.id)}
              >
                <span className="tab-icon">{category.icon}</span>
                <span className="tab-name">{category.name}</span>
                <span className="tab-count">
                  {category.id === "all"
                    ? projects.length
                    : projects.filter((p) => p.category === category.id).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              data-project-id={project.id}
              className={`project-card ${
                visibleProjects.includes(project.id) ? "visible" : ""
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="project-image-container">
                <div className={`project-image ${project.image}`}>
                  {/* Placeholder gradient - replace with actual images */}
                  <div className="image-overlay"></div>
                  <div className="image-placeholder">
                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                      <rect
                        x="10"
                        y="20"
                        width="60"
                        height="40"
                        rx="4"
                        stroke="currentColor"
                        strokeWidth="2"
                        opacity="0.5"
                      />
                      <circle
                        cx="25"
                        cy="35"
                        r="5"
                        fill="currentColor"
                        opacity="0.3"
                      />
                      <path
                        d="M10 50 L30 35 L45 45 L70 25"
                        stroke="currentColor"
                        strokeWidth="2"
                        opacity="0.5"
                      />
                    </svg>
                  </div>
                </div>

                <div
                  className={`project-overlay ${
                    hoveredProject === project.id ? "active" : ""
                  }`}
                >
                  <div className="overlay-content">
                    <a
                      href={project.link}
                      className="overlay-btn"
                      aria-label="View Project"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </a>
                    <a
                      href={project.github}
                      className="overlay-btn"
                      aria-label="View Code"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              <div className="project-content">
                <div className="project-category">
                  {categories.find((c) => c.id === project.category)?.icon}{" "}
                  {project.category}
                </div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                <div className="project-tags">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="project-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="project-footer">
                  <a href={project.link} className="project-link">
                    View Project
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M3 8H13M13 8L8 3M13 8L8 13"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="card-glow"></div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="portfolio-stats">
          <div className="stat-item">
            <div className="stat-icon">🎯</div>
            <div className="stat-number">50+</div>
            <div className="stat-label">Projects Completed</div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">😊</div>
            <div className="stat-number">30+</div>
            <div className="stat-label">Happy Clients</div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">🏆</div>
            <div className="stat-number">15+</div>
            <div className="stat-label">Awards Won</div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">⭐</div>
            <div className="stat-number">5.0</div>
            <div className="stat-label">Average Rating</div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="portfolio-cta">
          <h3 className="cta-title">Have a project in mind?</h3>
          <p className="cta-description">
            Let's work together to bring your ideas to life with cutting-edge
            technology and creative solutions.
          </p>
          <button className="cta-button">
            <span>Start a Project</span>
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
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="decorative-elements">
        <div className="deco-circle circle-1"></div>
        <div className="deco-circle circle-2"></div>
        <div className="deco-circle circle-3"></div>
      </div>
    </section>
  );
};

export default Portfolio;
