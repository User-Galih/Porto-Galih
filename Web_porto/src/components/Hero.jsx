import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { playClickSound } from "../utils/audio";
import { ArrowUpRight, FileText, Sparkles, ShieldCheck } from "lucide-react";

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export const Hero = ({ setActiveSection, onViewDocument }) => {
  const { language } = useLanguage();

  const handleScrollTo = (targetId) => {
    playClickSound();
    setActiveSection(targetId);
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="about" className="hero-section container">
      <div className="hero-grid">
        {/* Left Column: AI Engineer Narrative & CTAs */}
        <div className="hero-left-content js-reveal">
          <div className="hero-status-pill">
            <span className="status-pulse-dot"></span>
            <span>
              {language === "id"
                ? "Terbuka untuk Peran AI Engineer & Research"
                : "Available for AI Engineering & Research Roles"}
            </span>
          </div>

          <h1 className="hero-title">
            <span className="gradient-text">GALIH PUTRA PRATAMA</span>
          </h1>

          <div className="hero-role-lead">
            <span>AI Engineer</span>
            <span style={{ color: "var(--border-medium)" }}>•</span>
            <span>Deep Learning Specialist</span>
            <span style={{ color: "var(--border-medium)" }}>•</span>
            <span style={{ color: "var(--accent-cyan)" }}>RAG & LLMOps</span>
          </div>

          <p className="hero-bio">
            {language === "id"
              ? "Membangun sistem AI produksi dari riset hingga deployment: Sistem Enterprise RAG berbahasa Indonesia dengan Hybrid Retrieval (pgvector + RRF), pemodelan Deep Learning time-series (BiLSTM + Attention, 94.46% blind test accuracy), arsitektur Computer Vision CNN, dan sistem multi-agent otonom."
              : "Building production-grade AI systems from research to edge deployment: Indonesian Enterprise RAG with Hybrid Retrieval (pgvector + RRF), Deep Learning time-series modeling (BiLSTM + Attention with 94.46% blind test accuracy), Computer Vision CNN, and autonomous multi-agent pipelines."}
          </p>

          <div className="hero-cta-group">
            <a
              href="https://smart-invest-app-git-main-helmi-azkias-projects.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="primary-btn"
              onClick={playClickSound}
            >
              <Sparkles size={16} />
              <span>{language === "id" ? "Live Demo SmartInvest" : "Launch SmartInvest"}</span>
              <ArrowUpRight size={18} />
            </a>

            <button
              className="secondary-btn"
              onClick={() => handleScrollTo("projects")}
            >
              <span>{language === "id" ? "Lihat Semua Proyek" : "View All Projects"}</span>
            </button>

            <button
              className="secondary-btn"
              onClick={() => {
                playClickSound();
                if (onViewDocument) onViewDocument("assets/documents/CV_Galih_Putra_Pratama_ATS.pdf");
              }}
            >
              <FileText size={16} />
              <span>{language === "id" ? "Unduh CV" : "View CV / Resume"}</span>
            </button>
          </div>

          {/* Key Metrics / Technical Benchmarks */}
          <div className="hero-stats-bar">
            <div className="stat-item">
              <span className="stat-value accent">94.46%</span>
              <span className="stat-label">
                {language === "id" ? "Akurasi Blind Test Model" : "Blind Test Model Accuracy"}
              </span>
            </div>

            <div className="stat-item">
              <span className="stat-value cyan">RRF + RAG</span>
              <span className="stat-label">
                {language === "id" ? "Hybrid Vector Retrieval" : "pgvector Hybrid Retrieval"}
              </span>
            </div>

            <div className="stat-item">
              <span className="stat-value">19+</span>
              <span className="stat-label">
                {language === "id" ? "Repositori GitHub Publik" : "Public GitHub Repositories"}
              </span>
            </div>

            <div className="stat-item">
              <span className="stat-value accent">3.72</span>
              <span className="stat-label">
                {language === "id" ? "IPK Cumlaude (UDINUS)" : "Cumlaude GPA (Informatics)"}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: AI Engineer Profile Card */}
        <div className="hero-profile-card glass-card js-reveal">
          <div className="profile-img-container">
            <img
              src="assets/images/foto_profil.jpeg"
              alt="Galih Putra Pratama"
              onError={(e) => {
                e.target.src = "https://avatars.githubusercontent.com/u/186676889?v=4";
              }}
            />
            <div className="profile-badge-overlay">
              <span className="badge-label">
                <ShieldCheck size={14} />
                <span>BNSP Associate Data Scientist</span>
              </span>
              <span className="badge-verified">Verified</span>
            </div>
          </div>

          <h3 className="profile-card-name">Galih Putra Pratama</h3>
          <p className="profile-card-role">
            {language === "id" ? "Teknik Informatika • UDINUS" : "Informatics Engineering • UDINUS"}
          </p>

          <div className="profile-tech-chips">
            <span className="skill-chip chip-primary">FastAPI</span>
            <span className="skill-chip chip-primary">pgvector</span>
            <span className="skill-chip chip-primary">Python</span>
            <span className="skill-chip chip-cyan">TensorFlow</span>
            <span className="skill-chip chip-cyan">PyTorch</span>
            <span className="skill-chip">Next.js</span>
            <span className="skill-chip">Docker</span>
            <span className="skill-chip">Qiskit</span>
          </div>

          <div style={{ display: "flex", gap: "10px", width: "100%", justifyContent: "center" }}>
            <a
              href="https://github.com/User-Galih"
              target="_blank"
              rel="noreferrer"
              className="card-action-btn btn-github"
              style={{ padding: "8px 16px" }}
              onClick={playClickSound}
            >
              <GithubIcon size={14} />
              <span>github.com/User-Galih</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
