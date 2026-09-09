import React, { useState, useEffect } from "react";
import { useTheme } from "./context/ThemeContext";
import DynamicIsland from "./components/DynamicIsland";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import ProjectDetailModal from "./components/ProjectDetailModal";
import DocumentModal from "./components/DocumentModal";
import { useScrollReveal } from "./hooks/useScrollReveal";

function App() {
  // language available via context in child components
  const { theme } = useTheme();

  // Section Navigation State
  const [activeSection, setActiveSection] = useState("about");

  // Modals & Overlay States
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeDocument, setActiveDocument] = useState(null);
  useScrollReveal();

  // Intersection Observer for active scroll section
  useEffect(() => {
    const sections = ["about", "projects", "experience", "education", "certifications", "contact"];

    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -65% 0px",
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  useEffect(() => {
    const bar = document.querySelector(".scroll-progress");
    if (!bar) return undefined;

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      bar.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`portfolio-app-root ${theme}-theme`}>
      <div className="scroll-progress" aria-hidden="true" />
      {/* Floating Dynamic Island Navigation */}
      <DynamicIsland
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Content Sections */}
      <main className="main-content-flow">
        {/* 1. Hero & AI Engineer Profile */}
        <Hero
          setActiveSection={setActiveSection}
          onViewDocument={(url) => setActiveDocument(url)}
        />

        <div className="section-divider-line container"></div>

        {/* 2. Flagship Systems & All GitHub Repositories */}
        <Projects
          onSelectProject={(project) => setSelectedProject(project)}
        />

        <div className="section-divider-line container"></div>

        {/* 3. Career & Technical Leadership Experience */}
        <Experience />

        <div className="section-divider-line container"></div>

        {/* 4. Academic Background & Research */}
        <Education
          onViewDocument={(url) => setActiveDocument(url)}
        />

        <div className="section-divider-line container"></div>

        {/* 5. 18 Verified Professional Certifications */}
        <Certifications
          onViewDocument={(url) => setActiveDocument(url)}
        />

        <div className="section-divider-line container"></div>

        {/* 6. Developer Contact & Collaboration */}
        <Contact />
      </main>

      {/* Modern Engineering Footer */}
      <footer className="app-footer-bar">
        <div className="container footer-layout">
          <p className="footer-copyright">
            © {new Date().getFullYear()} Galih Putra Pratama. Built with passion for AI Engineering.
          </p>

          <div className="footer-system-stats">
            <span>React 19</span>
            <span>•</span>
            <span>Vite</span>
            <span>•</span>
            <a
              href="https://github.com/User-Galih"
              target="_blank"
              rel="noreferrer"
              style={{ color: "var(--accent-primary)", textDecoration: "none" }}
            >
              github.com/User-Galih
            </a>
          </div>
        </div>
      </footer>

      {/* Project Deep Dive Architecture Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onViewDocument={(url) => setActiveDocument(url)}
        />
      )}

      {/* Quick Look PDF Document / Certificate Modal */}
      {activeDocument && (
        <DocumentModal
          fileUrl={activeDocument}
          onClose={() => setActiveDocument(null)}
        />
      )}
    </div>
  );
}

export default App;
