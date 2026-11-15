import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { playClickSound, setAudioEnabled, getAudioEnabled } from "../utils/audio";
import { Volume2, VolumeX, Sun, Moon, Globe, Menu, X } from "lucide-react";

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export const DynamicIsland = ({ activeSection, setActiveSection }) => {
  const { language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isAudio, setIsAudio] = useState(getAudioEnabled());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, Math.max(0, (window.scrollY / docHeight) * 100)) : 0;
      setScrollProgress(pct);

      const sections = ["about", "projects", "experience", "education", "certifications", "contact"];
      const scrollPosition = window.scrollY + 140;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            if (activeSection !== section) {
              setActiveSection(section);
            }
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection, setActiveSection]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = (sectionId) => {
    playClickSound();
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 90;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth"
      });
    }
  };

  const menuItems = [
    { id: "about", labelId: "Profil", labelEn: "Profile" },
    { id: "projects", labelId: "Showroom AI", labelEn: "AI Showroom" },
    { id: "experience", labelId: "Pengalaman", labelEn: "Experience" },
    { id: "education", labelId: "Riset & Studi", labelEn: "Research" },
    { id: "certifications", labelId: "Sertifikasi", labelEn: "Credentials" },
    { id: "contact", labelId: "Kontak", labelEn: "Contact" }
  ];

  return (
    <>
      <div className="top-scroll-progress-track" aria-hidden="true">
        <div
          className="top-scroll-progress-bar"
          style={{ transform: `scaleX(${scrollProgress / 100})` }}
        />
      </div>

      <header className="dynamic-island-container">
        <div className="dynamic-island-wrapper">
          <div className="island-navbar-layout">
            <button
              type="button"
              className="island-logo"
              onClick={() => handleNavClick("about")}
              aria-label={language === "id" ? "Kembali ke bagian atas" : "Scroll to top"}
            >
              <img
                src="/assets/brands/gpp-monogram.svg"
                alt=""
                width="30"
                height="30"
                className="island-logo-svg"
              />
              <span className="island-logo-text-group">
                <span className="island-logo-title">Galih Putra</span>
                <span className="island-logo-sub">AI Systems</span>
              </span>
            </button>

            <nav className="island-nav-links" aria-label={language === "id" ? "Navigasi Utama" : "Main Navigation"}>
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`island-nav-btn ${activeSection === item.id ? "active" : ""}`}
                  aria-current={activeSection === item.id ? "location" : undefined}
                  onClick={() => handleNavClick(item.id)}
                >
                  {language === "id" ? item.labelId : item.labelEn}
                </button>
              ))}
            </nav>

            <div className="island-controls">
              <a
                href="https://github.com/User-Galih"
                target="_blank"
                rel="noreferrer"
                className="island-github-link"
                onClick={playClickSound}
              >
                <GithubIcon size={14} />
                <span>User-Galih</span>
              </a>

              <button
                type="button"
                className="island-control-btn"
                onClick={() => {
                  playClickSound();
                  const nextState = !isAudio;
                  setIsAudio(nextState);
                  setAudioEnabled(nextState);
                }}
                aria-label={isAudio ? "Mute UI sound" : "Enable UI sound"}
                aria-pressed={isAudio}
              >
                {isAudio ? <Volume2 size={15} aria-hidden="true" /> : <VolumeX size={15} aria-hidden="true" />}
              </button>

              <button
                type="button"
                className="island-control-btn"
                onClick={() => {
                  playClickSound();
                  toggleTheme();
                }}
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === "dark" ? <Moon size={15} aria-hidden="true" /> : <Sun size={15} aria-hidden="true" />}
              </button>

              <button
                type="button"
                className="island-control-btn lang-btn"
                onClick={() => {
                  playClickSound();
                  toggleLanguage();
                }}
                aria-label={language === "id" ? "Ganti bahasa ke Inggris" : "Switch language to Indonesian"}
              >
                <Globe size={13} aria-hidden="true" />
                <span>{language.toUpperCase()}</span>
              </button>

              <button
                type="button"
                className="island-mobile-toggle"
                onClick={() => {
                  playClickSound();
                  setMobileMenuOpen((prev) => !prev);
                }}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-nav-drawer"
                aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              >
                {mobileMenuOpen ? <X size={16} aria-hidden="true" /> : <Menu size={16} aria-hidden="true" />}
                <span>Menu</span>
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <nav
              id="mobile-nav-drawer"
              className="island-mobile-drawer"
              aria-label={language === "id" ? "Navigasi Mobile" : "Mobile Navigation"}
            >
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`mobile-nav-item ${activeSection === item.id ? "active" : ""}`}
                  aria-current={activeSection === item.id ? "location" : undefined}
                  onClick={() => handleNavClick(item.id)}
                >
                  {language === "id" ? item.labelId : item.labelEn}
                </button>
              ))}
            </nav>
          )}
        </div>
      </header>
    </>
  );
};

export default DynamicIsland;
