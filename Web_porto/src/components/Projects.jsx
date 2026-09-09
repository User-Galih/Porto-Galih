import React, { useState, useEffect, useMemo } from "react";
import { useLanguage } from "../context/LanguageContext";
import { playClickSound } from "../utils/audio";
import { ExternalLink, Sparkles, Info, TrendingUp, Bot } from "lucide-react";

const GithubIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export const Projects = ({ onSelectProject }) => {
  const { language } = useLanguage();
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    fetch("/data/projects.json")
      .then((res) => res.json())
      .then((data) => setProjects(data || []))
      .catch((err) => console.error("Error loading projects:", err));
  }, []);

  const categories = [
    { id: "all", labelId: "Semua Proyek", labelEn: "All Projects" },
    { id: "deep-learning", labelId: "Deep Learning & Time-Series", labelEn: "Deep Learning & Time-Series" },
    { id: "rag-llm", labelId: "RAG & LLM Agents", labelEn: "RAG & LLM Agents" },
    { id: "agent-ml", labelId: "Multi-Agent & ML", labelEn: "Multi-Agent & ML" },
    { id: "quantum-nlp", labelId: "Quantum & NLP", labelEn: "Quantum & NLP" }
  ];

  // Specific flagship projects in user-requested hierarchy:
  // 1. SmartInvest AI (Primary Flagship)
  // 2. NusaPolicy Copilot (Secondary Flagship)
  // 3. Waste Classifier AI
  // 4. SmartInvest Multi-Agent
  const smartInvest = useMemo(() => {
    return projects.find((p) => p.id === "smartinvest-ai");
  }, [projects]);

  const nusaPolicy = useMemo(() => {
    return projects.find((p) => p.id === "nusapolicy-copilot");
  }, [projects]);

  const wasteClassifier = useMemo(() => {
    return projects.find((p) => p.id === "waste-classifier");
  }, [projects]);

  const smartInvestAgent = useMemo(() => {
    return projects.find((p) => p.id === "smartinvest-agent-system");
  }, [projects]);

  // Filtered projects for the matrix grid, sorted by priority
  const filteredProjects = useMemo(() => {
    let list = [...projects];
    if (activeCategory !== "all") {
      list = list.filter((p) => p.category === activeCategory);
    }
    // Sort by priority (1 to 10)
    list.sort((a, b) => (a.priority || 99) - (b.priority || 99));
    return list;
  }, [projects, activeCategory]);

  return (
    <section id="projects" className="projects-section container">
      <div className="section-header js-reveal">
        <div className="section-tag">
          <Sparkles size={13} />
          <span>{language === "id" ? "Portofolio AI Engineer" : "AI Engineering Portfolio"}</span>
        </div>
        <h2 className="section-title">
          {language === "id" ? "Karya Unggulan & Sistem Produksi" : "Flagship Systems & Production Models"}
        </h2>
        <p className="section-subtitle">
          {language === "id"
            ? "Arsitektur AI end-to-end: Sistem Deep Learning time-series berkinerja tinggi, Enterprise RAG Copilot, Computer Vision produksi, dan ekosistem Multi-Agent otonom."
            : "End-to-end production AI: High-performance Deep Learning time-series modeling, Enterprise RAG Copilot, production Computer Vision, and autonomous Multi-Agent systems."}
        </p>
      </div>

      {/* ==================================================================
          1. UTAMA (PRIMARY FLAGSHIP): SmartInvest AI (Bento Hero Card)
         ================================================================== */}
      {smartInvest && (
        <div className="featured-showcase-section" style={{ marginBottom: "36px" }}>
          <div className="flagship-card glass-card js-reveal">
            <div className="flagship-header-row">
              <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
                <span className="flagship-badge">
                  <Sparkles size={14} />
                  <span>{language === "id" ? "⭐ Proyek Utama (Capstone Lead)" : "⭐ Flagship Project (Capstone Lead)"}</span>
                </span>
                <span className="category-tag cat-dl">Deep Learning • BiLSTM + Attention</span>
              </div>

              <span className="flagship-metric-badge" style={{ color: "var(--accent-primary)", borderColor: "var(--border-accent)" }}>
                Akurasi Blind Test: 94.46% • Macro F1: 93% • 15-Day Sequential Data
              </span>
            </div>

            <h3 className="flagship-title">
              {language === "id" ? smartInvest.title_id : smartInvest.title_en}
            </h3>

            <p className="flagship-subtitle">
              {language === "id" ? smartInvest.subtitle_id : smartInvest.subtitle_en}
            </p>

            <p className="flagship-description">
              {language === "id" ? smartInvest.description_id : smartInvest.description_en}
            </p>

            {/* Architecture Node Flow Visual for SmartInvest */}
            <div className="arch-flow-preview">
              <span className="arch-flow-title">Pipeline Architecture:</span>
              <span className="arch-step-node">Yahoo Finance Scraper (Header Spoofing)</span>
              <span className="arch-step-arrow">➔</span>
              <span className="arch-step-node">11 Technical Indicators Pipeline</span>
              <span className="arch-step-arrow">➔</span>
              <span className="arch-step-node is-accent">
                BiLSTM + Multi-Head Attention
              </span>
              <span className="arch-step-arrow">➔</span>
              <span className="arch-step-node">FastAPI Microservices</span>
              <span className="arch-step-arrow">➔</span>
              <span className="arch-step-node is-cyan">
                React 19 Real-Time Client
              </span>
            </div>

            {/* Tools chips */}
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "20px" }}>
              {Array.isArray(smartInvest.tools) &&
                smartInvest.tools.map((t) => (
                  <span key={t} className="skill-chip chip-primary">
                    {t}
                  </span>
                ))}
            </div>

            {/* Actions: Live Demo + GitHub Repo + Deep Dive */}
            <div className="flagship-actions-row">
              {smartInvest.demo_url && (
                <a
                  href={smartInvest.demo_url}
                  target="_blank"
                  rel="noreferrer"
                  className="primary-btn"
                  onClick={playClickSound}
                >
                  <span>{language === "id" ? "Buka Live App SmartInvest" : "Launch SmartInvest Live"}</span>
                  <ExternalLink size={16} />
                </a>
              )}

              {smartInvest.github_repo && (
                <a
                  href={"https://github.com/" + smartInvest.github_repo}
                  target="_blank"
                  rel="noreferrer"
                  className="secondary-btn"
                  onClick={playClickSound}
                >
                  <GithubIcon size={16} />
                  <span>GitHub: {smartInvest.github_repo}</span>
                </a>
              )}

              <button
                className="secondary-btn"
                onClick={() => {
                  playClickSound();
                  onSelectProject(smartInvest);
                }}
              >
                <Info size={16} />
                <span>{language === "id" ? "Detail Arsitektur Deep Learning" : "Architecture Deep Dive"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================
          2. KEDUA & KETIGA: NusaPolicy Copilot & Waste Classifier AI
         ================================================================== */}
      <div className="secondary-feature-grid" style={{ marginBottom: "50px" }}>
        {/* 2. NusaPolicy Copilot */}
        {nusaPolicy && (
          <div className="secondary-feature-card glass-card js-reveal" style={{ border: "1px solid var(--border-accent-cyan)" }}>
            <div>
              <div className="p-card-top-row">
                <span className="category-tag cat-rag">Enterprise RAG • #2 Flagship</span>
                <span className="p-card-metric" style={{ marginBottom: 0, color: "var(--accent-cyan)", borderColor: "var(--border-accent-cyan)" }}>
                  Recall@5: 98% • Safe Refusal
                </span>
              </div>

              <h3 className="p-card-title" style={{ fontSize: "1.45rem" }}>
                {language === "id" ? nusaPolicy.title_id : nusaPolicy.title_en}
              </h3>
              <p className="p-card-subtitle">
                {language === "id" ? nusaPolicy.subtitle_id : nusaPolicy.subtitle_en}
              </p>

              <p style={{ color: "var(--text-secondary)", fontSize: "0.93rem", lineHeight: "1.6", marginBottom: "18px" }}>
                {language === "id"
                  ? "Sistem RAG kebijakan internal end-to-end berbahasa Indonesia dengan Hybrid Retrieval (pgvector + PostgreSQL FTS via RRF), sitasi pasal terverifikasi, dan penolakan aman (safe refusal)."
                  : "Indonesian policy RAG copilot with Hybrid Retrieval (pgvector + FTS via RRF), grounded citations, and zero-hallucination safe refusal."}
              </p>

              <div className="p-card-tools">
                <span className="skill-chip chip-cyan">pgvector</span>
                <span className="skill-chip chip-cyan">Hybrid RRF</span>
                <span className="skill-chip">FastAPI</span>
                <span className="skill-chip">Next.js</span>
                <span className="skill-chip">9Router</span>
              </div>
            </div>

            <div className="p-card-actions">
              {nusaPolicy.demo_url && (
                <a
                  href={nusaPolicy.demo_url}
                  target="_blank"
                  rel="noreferrer"
                  className="card-action-btn btn-demo"
                  onClick={playClickSound}
                >
                  <ExternalLink size={14} />
                  <span>Live Demo</span>
                </a>
              )}

              {nusaPolicy.github_repo && (
                <a
                  href={"https://github.com/" + nusaPolicy.github_repo}
                  target="_blank"
                  rel="noreferrer"
                  className="card-action-btn btn-github"
                  onClick={playClickSound}
                >
                  <GithubIcon size={14} />
                  <span>Repo</span>
                </a>
              )}

              <button
                className="card-action-btn"
                onClick={() => {
                  playClickSound();
                  onSelectProject(nusaPolicy);
                }}
              >
                <Info size={14} />
                <span>{language === "id" ? "Detail RAG" : "Deep Dive"}</span>
              </button>
            </div>
          </div>
        )}

        {/* 3. Waste Classifier AI */}
        {wasteClassifier && (
          <div className="secondary-feature-card glass-card js-reveal">
            <div>
              <div className="p-card-top-row">
                <span className="category-tag cat-dl">Computer Vision CNN • #3 Flagship</span>
                <span className="p-card-metric" style={{ marginBottom: 0 }}>
                  Camera Inference & Docker
                </span>
              </div>

              <h3 className="p-card-title" style={{ fontSize: "1.45rem" }}>
                {language === "id" ? wasteClassifier.title_id : wasteClassifier.title_en}
              </h3>
              <p className="p-card-subtitle">
                {language === "id" ? wasteClassifier.subtitle_id : wasteClassifier.subtitle_en}
              </p>

              <p style={{ color: "var(--text-secondary)", fontSize: "0.93rem", lineHeight: "1.6", marginBottom: "18px" }}>
                {language === "id"
                  ? "Model CNN produksi untuk klasifikasi sampah organik dan anorganik dengan API FastAPI ter-containerisasi Docker dan antarmuka web interaktif."
                  : "Production CNN classifying organic vs inorganic waste with containerized FastAPI backend and responsive web client."}
              </p>

              <div className="p-card-tools">
                <span className="skill-chip chip-cyan">Convolutional NN</span>
                <span className="skill-chip chip-cyan">Keras</span>
                <span className="skill-chip">Docker</span>
                <span className="skill-chip">FastAPI</span>
                <span className="skill-chip">React</span>
              </div>
            </div>

            <div className="p-card-actions">
              {wasteClassifier.demo_url && (
                <a
                  href={wasteClassifier.demo_url}
                  target="_blank"
                  rel="noreferrer"
                  className="card-action-btn btn-demo"
                  onClick={playClickSound}
                >
                  <ExternalLink size={14} />
                  <span>Live App</span>
                </a>
              )}

              {wasteClassifier.github_repo && (
                <a
                  href={"https://github.com/" + wasteClassifier.github_repo}
                  target="_blank"
                  rel="noreferrer"
                  className="card-action-btn btn-github"
                  onClick={playClickSound}
                >
                  <GithubIcon size={14} />
                  <span>Repo</span>
                </a>
              )}

              <button
                className="card-action-btn"
                onClick={() => {
                  playClickSound();
                  onSelectProject(wasteClassifier);
                }}
              >
                <Info size={14} />
                <span>{language === "id" ? "Detail CNN" : "Deep Dive"}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ==================================================================
          3. ALL PROJECTS & REPOSITORIES MATRIX WITH FILTER TABS
         ================================================================== */}
      <div className="subsection-header js-reveal">
        <div className="section-tag">
          <Bot size={13} />
          <span>{language === "id" ? "Katalog repositori" : "Repository catalog"}</span>
        </div>
        <h3 className="subsection-title">
          {language === "id" ? "Katalog Repositori & Proyek AI" : "AI Projects & Repository Catalog"}
        </h3>
        <p className="section-subtitle">
          {language === "id"
            ? `Menampilkan ${filteredProjects.length} proyek dari akun GitHub User-Galih`
            : `Displaying ${filteredProjects.length} projects from GitHub account User-Galih`}
        </p>
      </div>

        {/* Category Filter Pills */}
        <div className="project-filter-bar js-reveal">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`filter-pill ${activeCategory === cat.id ? "active" : ""}`}
              onClick={() => {
                playClickSound();
                setActiveCategory(cat.id);
              }}
            >
              {language === "id" ? cat.labelId : cat.labelEn}
            </button>
          ))}
        </div>

        {/* Grid of Projects */}
        <div className="projects-matrix-grid">
          {filteredProjects.map((project, idx) => {
            const isTopRanked = project.priority && project.priority <= 4;
            const categoryClass =
              project.category === "rag-llm"
                ? "cat-rag"
                : project.category === "deep-learning"
                ? "cat-dl"
                : project.category === "quantum-nlp"
                ? "cat-quantum"
                : "";

            return (
              <div key={project?.id || idx} className="project-card glass-card js-reveal">
                <div>
                  <div className="p-card-top-row">
                    <span className={`category-tag ${categoryClass}`}>
                      {project.category || "AI Project"}
                    </span>
                    {isTopRanked && (
                      <span style={{ fontSize: "0.75rem", color: "var(--accent-primary)", display: "flex", alignItems: "center", gap: "4px", fontFamily: "var(--font-mono)", fontWeight: "700" }}>
                        <Sparkles size={12} />
                        TOP #{project.priority}
                      </span>
                    )}
                  </div>

                  <h4 className="p-card-title">
                    {language === "id" ? project.title_id : project.title_en}
                  </h4>

                  <p className="p-card-subtitle">
                    {language === "id" ? project.subtitle_id : project.subtitle_en}
                  </p>

                  {project.highlight_metric && (
                    <div className="p-card-metric">
                      {project.highlight_metric}
                    </div>
                  )}

                  <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: "1.6", marginBottom: "16px" }}>
                    {((language === "id" ? project.description_id : project.description_en) || "").slice(0, 160)}
                    {((language === "id" ? project.description_id : project.description_en) || "").length > 160 ? "..." : ""}
                  </p>

                  <div className="p-card-tools">
                    {Array.isArray(project.tools) &&
                      project.tools.slice(0, 5).map((tool) => (
                        <span key={tool} className="skill-chip">
                          {tool}
                        </span>
                      ))}
                    {Array.isArray(project.tools) && project.tools.length > 5 && (
                      <span className="skill-chip" style={{ opacity: 0.7 }}>
                        +{project.tools.length - 5}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-card-actions">
                  {project.github_repo && (
                    <a
                      href={"https://github.com/" + project.github_repo}
                      target="_blank"
                      rel="noreferrer"
                      className="card-action-btn btn-github"
                      onClick={playClickSound}
                      title={`View https://github.com/${project.github_repo}`}
                    >
                      <GithubIcon size={14} />
                      <span>Repo</span>
                    </a>
                  )}

                  {project.demo_url && (
                    <a
                      href={project.demo_url}
                      target="_blank"
                      rel="noreferrer"
                      className="card-action-btn btn-demo"
                      onClick={playClickSound}
                    >
                      <ExternalLink size={14} />
                      <span>Live App</span>
                    </a>
                  )}

                  <button
                    className="card-action-btn"
                    onClick={() => {
                      playClickSound();
                      onSelectProject(project);
                    }}
                  >
                    <Info size={14} />
                    <span>{language === "id" ? "Detail" : "Deep Dive"}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
    </section>
  );
};

export default Projects;
