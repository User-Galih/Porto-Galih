import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { playClickSound } from "../utils/audio";
import { FileText, ShieldCheck, ArrowUpRight, Sparkles, Award } from "lucide-react";

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const FOCUS_PILLARS = [
  {
    id: "all-systems",
    labelId: "01 · AI & LLM Systems",
    labelEn: "01 · AI & LLM Systems",
    headlineId: "Merancang Sistem AI Produksi yang Terukur, Terverifikasi, dan Siap Dipakai Perusahaan.",
    headlineEn: "Engineering Measurable, Verifiable, Production-Ready AI Systems.",
    accentWordId: "Siap Dipakai Perusahaan.",
    accentWordEn: "Production-Ready AI Systems.",
    descId:
      "Galih Putra Pratama membangun sistem AI end-to-end dari riset arsitektur model hingga aplikasi web produksi: Multi-Tenant Regulatory RAG berbahasa Indonesia (NusaPolicy v2.0, Recall@5 98%), ekosistem analisis pasar modal BiLSTM + Multi-Head Attention (SmartInvest, akurasi blind test 94.46%), serta orkestrasi Google Gemini API.",
    descEn:
      "Galih Putra Pratama builds end-to-end AI systems from model architecture to live web applications: Multi-Tenant Indonesian Regulatory RAG (NusaPolicy v2.0, 98% Recall@5), BiLSTM + Multi-Head Attention equity intelligence (SmartInvest, 94.46% blind test accuracy), and Google Gemini API orchestration."
  },
  {
    id: "quant-dl",
    labelId: "02 · Deep Learning & Quant",
    labelEn: "02 · Deep Learning & Quant",
    headlineId: "Arsitektur Deep Learning & Time-Series Kuantitatif dengan Validasi Blind Test Nyata.",
    headlineEn: "Quantitative Time-Series & Deep Learning Architectures Verified on Blind Tests.",
    accentWordId: "Validasi Blind Test Nyata.",
    accentWordEn: "Verified on Blind Tests.",
    descId:
      "Memimpin tim Capstone AI SmartInvest (DBS Foundation & Dicoding): merancang pipeline real-time yfinance untuk saham LQ45 & IDX30, melatih arsitektur Bidirectional LSTM + Multi-Head Attention (94.46% blind test accuracy, Macro F1 93.00%), serta sistem rekomendasi profil risiko XGBoost (93.10%).",
    descEn:
      "Led the SmartInvest AI Capstone team (DBS Foundation & Dicoding): engineered live yfinance market pipelines for LQ45 & IDX30, trained Bidirectional LSTM + Multi-Head Attention models (94.46% blind test accuracy, 93.00% Macro F1), and XGBoost risk-profiling recommenders (93.10%)."
  },
  {
    id: "cv-research",
    labelId: "03 · Computer Vision & Riset",
    labelEn: "03 · Computer Vision & Research",
    headlineId: "Computer Vision Terkontainerisasi Docker & Publikasi Riset Ilmiah Terverifikasi DOI.",
    headlineEn: "Dockerized Computer Vision & Peer-Reviewed Research Published with DOI.",
    accentWordId: "Terverifikasi DOI.",
    accentWordEn: "Published with DOI.",
    descId:
      "Penulis Pertama pada jurnal ilmiah JURIKTI (komparasi algoritma SIFT vs AKAZE pada dataset wajah NIST, waktu eksekusi 42ms/citra), pengembang microservice klasifikasi 12 kategori objek berbasis EfficientNetV2 (Macro F1 92.8%), serta eksplorasi Quantum Neural Network 8-Qubit Qiskit.",
    descEn:
      "First Author in JURIKTI journal (benchmarking SIFT vs AKAZE on NIST facial datasets at 42ms/frame), builder of a 12-class EfficientNetV2 computer vision microservice (92.8% Macro F1), and 8-Qubit Qiskit Quantum Neural Network researcher."
  }
];

