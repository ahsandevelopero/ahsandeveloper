import React, { useState, useEffect, useRef } from "react";
import "./Contact.css";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactMethod {
  id: number;
  icon: string;
  title: string;
  value: string;
  link: string;
  color: string;
}

interface SocialLink {
  id: number;
  name: string;
  icon: string;
  url: string;
  color: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [visibleElements, setVisibleElements] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const contactMethods: ContactMethod[] = [
    {
      id: 1,
      icon: "📧",
      title: "Email",
      value: "hello@johndoe.com",
      link: "mailto:hello@johndoe.com",
      color: "#667eea",
    },
    {
      id: 2,
      icon: "📱",
      title: "Phone",
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567",
      color: "#f093fb",
    },
    {
      id: 3,
      icon: "📍",
      title: "Location",
      value: "San Francisco, CA",
      link: "https://maps.google.com",
      color: "#4facfe",
    },
    {
      id: 4,
      icon: "💼",
      title: "LinkedIn",
      value: "linkedin.com/in/johndoe",
      link: "https://linkedin.com",
      color: "#43e97b",
    },
  ];

  const socialLinks: SocialLink[] = [
    { id: 1, name: "GitHub", icon: "📦", url: "#", color: "#667eea" },
    { id: 2, name: "LinkedIn", icon: "💼", url: "#", color: "#f093fb" },
    { id: 3, name: "Twitter", icon: "🐦", url: "#", color: "#4facfe" },
    { id: 4, name: "Dribbble", icon: "🎨", url: "#", color: "#43e97b" },
    { id: 5, name: "Instagram", icon: "📸", url: "#", color: "#fa709a" },
  ];

  const availability = [
    { day: "Mon - Fri", hours: "9:00 AM - 6:00 PM", status: "available" },
    { day: "Saturday", hours: "10:00 AM - 4:00 PM", status: "limited" },
    { day: "Sunday", hours: "Closed", status: "unavailable" },
  ];

