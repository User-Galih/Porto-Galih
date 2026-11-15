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

  // Active Section Observer
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

  // Porsche-Style Choreographed Scroll-Reveal Engine
  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
        el.classList.add("is-visible");
      });
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.08
      }
    );

    const observeAllTargets = () => {
      document.querySelectorAll(".reveal-on-scroll:not(.is-visible)").forEach((el) => {
        revealObserver.observe(el);
      });
    };

    observeAllTargets();

    const mutationObserver = new MutationObserver(() => {
      observeAllTargets();
    });

    const mainNode = document.getElementById("main-content");
    if (mainNode) {
      mutationObserver.observe(mainNode, { childList: true, subtree: true });
    }

    return () => {
      revealObserver.disconnect();
      mutationObserver.disconnect();
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
        {/* BAND 1: EDITORIAL HERO + PORSCHE SPEC BAR */}
        <div className="section-band section-band-hero">
          <Hero
            setActiveSection={setActiveSection}
            onViewDocument={(url) => setActiveDocument(url)}
          />
        </div>

        {/* BAND 2: PORSCHE SHOWROOM FLAGSHIPS & BENTO ARCHIVE */}
        <div className="section-band section-band-showroom">
          <Projects
            onSelectProject={(project) => setSelectedProject(project)}
            onViewDocument={(url) => setActiveDocument(url)}
          />
        </div>

        {/* BAND 3: LEADERSHIP EXPERIENCE & ACADEMIC PUBLICATION */}
        <div className="section-band section-band-editorial">
          <Experience />
          <Education />
        </div>

        {/* BAND 4: VERIFIED NATIONAL & INDUSTRY CREDENTIALS */}
        <div className="section-band section-band-showroom">
          <Certifications
            onViewDocument={(url) => setActiveDocument(url)}
          />
        </div>

        {/* BAND 5: ASYMMETRIC HIGH-CONTRAST COLLABORATION CALLOUT */}
        <div className="section-band section-band-contact">
          <Contact />
        </div>
      </main>

      <footer className="app-footer-bar">
        <div className="container footer-layout">
          <div className="footer-brand-row">
            <img
              src="/assets/brands/gpp-monogram.svg"
              alt=""
              width="26"
              height="26"
              className="footer-logo-svg"
            />
            <p className="footer-copyright">
              &copy; {new Date().getFullYear()} Galih Putra Pratama. AI Engineering &amp; Deep Learning Portfolio.
            </p>
          </div>

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