const ECOSYSTEM_BRANDS = [
  {
    id: "smartinvest-ecosystem",
    name: "SmartInvest AI",
    roleId: "BiLSTM + Attention LQ45",
    roleEn: "BiLSTM + Attention LQ45",
    logo: "/assets/brands/smartinvest-logo.svg",
    liveUrl: "https://smartinvest-app-one.vercel.app/"
  },
  {
    id: "nusapolicy-copilot",
    name: "NusaPolicy v2.0",
    roleId: "Multi-Tenant Hybrid RAG",
    roleEn: "Multi-Tenant Hybrid RAG",
    logo: "/assets/brands/nusapolicy-logo.svg",
    liveUrl: "https://nusapolicy-copilot.vercel.app"
  },
  {
    id: "gprompt-workbench",
    name: "G-Prompt Studio",
    roleId: "Prompt & Eval Matrix",
    roleEn: "Prompt & Eval Matrix",
    logo: "/assets/brands/gprompt-logo.svg",
    liveUrl: "https://g-prompt.vercel.app"
  },
  {
    id: "waste-classifier",
    name: "EcoVision CV",
    roleId: "EfficientNetV2 Docker",
    roleEn: "EfficientNetV2 Docker",
    logo: "/assets/brands/ecovision-logo.svg",
    liveUrl: "https://github.com/User-Galih/waste-classifier"
  }
];