  // Initial visibility animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }, 2000);
  };

  const isFormValid = formData.name && formData.email && formData.message;

  return (
    <section
      className={`contact-section ${isVisible ? "visible" : ""}`}
      id="contact"
      ref={sectionRef}
    >
      {/* Animated Background */}
      <div className="contact-background">
        <div className="aurora-bg">
          <div className="aurora aurora-1"></div>
          <div className="aurora aurora-2"></div>
          <div className="aurora aurora-3"></div>
        </div>

        <div className="floating-shapes">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="shape"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${20 + Math.random() * 60}px`,
                height: `${20 + Math.random() * 60}px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${10 + Math.random() * 10}s`,
              }}
            ></div>
          ))}
        </div>

        <div className="grid-overlay"></div>

        <div
          className="contact-cursor-glow"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
          }}
        ></div>
      </div>

      <div className="contact-container">
        {/* Header */}
        <div className="contact-header">
          <div className="header-badge">
            <span className="badge-pulse"></span>
            <span className="badge-icon">💬</span>
            <span className="badge-text">Let's Connect</span>
          </div>
          <h2 className="contact-title">
            Get In <span className="title-gradient">Touch</span>
          </h2>
          <p className="contact-subtitle">
            Have a project in mind or just want to chat? I'd love to hear from
            you. Drop me a message and I'll get back to you as soon as possible.
          </p>
        </div>

        {/* Main Content */}
        <div className="contact-content">
          {/* Left Side - Contact Info */}
          <div className="contact-info">
            <div className="info-card main-card">
              <div className="card-decoration">
                <div className="deco-circle"></div>
                <div className="deco-circle"></div>
              </div>

              <h3 className="info-title">Let's Work Together</h3>
              <p className="info-description">
                I'm always open to discussing new projects, creative ideas, or
                opportunities to be part of your vision. Let's create something
                amazing!
              </p>

              {/* Contact Methods */}
              <div className="contact-methods">
                {contactMethods.map((method, index) => (
                  <a
                    key={method.id}
                    href={method.link}
                    className={`contact-method ${
                      visibleElements.includes(method.id) ? "visible" : ""
                    }`}
                    data-element-id={method.id}
                    style={
                      {
                        animationDelay: `${index * 0.1}s`,
                        "--method-color": method.color,
                      } as React.CSSProperties
                    }
                  >
                    <div className="method-icon">{method.icon}</div>
                    <div className="method-details">
                      <span className="method-title">{method.title}</span>
                      <span className="method-value">{method.value}</span>
                    </div>
                    <svg
                      className="method-arrow"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M5 10H15M15 10L10 5M15 10L10 15"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                ))}
              </div>

              {/* Social Links */}
              <div className="social-section">
                <h4 className="social-title">Follow Me</h4>
                <div className="social-links">
                  {socialLinks.map((social, index) => (
                    <a
                      key={social.id}
                      href={social.url}
                      className="social-link"
                      aria-label={social.name}
                      style={
                        {
                          animationDelay: `${index * 0.1}s`,
                          "--social-color": social.color,
                        } as React.CSSProperties
                      }
                    >
                      <span className="social-icon">{social.icon}</span>
                      <span className="social-tooltip">{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="availability-section">
                <h4 className="availability-title">
                  <span className="status-indicator"></span>
                  Availability
                </h4>
                <div className="availability-list">
                  {availability.map((item, index) => (
                    <div key={index} className="availability-item">
                      <span className="availability-day">{item.day}</span>
                      <span className="availability-hours">{item.hours}</span>
                      <span className={`availability-status ${item.status}`}>
                        {item.status === "available" && "✓"}
                        {item.status === "limited" && "○"}
                        {item.status === "unavailable" && "✕"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="contact-form-wrapper">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-decoration">
                <div className="form-glow"></div>
              </div>

              {/* Name Input */}
              <div
                className={`form-group ${
                  focusedField === "name" ? "focused" : ""
                }`}
              >
                <label htmlFor="name" className="form-label">
                  <span className="label-icon">👤</span>
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField("")}
                  placeholder="John Doe"
                  className="form-input"
                  required
                />
                <div className="input-border"></div>
              </div>

              {/* Email Input */}
              <div
                className={`form-group ${
                  focusedField === "email" ? "focused" : ""
                }`}
              >
                <label htmlFor="email" className="form-label">
                  <span className="label-icon">📧</span>
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField("")}
                  placeholder="john@example.com"
                  className="form-input"
                  required
                />
                <div className="input-border"></div>
              </div>

              {/* Subject Input */}
              <div
                className={`form-group ${
                  focusedField === "subject" ? "focused" : ""
                }`}
              >
                <label htmlFor="subject" className="form-label">
                  <span className="label-icon">💡</span>
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("subject")}
                  onBlur={() => setFocusedField("")}
                  placeholder="Project Inquiry"
                  className="form-input"
                />
                <div className="input-border"></div>
              </div>

              {/* Message Textarea */}
              <div
                className={`form-group ${
                  focusedField === "message" ? "focused" : ""
                }`}
              >
                <label htmlFor="message" className="form-label">
                  <span className="label-icon">✉️</span>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField("")}
                  placeholder="Tell me about your project..."
                  className="form-textarea"
                  rows={6}
                  required
                ></textarea>
                <div className="input-border"></div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`submit-btn ${isSubmitting ? "submitting" : ""} ${
                  submitStatus === "success" ? "success" : ""
                }`}
                disabled={!isFormValid || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    <span>Sending...</span>
                  </>
                ) : submitStatus === "success" ? (
                  <>
                    <span className="checkmark">✓</span>
                    <span>Message Sent!</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M18 2L9 11M18 2L12 18L9 11M18 2L2 8L9 11"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </>
                )}
              </button>

              {/* Status Message */}
              {submitStatus === "success" && (
                <div className="status-message success">
                  <span className="status-icon">🎉</span>
                  <p>
                    Thank you! Your message has been sent successfully. I'll get
                    back to you soon.
                  </p>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="status-message error">
                  <span className="status-icon">⚠️</span>
                  <p>
                    Oops! Something went wrong. Please try again or email me
                    directly.
                  </p>
                </div>
              )}
            </form>

            {/* Quick Response Info */}
            <div className="response-info">
              <div className="response-item">
                <span className="response-icon">⚡</span>
                <span className="response-text">Quick Response</span>
              </div>
              <div className="response-item">
                <span className="response-icon">🔒</span>
                <span className="response-text">100% Secure</span>
              </div>
              <div className="response-item">
                <span className="response-icon">✨</span>
                <span className="response-text">No Spam</span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="faq-section">
          <h3 className="faq-title">Frequently Asked Questions</h3>
          <div className="faq-grid">
            <div className="faq-item" data-element-id={100}>
              <div className="faq-icon">❓</div>
              <h4>What's your response time?</h4>
              <p>I typically respond within 24 hours on business days.</p>
            </div>
            <div className="faq-item" data-element-id={101}>
              <div className="faq-icon">💼</div>
              <h4>Do you take freelance work?</h4>
              <p>
                Yes! I'm available for freelance projects and long-term
                contracts.
              </p>
            </div>
            <div className="faq-item" data-element-id={102}>
              <div className="faq-icon">💰</div>
              <h4>How do you charge?</h4>
              <p>
                I offer both hourly rates and fixed-price projects depending on
                your needs.
              </p>
            </div>
            <div className="faq-item" data-element-id={103}>
              <div className="faq-icon">🌍</div>
              <h4>Do you work remotely?</h4>
              <p>
                Absolutely! I'm experienced in remote collaboration with global
                clients.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action */}
      <div className="floating-action">
        <a href="#contact" className="float-btn">
          <span className="float-icon">💬</span>
          <span className="float-pulse"></span>
        </a>
      </div>
    </section>
  );
};

export default Contact;
