import React, { useState, useEffect, useRef } from "react";
import "./Services.css";

interface Service {
  id: number;
  title: string;
  icon: string;
  description: string;
  features: string[];
  color: string;
  delay: number;
}

const Services: React.FC = () => {
  const [activeService, setActiveService] = useState<number | null>(null);
  const [visibleServices, setVisibleServices] = useState<number[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  const services: Service[] = [
    {
      id: 1,
      title: "Web Development",
      icon: "💻",
      description:
        "Build modern, responsive websites and web applications with cutting-edge technologies.",
      features: [
        "Responsive Design",
        "Performance Optimization",
        "SEO Friendly",
        "Cross-Browser Compatible",
      ],
      color: "#667eea",
      delay: 0,
    },
    {
      id: 2,
      title: "Mobile App Development",
      icon: "📱",
      description:
        "Create intuitive and powerful mobile applications for iOS and Android platforms.",
      features: [
        "Native & Cross-Platform",
        "User-Friendly Interface",
        "Offline Functionality",
        "Push Notifications",
      ],
      color: "#f093fb",
      delay: 0.1,
    },
    {
      id: 3,
      title: "UI/UX Design",
      icon: "🎨",
      description:
        "Design beautiful and intuitive user experiences that delight your customers.",
      features: [
        "User Research",
        "Wireframing & Prototyping",
        "Visual Design",
        "Usability Testing",
      ],
      color: "#4facfe",
      delay: 0.2,
    },
    {
      id: 4,
      title: "Backend Development",
      icon: "⚙️",
      description:
        "Build robust and scalable server-side solutions with secure APIs and databases.",
      features: [
        "RESTful APIs",
        "Database Design",
        "Cloud Integration",
        "Security Best Practices",
      ],
      color: "#43e97b",
      delay: 0.3,
    },
    {
      id: 5,
      title: "E-Commerce Solutions",
      icon: "🛒",
      description:
        "Develop complete e-commerce platforms with payment integration and inventory management.",
      features: [
        "Payment Gateway Integration",
        "Shopping Cart",
        "Order Management",
        "Analytics Dashboard",
      ],
      color: "#fa709a",
      delay: 0.4,
    },
    {
      id: 6,
      title: "Digital Marketing",
      icon: "📊",
      description:
        "Boost your online presence with data-driven marketing strategies and campaigns.",
      features: [
        "SEO Optimization",
        "Social Media Marketing",
        "Content Strategy",
        "Analytics & Reporting",
      ],
      color: "#30cfd0",
      delay: 0.5,
    },
  ];

  const processSteps = [
    {
      number: "01",
      title: "Discovery",
      description: "Understanding your needs and project requirements",
      icon: "🔍",
    },
    {
      number: "02",
      title: "Planning",
      description: "Creating a strategic roadmap for success",
      icon: "📋",
    },
    {
      number: "03",
      title: "Design",
      description: "Crafting beautiful and functional interfaces",
      icon: "✨",
    },
    {
      number: "04",
      title: "Development",
      description: "Building your solution with best practices",
      icon: "🚀",
    },
    {
      number: "05",
      title: "Testing",
      description: "Ensuring quality and performance",
      icon: "✅",
    },
    {
      number: "06",
      title: "Launch",
      description: "Deploying and supporting your project",
      icon: "🎉",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const serviceId = parseInt(
              entry.target.getAttribute("data-service-id") || "0"
            );
            setVisibleServices((prev) => [...new Set([...prev, serviceId])]);
          }
        });
      },
      { threshold: 0.2 }
    );

    const serviceCards = document.querySelectorAll(".service-card");
    serviceCards.forEach((card) => observer.observe(card));

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

  return (
    <section className="services-section" id="services" ref={sectionRef}>
      {/* Animated Background */}
      <div className="services-background">
        <div className="bg-gradient-animated"></div>
        <div className="geometric-shapes">
          <div className="geo-shape shape-1"></div>
          <div className="geo-shape shape-2"></div>
          <div className="geo-shape shape-3"></div>
          <div className="geo-shape shape-4"></div>
          <div className="geo-shape shape-5"></div>
        </div>
        <div className="dots-pattern"></div>
        <div
          className="cursor-glow"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
          }}
        ></div>
      </div>

      <div className="services-container">
        {/* Header */}
        <div className="services-header">
          <div className="header-badge">
            <span className="badge-icon">⚡</span>
            <span className="badge-text">What I Offer</span>
          </div>
          <h2 className="services-title">
            My <span className="title-gradient">Services</span>
          </h2>
          <p className="services-description">
            Transforming ideas into exceptional digital experiences with
            expertise in modern technologies and design principles. Let's build
            something amazing together.
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {services.map((service) => (
            <div
              key={service.id}
              data-service-id={service.id}
              className={`service-card ${
                visibleServices.includes(service.id) ? "visible" : ""
              } ${activeService === service.id ? "active" : ""}`}
              style={
                {
                  animationDelay: `${service.delay}s`,
                  "--service-color": service.color,
                } as React.CSSProperties
              }
              onMouseEnter={() => setActiveService(service.id)}
              onMouseLeave={() => setActiveService(null)}
            >
              <div className="card-glow-effect"></div>

              <div className="service-icon-wrapper">
                <div className="icon-background"></div>
                <span className="service-icon">{service.icon}</span>
                <div className="icon-ring ring-1"></div>
                <div className="icon-ring ring-2"></div>
              </div>

              <div className="service-content">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>

                <ul className="service-features">
                  {service.features.map((feature, index) => (
                    <li key={index} className="feature-item">
                      <svg
                        className="check-icon"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <circle
                          cx="10"
                          cy="10"
                          r="9"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          opacity="0.3"
                        />
                        <path
                          d="M6 10L9 13L14 7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className="service-cta">
                  <span>Learn More</span>
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
              </div>

              <div className="card-shine"></div>
            </div>
          ))}
        </div>

        {/* Process Timeline */}
        <div className="process-section">
          <div className="process-header">
            <h3 className="process-title">My Work Process</h3>
            <p className="process-description">
              A systematic approach to deliver exceptional results
            </p>
          </div>

          <div className="process-timeline">
            <div className="timeline-line"></div>
            {processSteps.map((step, index) => (
              <div
                key={index}
                className="process-step"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="step-number">{step.number}</div>
                <div className="step-icon">{step.icon}</div>
                <div className="step-content">
                  <h4 className="step-title">{step.title}</h4>
                  <p className="step-description">{step.description}</p>
                </div>
                <div className="step-connector"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="services-stats">
          <div className="stat-card">
            <div className="stat-icon">⚡</div>
            <div className="stat-number" data-target="100">
              100+
            </div>
            <div className="stat-label">Projects Completed</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">😊</div>
            <div className="stat-number" data-target="50">
              50+
            </div>
            <div className="stat-label">Happy Clients</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🏆</div>
            <div className="stat-number" data-target="25">
              25+
            </div>
            <div className="stat-label">Awards Won</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-number" data-target="5">
              5.0
            </div>
            <div className="stat-label">Average Rating</div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="services-cta-section">
          <div className="cta-content">
            <h3 className="cta-title">Ready to Start Your Project?</h3>
            <p className="cta-description">
              Let's collaborate to bring your vision to life with cutting-edge
              technology and creative solutions tailored to your needs.
            </p>
            <div className="cta-buttons">
              <button className="cta-primary">
                <span>Get Started</span>
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
              <button className="cta-secondary">
                <span>View Portfolio</span>
              </button>
            </div>
          </div>
          <div className="cta-decoration">
            <div className="deco-circle circle-1"></div>
            <div className="deco-circle circle-2"></div>
            <div className="deco-circle circle-3"></div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="floating-decorations">
        <div className="float-deco deco-1">✨</div>
        <div className="float-deco deco-2">🚀</div>
        <div className="float-deco deco-3">💡</div>
        <div className="float-deco deco-4">⚡</div>
      </div>
    </section>
  );
};

export default Services;