export const Hero = ({ setActiveSection, onViewDocument }) => {
  const { language } = useLanguage();
  const [activeLens, setActiveLens] = useState(FOCUS_PILLARS[0].id);

  const currentFocus = FOCUS_PILLARS.find((f) => f.id === activeLens) || FOCUS_PILLARS[0];

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
      {/* Main Editorial Asymmetric Grid (Calvin / Clyde / Amplify + Porsche Style) */}
      <div className="hero-editorial-grid">
        {/* LEFT COLUMN: Editorial Statement, Focus Lens Switcher & Primary Actions */}
        <div className="hero-left-content reveal-on-scroll is-visible">
          {/* Specialization Lens Switcher */}
          <div
            className="hero-lens-switcher"
            role="tablist"
            aria-label={language === "id" ? "Pilih fokus keahlian" : "Select engineering focus"}
          >
            {FOCUS_PILLARS.map((pillar) => {
              const isSelected = pillar.id === activeLens;
              return (
                <button
                  key={pillar.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={`hero-lens-pill ${isSelected ? "active" : ""}`}
                  onClick={() => {
                    playClickSound();
                    setActiveLens(pillar.id);
                  }}
                >
                  {language === "id" ? pillar.labelId : pillar.labelEn}
                </button>
              );
            })}
          </div>

          <h1 id="hero-heading" className="hero-title">
            {language === "id" ? currentFocus.headlineId : currentFocus.headlineEn}
          </h1>

          <p className="hero-bio">
            {language === "id" ? currentFocus.descId : currentFocus.descEn}
          </p>

          {/* Primary CTA Buttons */}
          <div className="hero-cta-group">
            <button
              type="button"
              className="primary-btn hero-primary-cta"
              onClick={() => handleScrollTo("projects")}
            >
              <Sparkles size={17} aria-hidden="true" />
              <span>
                {language === "id"
                  ? "Masuk ke Showroom 4 Sistem Flagship"
                  : "Enter 4-System Flagship Showroom"}
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

            <a
              href="https://github.com/User-Galih"
              target="_blank"
              rel="noreferrer"
              className="secondary-btn"
              onClick={playClickSound}
            >
              <GithubIcon size={16} />
              <span>github.com/User-Galih</span>
            </a>
          </div>

          {/* Interactive Live Product Brand Dock (With Custom SVG Logos) */}
          <div className="hero-brand-dock">
            <div className="hero-brand-dock-header">
              <span className="hero-brand-dock-label">
                {language === "id"
                  ? "Ekosistem Produk & Aplikasi Live (Klik untuk Buka):"
                  : "Live Deployed Ecosystem (Click to Launch):"}
              </span>
            </div>

            <div className="hero-brand-dock-grid">
              {ECOSYSTEM_BRANDS.map((brand) => (
                <a
                  key={brand.id}
                  href={brand.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hero-brand-tile"
                  onClick={playClickSound}
                >
                  <img
                    src={brand.logo}
                    alt={`Logo ${brand.name}`}
                    width="38"
                    height="38"
                    className="hero-brand-logo"
                  />
                  <div className="hero-brand-meta">
                    <span className="hero-brand-name">
                      {brand.name}
                      <ArrowUpRight size={13} className="hero-brand-arrow" aria-hidden="true" />
                    </span>
                    <span className="hero-brand-role">
                      {language === "id" ? brand.roleId : brand.roleEn}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Editorial Portrait Composition (Colorlib Calvin / Clyde / Amplify Style) */}
        <aside
          className="hero-editorial-stage reveal-on-scroll is-visible"
          aria-label="Galih Putra Pratama Editorial Portrait"
        >
          <div className="editorial-portrait-wrapper">
            {/* Geometric Accent Backdrop Block */}
            <div className="editorial-accent-backdrop" aria-hidden="true" />

            {/* Main High-Contrast Portrait Frame */}
            <div className="editorial-photo-frame">
              <img
                src="assets/images/foto_profil.jpeg"
                alt="Galih Putra Pratama, AI Engineer"
                width="420"
                height="480"
                fetchPriority="high"
                className="editorial-photo-img"
                onError={(e) => {
                  e.target.src = "https://avatars.githubusercontent.com/u/186676889?v=4";
                }}
              />

              {/* Bottom Editorial Identity Overlay */}
              <div className="editorial-photo-caption">
                <div className="editorial-caption-top">
                  <img
                    src="/assets/brands/gpp-monogram.svg"
                    alt=""
                    width="34"
                    height="34"
                    className="editorial-caption-monogram"
                  />
                  <div>
                    <h2 className="editorial-person-name">Galih Putra Pratama, S.Kom.</h2>
                    <p className="editorial-person-title">
                      {language === "id"
                        ? "AI Engineer & Associate Data Scientist Terlisensi BNSP"
                        : "AI Engineer & BNSP Licensed Associate Data Scientist"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Credential Pill 1: BNSP National License */}
            <button
              type="button"
              className="floating-credential-card credential-top-left"
              onClick={() => handleScrollTo("certifications")}
            >
              <span className="floating-cred-icon emerald">
                <ShieldCheck size={17} aria-hidden="true" />
              </span>
              <span className="floating-cred-text">
                <strong>BNSP Data Scientist</strong>
                <span>Lisensi Negara · MET.0001.000325</span>
              </span>
            </button>

            {/* Floating Credential Pill 2: First Author Journal DOI */}
            <button
              type="button"
              className="floating-credential-card credential-bottom-right"
              onClick={() => handleScrollTo("education")}
            >
              <span className="floating-cred-icon cobalt">
                <Award size={17} aria-hidden="true" />
              </span>
              <span className="floating-cred-text">
                <strong>First Author JURIKTI</strong>
                <span>S.Kom. Cumlaude (3.72 / 4.00)</span>
              </span>
            </button>
          </div>
        </aside>
      </div>

      {/* ==================================================================
          PORSCHE-STYLE PERFORMANCE SPECIFICATION STRIP
         ================================================================== */}
      <dl
        className="porsche-spec-strip reveal-on-scroll"
        aria-label={language === "id" ? "Spesifikasi performa sistem AI" : "AI system performance specifications"}
      >
        <div className="porsche-spec-cell">
          <dt className="porsche-spec-kicker">
            {language === "id" ? "01 / AKURASI BLIND TEST LQ45" : "01 / LQ45 BLIND TEST ACCURACY"}
          </dt>
          <dd className="porsche-spec-number">
            94.46<span className="porsche-spec-unit">%</span>
          </dd>
          <span className="porsche-spec-caption">
            BiLSTM + Multi-Head Attention · Macro F1 93.00%
          </span>
        </div>

        <div className="porsche-spec-cell">
          <dt className="porsche-spec-kicker">
            {language === "id" ? "02 / HYBRID RAG RETRIEVAL" : "02 / HYBRID RAG RETRIEVAL"}
          </dt>
          <dd className="porsche-spec-number">
            98.0<span className="porsche-spec-unit">%</span>
          </dd>
          <span className="porsche-spec-caption">
            Recall@5 (pgvector + FTS RRF) · 100% Safe Refusal
          </span>
        </div>

        <div className="porsche-spec-cell">
          <dt className="porsche-spec-kicker">
            {language === "id" ? "03 / COMPUTER VISION DOCKER" : "03 / DOCKERIZED VISION"}
          </dt>
          <dd className="porsche-spec-number">
            92.8<span className="porsche-spec-unit">%</span>
          </dd>
          <span className="porsche-spec-caption">
            EfficientNetV2B0 Macro F1 · 120ms CPU Latency
          </span>
        </div>

        <div className="porsche-spec-cell">
          <dt className="porsche-spec-kicker">
            {language === "id" ? "04 / AKADEMIK & LISENSI RESMI" : "04 / ACADEMIC & CREDENTIALS"}
          </dt>
          <dd className="porsche-spec-number">
            3.72<span className="porsche-spec-unit">/4.00</span>
          </dd>
          <span className="porsche-spec-caption">
            S.Kom. Cumlaude UDINUS · 18 Sertifikasi Terverifikasi
          </span>
        </div>
      </dl>
    </section>
  );
};

export default Hero;
