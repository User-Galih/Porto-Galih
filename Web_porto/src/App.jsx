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

function App() {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState("about");
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeDocument, setActiveDocument] = useState(null);

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

  return (
    <div className={`portfolio-app-root ${theme}-theme`}>
      <a href="#main-content" className="skip-to-content-link">
        Skip to main content
      </a>

      <DynamicIsland
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <main id="main-content" className="main-content-flow">
        <Hero
          setActiveSection={setActiveSection}
          onViewDocument={(url) => setActiveDocument(url)}
        />

        <hr className="section-divider-line container" />

        <Projects
          onSelectProject={(project) => setSelectedProject(project)}
        />

        <hr className="section-divider-line container" />

        <Experience />

        <hr className="section-divider-line container" />

        <Education />

        <hr className="section-divider-line container" />

        <Certifications
          onViewDocument={(url) => setActiveDocument(url)}
        />

        <hr className="section-divider-line container" />

        <Contact />
      </main>

      <footer className="app-footer-bar">
        <div className="container footer-layout">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} Galih Putra Pratama. AI Engineering &amp; Deep Learning Portfolio.
          </p>

          <div className="footer-system-stats">
            <span>React 19</span>
            <span aria-hidden="true">&bull;</span>
            <span>5-Pillar AI Blueprint</span>
            <span aria-hidden="true">&bull;</span>
            <a
              href="https://github.com/User-Galih"
              target="_blank"
              rel="noreferrer"
              className="footer-github-anchor"
            >
              github.com/User-Galih
            </a>
          </div>
        </div>
      </footer>

      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onViewDocument={(url) => setActiveDocument(url)}
        />
      )}

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
