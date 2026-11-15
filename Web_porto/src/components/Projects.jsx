import React, { useState, useEffect, useMemo } from "react";
import { useLanguage } from "../context/LanguageContext";
import { playClickSound } from "../utils/audio";
import {
  ExternalLink,
  Info,
  CheckCircle2,
  Layers,
  Activity,
  Users,
  Cpu,
  FolderGit2,
  AlertCircle,
  RefreshCw,
  FileText
} from "lucide-react";

const GithubIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export const Projects = ({ onSelectProject }) => {
  const { language } = useLanguage();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [flagshipTabMap, setFlagshipTabMap] = useState({});

  const loadProjects = () => {
    setLoading(true);
    setError(null);
    fetch("/data/projects.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setProjects(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading projects:", err);
        setError(err.message || "Failed to load project specifications.");
        setLoading(false);
      });
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const categories = [
    { id: "all", labelId: "Semua Dokumentasi & Repo", labelEn: "All Docs & Repositories" },
    { id: "deep-learning", labelId: "Deep Learning & Vision", labelEn: "Deep Learning & Vision" },
    { id: "rag-llm", labelId: "Enterprise RAG & LLMOps", labelEn: "Enterprise RAG & LLMOps" },
    { id: "agent-ml", labelId: "Multi-Agent & Quantitative ML", labelEn: "Multi-Agent & Quant ML" },
    { id: "quantum-nlp", labelId: "Quantum Computing & NLP", labelEn: "Quantum & NLP" }
  ];

  const flagshipProjects = useMemo(() => {
    return projects
      .filter((p) => p.featured && p.blueprint)
      .sort((a, b) => (a.priority || 99) - (b.priority || 99));
  }, [projects]);

  const filteredCatalog = useMemo(() => {
    let list = [...projects];
    if (activeCategory !== "all") {
      list = list.filter((p) => p.category === activeCategory);
    }
    list.sort((a, b) => (a.priority || 99) - (b.priority || 99));
    return list;
  }, [projects, activeCategory]);

  const getActiveTab = (projectId) => flagshipTabMap[projectId] || "layman";
  const setFlagshipTab = (projectId, tab) => {
    playClickSound();
    setFlagshipTabMap((prev) => ({ ...prev, [projectId]: tab }));
  };

  const handleOpenSubmodule = (submoduleId) => {
    playClickSound();
    const target = projects.find((p) => p.id === submoduleId);
    if (target && onSelectProject) {
      onSelectProject(target);
    }
  };

  return (
    <section id="projects" className="projects-section container" aria-labelledby="projects-heading">
      <div className="section-header">
        <h2 id="projects-heading" className="section-title">
          {language === "id"
            ? "Sistem Produksi Flagship (Standar 5 Pilar AI Engineering)"
            : "Flagship Production Systems (5-Pillar AI Engineering Standard)"}
        </h2>
        <p className="section-subtitle">
          {language === "id"
            ? "Setiap sistem dirancang dengan 5 pilar rekayasa: Fungsi Teknis, Kegunaan Bisnis, Target Pengguna, Bukti Keberhasilan Orang Awam (10 detik), dan Matriks Evaluasi Terukur."
            : "Every flagship system is documented across 5 engineering pillars: Technical Function, Business Utility, Target Persona, 10-Second Layman Proof, and Deterministic Evaluation Metrics."}
        </p>
      </div>

      {/* Loading State (R-27) */}
      {loading && (
        <div className="state-box surface-card" role="status" aria-live="polite">
          <div className="skeleton-line title-skel" />
          <div className="skeleton-line body-skel" />
          <p className="state-text">
            {language === "id"
              ? "Memuat spesifikasi arsitektur dan matriks evaluasi proyek..."
              : "Loading architectural specifications and evaluation matrices..."}
          </p>
        </div>
      )}

      {/* Error State (R-27) */}
      {!loading && error && (
        <div className="state-box surface-card error-state" role="alert">
          <AlertCircle size={24} className="error-icon" aria-hidden="true" />
          <div>
            <h3 className="state-title">
              {language === "id" ? "Gagal memuat data proyek" : "Could not load project specifications"}
            </h3>
            <p className="state-text">
              {language === "id"
                ? `Terjadi kendala saat mengambil /data/projects.json (${error}). Silakan muat ulang data.`
                : `An error occurred while fetching /data/projects.json (${error}). Please retry.`}
            </p>
          </div>
          <button type="button" className="secondary-btn btn-sm" onClick={loadProjects}>
            <RefreshCw size={15} aria-hidden="true" />
            <span>{language === "id" ? "Coba Lagi" : "Retry"}</span>
          </button>
        </div>
      )}

      {/* Empty State (R-27) */}
      {!loading && !error && projects.length === 0 && (
        <div className="state-box surface-card">
          <p className="state-text">
            {language === "id"
              ? "Belum ada data proyek yang terdaftar di katalog."
              : "No project entries found in the catalog."}
          </p>
        </div>
      )}

      {/* ==================================================================
          1. 4 FLAGSHIP PRODUCTION SYSTEMS (5-PILLAR WORKBENCH)
         ================================================================== */}
      {!loading && !error && flagshipProjects.length > 0 && (
        <div className="flagship-stack">
          {flagshipProjects.map((proj, index) => {
            const activeTab = getActiveTab(proj.id);
            const bp = proj.blueprint || {};
            const laymanList = (language === "id" ? bp.layman_proof_id : bp.layman_proof_en) || [];
            const evalRows = Array.isArray(bp.eval_metrics) ? bp.eval_metrics : [];
            const submodules = Array.isArray(bp.submodules) ? bp.submodules : [];

            return (
              <article key={proj.id} className="flagship-case-card surface-card">
                <div className="flagship-top-bar">
                  <div className="flagship-rank-group">
                    <span className="flagship-index-badge">FLAGSHIP 0{index + 1}</span>
                    <span className="flagship-category-label">{proj.category}</span>
                  </div>
                  <span className="flagship-metric-pill">{proj.highlight_metric}</span>
                </div>

                <div className="flagship-head-block">
                  <div>
                    <h3 className="flagship-title">
                      {language === "id" ? proj.title_id : proj.title_en}
                    </h3>
                    <p className="flagship-subtitle">
                      {language === "id" ? proj.subtitle_id : proj.subtitle_en}
                    </p>
                  </div>

                  {/* Interactive Lens Switcher: Layman Proof vs Engineering Matrix */}
                  <div className="blueprint-lens-tabs" role="tablist" aria-label={language === "id" ? "Mode tampilan studi kasus" : "Case study view mode"}>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={activeTab === "layman"}
                      className={`lens-tab-btn ${activeTab === "layman" ? "active" : ""}`}
                      onClick={() => setFlagshipTab(proj.id, "layman")}
                    >
                      <Users size={15} aria-hidden="true" />
                      <span>
                        {language === "id"
                          ? "Fungsi, Bisnis & Bukti Awam"
                          : "Business & Layman Proof"}
                      </span>
                    </button>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={activeTab === "engineering"}
                      className={`lens-tab-btn ${activeTab === "engineering" ? "active" : ""}`}
                      onClick={() => setFlagshipTab(proj.id, "engineering")}
                    >
                      <Activity size={15} aria-hidden="true" />
                      <span>
                        {language === "id"
                          ? "Arsitektur & Matriks Evaluasi"
                          : "Architecture & Eval Matrix"}
                      </span>
                    </button>
                  </div>
                </div>

                {/* TAB 1: 5-PILLAR BUSINESS, TARGET & LAYMAN PROOF */}
                {activeTab === "layman" && (
                  <div className="blueprint-panel">
                    <div className="pillars-three-grid">
                      <div className="pillar-box">
                        <div className="pillar-header">
                          <Cpu size={15} className="pillar-icon" aria-hidden="true" />
                          <span className="pillar-label">
                            {language === "id" ? "1. Fungsi Sistem (Input -> Output)" : "1. System Function (Input -> Output)"}
                          </span>
                        </div>
                        <p className="pillar-body">
                          {language === "id" ? bp.function_id : bp.function_en}
                        </p>
                      </div>

                      <div className="pillar-box">
                        <div className="pillar-header">
                          <Layers size={15} className="pillar-icon" aria-hidden="true" />
                          <span className="pillar-label">
                            {language === "id" ? "2. Kegunaan & Dampak Nyata" : "2. Business Utility & Impact"}
                          </span>
                        </div>
                        <p className="pillar-body">
                          {language === "id" ? bp.utility_id : bp.utility_en}
                        </p>
                      </div>

                      <div className="pillar-box">
                        <div className="pillar-header">
                          <Users size={15} className="pillar-icon" aria-hidden="true" />
                          <span className="pillar-label">
                            {language === "id" ? "3. Target Pengguna" : "3. Target Audience"}
                          </span>
                        </div>
                        <p className="pillar-body">
                          {language === "id" ? bp.target_id : bp.target_en}
                        </p>
                      </div>
                    </div>

                    <div className="layman-proof-banner">
                      <h4 className="layman-proof-heading">
                        {language === "id"
                          ? "4. Indikator Sukses Orang Awam (Cara Verifikasi Keberhasilan dalam 10 Detik)"
                          : "4. Layman Proof of Success (How Non-Technical Users Verify Success in 10 Seconds)"}
                      </h4>
                      <ul className="layman-proof-list">
                        {laymanList.map((item, i) => (
                          <li key={i}>
                            <CheckCircle2 size={16} className="proof-check-icon" aria-hidden="true" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* TAB 2: ENGINEERING EVALUATION MATRIX & ABLATION */}
                {activeTab === "engineering" && (
                  <div className="blueprint-panel">
                    <h4 className="eval-table-heading">
                      {language === "id"
                        ? "5. Matriks Evaluasi Teknis & Studi Komparasi (Baseline vs Optimized)"
                        : "5. Engineering Evaluation Matrix & Ablation Benchmark"}
                    </h4>
                    <div className="eval-table-wrapper">
                      <table className="eval-benchmark-table">
                        <thead>
                          <tr>
                            <th scope="col">{language === "id" ? "Komponen / Metrik Uji" : "Evaluated Component / Metric"}</th>
                            <th scope="col">{language === "id" ? "Baseline Awal" : "Baseline Reference"}</th>
                            <th scope="col">{language === "id" ? "Arsitektur Produksi (Optimized)" : "Production Architecture (Optimized)"}</th>
                            <th scope="col">{language === "id" ? "Bukti & Validasi" : "Verification Evidence"}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {evalRows.map((row, rIdx) => (
                            <tr key={rIdx}>
                              <td className="eval-col-comp">{row.component}</td>
                              <td className="eval-col-base">{row.baseline}</td>
                              <td className="eval-col-opt">{row.optimized}</td>
                              <td className="eval-col-sec">{row.secondary}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Sub-modules Preserved Links (Specifically for Unified SmartInvest) */}
                {submodules.length > 0 && (
                  <div className="submodule-preserved-bar">
                    <div className="submodule-bar-label">
                      <FolderGit2 size={15} aria-hidden="true" />
                      <span>
                        {language === "id"
                          ? "Dokumentasi Terpisah per Divisi (Tetap Tersimpan Utuh):"
                          : "Separate Workstream Documentations (Preserved Individually):"}
                      </span>
                    </div>
                    <div className="submodule-buttons-row">
                      {submodules.map((sub) => (
                        <button
                          key={sub.id}
                          type="button"
                          className="submodule-chip-btn"
                          onClick={() => handleOpenSubmodule(sub.id)}
                        >
                          <FileText size={13} aria-hidden="true" />
                          <span>{language === "id" ? sub.label_id : sub.label_en}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech Stack & Action Row */}
                <div className="flagship-footer-row">
                  <div className="flagship-tools-list">
                    {Array.isArray(proj.tools) &&
                      proj.tools.map((t) => (
                        <span key={t} className="skill-chip">
                          {t}
                        </span>
                      ))}
                  </div>

                  <div className="flagship-actions-row">
                    {proj.demo_url && (
                      <a
                        href={proj.demo_url}
                        target="_blank"
                        rel="noreferrer"
                        className="primary-btn btn-sm"
                        onClick={playClickSound}
                      >
                        <span>{language === "id" ? "Buka Live App" : "Launch Live App"}</span>
                        <ExternalLink size={15} aria-hidden="true" />
                      </a>
                    )}

                    {proj.github_repo && (
                      <a
                        href={"https://github.com/" + proj.github_repo}
                        target="_blank"
                        rel="noreferrer"
                        className="secondary-btn btn-sm"
                        onClick={playClickSound}
                      >
                        <GithubIcon size={15} />
                        <span>{proj.github_repo}</span>
                      </a>
                    )}

                    <button
                      type="button"
                      className="secondary-btn btn-sm"
                      onClick={() => {
                        playClickSound();
                        onSelectProject(proj);
                      }}
                    >
                      <Info size={15} aria-hidden="true" />
                      <span>{language === "id" ? "Spesifikasi Lengkap & Diagram" : "Full Spec & Matrices"}</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* ==================================================================
          2. COMPLETE MODULAR DOCUMENTATION & RESEARCH ARCHIVE
         ================================================================== */}
      {!loading && !error && projects.length > 0 && (
        <div className="catalog-archive-block">
          <div className="subsection-header">
            <h3 className="subsection-title">
              {language === "id"
                ? "Katalog Lengkap Repositori, Sub-Modul & Eksplorasi Riset"
                : "Complete Repository, Sub-Module & Research Archive"}
            </h3>
            <p className="section-subtitle">
              {language === "id"
                ? `Menampilkan seluruh ${filteredCatalog.length} dokumentasi proyek dan sub-modul terpisah di GitHub User-Galih.`
                : `Browsing all ${filteredCatalog.length} individual project documentations and research repositories from User-Galih.`}
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="project-filter-bar" role="group" aria-label={language === "id" ? "Filter kategori proyek" : "Filter projects by category"}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`filter-pill ${activeCategory === cat.id ? "active" : ""}`}
                aria-pressed={activeCategory === cat.id}
                onClick={() => {
                  playClickSound();
                  setActiveCategory(cat.id);
                }}
              >
                {language === "id" ? cat.labelId : cat.labelEn}
              </button>
            ))}
          </div>

          <div className="projects-matrix-grid">
            {filteredCatalog.map((project, idx) => (
              <article key={project?.id || idx} className="project-card surface-card">
                <div>
                  <div className="p-card-top-row">
                    <span className="category-tag">{project.category || "AI Engineering"}</span>
                    {project.featured && (
                      <span className="featured-tag-mini">
                        FLAGSHIP #{project.priority}
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
                    <div className="p-card-metric">{project.highlight_metric}</div>
                  )}

                  <p className="p-card-desc">
                    {((language === "id" ? project.description_id : project.description_en) || "").slice(0, 165)}
                    {((language === "id" ? project.description_id : project.description_en) || "").length > 165 ? "..." : ""}
                  </p>

                  <div className="p-card-tools">
                    {Array.isArray(project.tools) &&
                      project.tools.slice(0, 5).map((tool) => (
                        <span key={tool} className="skill-chip">
                          {tool}
                        </span>
                      ))}
                    {Array.isArray(project.tools) && project.tools.length > 5 && (
                      <span className="skill-chip">+{project.tools.length - 5}</span>
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
                      <ExternalLink size={14} aria-hidden="true" />
                      <span>{project.demo_url.includes("doi.org") ? "DOI Paper" : "Live App"}</span>
                    </a>
                  )}

                  <button
                    type="button"
                    className="card-action-btn"
                    onClick={() => {
                      playClickSound();
                      onSelectProject(project);
                    }}
                  >
                    <Info size={14} aria-hidden="true" />
                    <span>{language === "id" ? "Buka Dokumentasi" : "Read Spec"}</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
