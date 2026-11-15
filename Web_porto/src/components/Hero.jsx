import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { playClickSound } from "../utils/audio";
import { FileText, ShieldCheck, Terminal, CheckCircle2 } from "lucide-react";

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
      const offset = 88;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="about" className="hero-section container" aria-labelledby="hero-heading">
      <div className="hero-grid">
        {/* Left Column: Engineering Value Prop, Primary Actions & Verified Metrics */}
        <div className="hero-left-content">
          <p className="hero-role-kicker">
            <span>AI Engineer</span>
            <span className="kicker-sep" aria-hidden="true">/</span>
            <span>Deep Learning &amp; Time-Series</span>
            <span className="kicker-sep" aria-hidden="true">/</span>
            <span>Enterprise RAG &amp; LLMOps</span>
          </p>

          <h1 id="hero-heading" className="hero-title">
            {language === "id"
              ? "Membangun Sistem AI Produksi yang Terukur, Terverifikasi, dan Siap Deploy."
              : "Engineering Measurable, Grounded, Production-Ready AI Systems."}
          </h1>

          <p className="hero-bio">
            {language === "id"
              ? "Galih Putra Pratama merancang pipeline AI end-to-end dari eksperimen model hingga microservice terdistribusi: Hybrid RAG berbahasa Indonesia (pgvector + RRF, Recall@5 98%), klasifikasi tren pasar modal BiLSTM + Multi-Head Attention (akurasi blind test 94.46%), Computer Vision EfficientNetV2 di Docker, serta integrasi Google Gemini API."
              : "Galih Putra Pratama architects end-to-end AI pipelines from model research to distributed microservices: Indonesian Hybrid RAG (pgvector + RRF, 98% Recall@5), BiLSTM + Multi-Head Attention equity trend classification (94.46% blind test accuracy), Dockerized EfficientNetV2 Computer Vision, and Google Gemini API workflows."}
          </p>

          <div className="hero-cta-group">
            <button
              type="button"
              className="primary-btn"
              onClick={() => handleScrollTo("projects")}
            >
              <Terminal size={17} aria-hidden="true" />
              <span>
                {language === "id"
                  ? "Eksplorasi 4 Sistem Flagship"
                  : "Explore 4 Flagship Systems"}
              </span>
            </button>

            <button
              type="button"
              className="secondary-btn"
              onClick={() => {
                playClickSound();
                if (onViewDocument) onViewDocument("assets/documents/CV_Galih_Putra_Pratama_ATS.pdf");
              }}
            >
              <FileText size={16} aria-hidden="true" />
              <span>{language === "id" ? "Buka CV ATS (PDF)" : "Read ATS Resume (PDF)"}</span>
            </button>
          </div>

          {/* 3 Verifiable Engineering Benchmarks */}
          <dl className="hero-stats-bar" aria-label={language === "id" ? "Metrik rekayasa terverifikasi" : "Verified engineering benchmarks"}>
            <div className="stat-item">
              <dt className="stat-label">
                {language === "id" ? "Blind Test Emiten LQ45 (BiLSTM+Attention)" : "LQ45 Blind Test (BiLSTM+Attention)"}
              </dt>
              <dd className="stat-value accent">94.46%</dd>
              <span className="stat-meta">Macro F1: 93.00% (15-Day Window)</span>
            </div>

            <div className="stat-item">
              <dt className="stat-label">
                {language === "id" ? "Hybrid Retrieval NusaPolicy (50 Uji)" : "NusaPolicy Hybrid Retrieval (50 Tests)"}
              </dt>
              <dd className="stat-value accent">98.0%</dd>
              <span className="stat-meta">Recall@5 (pgvector + FTS RRF)</span>
            </div>

            <div className="stat-item">
              <dt className="stat-label">
                {language === "id" ? "Akademik & Sertifikasi Nasional" : "Academic & National Credential"}
              </dt>
              <dd className="stat-value">3.72 / 4.00</dd>
              <span className="stat-meta">S.Kom. Cumlaude &bull; BNSP Verified</span>
            </div>
          </dl>
        </div>

        {/* Right Column: Engineering Identity Dossier Card */}
        <aside className="hero-profile-card surface-card" aria-label="Galih Putra Pratama Dossier">
          <div className="profile-img-container">
            <img
              src="assets/images/foto_profil.jpeg"
              alt="Galih Putra Pratama, AI Engineer"
              width="280"
              height="280"
              fetchPriority="high"
              onError={(e) => {
                e.target.src = "https://avatars.githubusercontent.com/u/186676889?v=4";
              }}
            />
            <div className="profile-badge-overlay">
              <span className="badge-label">
                <ShieldCheck size={14} aria-hidden="true" />
                <span>BNSP Associate Data Scientist</span>
              </span>
              <span className="badge-verified">MET.0001.000325</span>
            </div>
          </div>

          <h2 className="profile-card-name">Galih Putra Pratama</h2>
          <p className="profile-card-role">
            {language === "id"
              ? "S.Kom. Teknik Informatika (Cumlaude) • UDINUS"
              : "B.Comp.Sc. Informatics Engineering (Cumlaude) • UDINUS"}
          </p>

          <div className="profile-highlights-list">
            <div className="profile-highlight-row">
              <CheckCircle2 size={14} className="highlight-icon" aria-hidden="true" />
              <span>
                {language === "id"
                  ? "Ketua Tim Capstone AI SmartInvest (DBS Foundation)"
                  : "SmartInvest AI Capstone Team Lead (DBS Foundation)"}
              </span>
            </div>
            <div className="profile-highlight-row">
              <CheckCircle2 size={14} className="highlight-icon" aria-hidden="true" />
              <span>
                {language === "id"
                  ? "Penulis Pertama Jurnal JURIKTI (DOI Terverifikasi)"
                  : "First Author in JURIKTI Journal (DOI Verified)"}
              </span>
            </div>
          </div>

          <div className="profile-tech-chips" aria-label="Core technical stack">
            <span className="skill-chip chip-primary">Python</span>
            <span className="skill-chip chip-primary">FastAPI</span>
            <span className="skill-chip chip-primary">pgvector + RRF</span>
            <span className="skill-chip">TensorFlow / Keras</span>
            <span className="skill-chip">Google Gemini API</span>
            <span className="skill-chip">React 19 / Next.js</span>
            <span className="skill-chip">Docker</span>
            <span className="skill-chip">Qiskit</span>
          </div>

          <div className="profile-card-footer">
            <a
              href="https://github.com/User-Galih"
              target="_blank"
              rel="noreferrer"
              className="card-action-btn btn-github-full"
              onClick={playClickSound}
            >
              <GithubIcon size={15} />
              <span>github.com/User-Galih</span>
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Hero;
