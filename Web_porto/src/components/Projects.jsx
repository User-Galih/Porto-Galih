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
  FileText,
  Maximize2
} from "lucide-react";

const GithubIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

function getProjectBrandAssets(project) {
  const id = (project?.id || "").toLowerCase();
  if (id.includes("smartinvest") || id.includes("bengkod")) {
    return {
      logo: "/assets/brands/smartinvest-logo.svg",
      cover:
        project?.meet_photos?.[0] ||
        "/assets/projects/project_12_smartinvest_ecosystem/images/smartinvest_architecture.jpg",
      accentClass: "brand-accent-emerald",
      code: "SI-LQ45"
    };
  }
  if (id.includes("nusapolicy")) {
    return {
      logo: "/assets/brands/nusapolicy-logo.svg",
      cover:
        project?.meet_photos?.[0] ||
        "/assets/projects/project_6_nusapolicy_copilot/images/nusapolicy_hybrid_rag.jpg",
      accentClass: "brand-accent-cobalt",
      code: "NP-RAG"
    };
  }
  if (id.includes("gprompt") || id.includes("9router") || id.includes("gemini")) {
    return {
      logo: "/assets/brands/gprompt-logo.svg",
      cover:
        project?.meet_photos?.[0] ||
        "/assets/projects/project_10_gprompt/images/gprompt_studio_workbench.jpg",
      accentClass: "brand-accent-indigo",
      code: "GP-LLM"
    };
  }
  if (id.includes("waste") || id.includes("cnn")) {
    return {
      logo: "/assets/brands/ecovision-logo.svg",
      cover: "/assets/brands/ecovision-cover.svg",
      accentClass: "brand-accent-teal",
      code: "EV-CV12"
    };
  }
  return {
    logo: "/assets/brands/quantum-nlp-logo.svg",
    cover: "/assets/brands/ecovision-cover.svg",
    accentClass: "brand-accent-cyan",
    code: "RS-LAB"
  };
}

export const Projects = ({ onSelectProject, onViewDocument }) => {
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
    { id: "all", labelId: "Semua Dokumentasi & Repo (14)", labelEn: "All Docs & Repositories (14)" },
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

  const scrollToFlagshipCard = (id) => {
    playClickSound();
    const el = document.getElementById(`flagship-card-${id}`);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section id="projects" className="projects-section container" aria-labelledby="projects-heading">
      <div className="section-header reveal-on-scroll">
        <span className="section-kicker-tag">
          {language === "id"
            ? "SHOWROOM SISTEM PRODUKSI · STANDAR 5 PILAR AI ENGINEERING"
            : "PRODUCTION AI SHOWROOM · 5-PILLAR ENGINEERING STANDARD"}
        </span>
        <h2 id="projects-heading" className="section-title">
          {language === "id"
            ? "4 Sistem Produksi Flagship dengan Bukti Evaluasi Nyata"
            : "4 Flagship Production Systems with Verified Evaluation Benchmarks"}
        </h2>
        <p className="section-subtitle">
          {language === "id"
            ? "Setiap sistem dilengkapi identitas produk sendiri, arsitektur terukur, bukti keberhasilan 10 detik untuk orang awam, serta tabel komparasi baseline vs arsitektur produksi."
            : "Each flagship features its own brand identity, measurable architecture, 10-second layman verification checklist, and deterministic baseline-vs-production evaluation matrix."}
        </p>

        {/* Porsche-Style Model Selector Jump Bar */}
        {!loading && !error && flagshipProjects.length > 0 && (
          <div
            className="porsche-model-selector"
            role="navigation"
            aria-label={language === "id" ? "Navigasi cepat sistem flagship" : "Quick jump to flagship systems"}
          >
            {flagshipProjects.map((fp, idx) => {
              const brand = getProjectBrandAssets(fp);
              return (
                <button
                  key={fp.id}
                  type="button"
                  className="porsche-model-pill"
                  onClick={() => scrollToFlagshipCard(fp.id)}
                >
                  <img
                    src={brand.logo}
                    alt=""
                    width="26"
                    height="26"
                    className="porsche-model-pill-logo"
                  />
                  <span className="porsche-model-pill-idx">0{idx + 1}</span>
                  <span className="porsche-model-pill-name">
                    {(language === "id" ? fp.title_id : fp.title_en).split("(")[0].split("-")[0].trim()}
                  </span>
                </button>
              );
            })}
          </div>
        )}
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
          1. 4 FLAGSHIP PRODUCTION SYSTEMS (PORSCHE SPLIT-SCREEN SHOWROOM)
         ================================================================== */}
      {!loading && !error && flagshipProjects.length > 0 && (
        <div className="flagship-stack">
          {flagshipProjects.map((proj, index) => {
            const activeTab = getActiveTab(proj.id);
            const bp = proj.blueprint || {};
            const laymanList = (language === "id" ? bp.layman_proof_id : bp.layman_proof_en) || [];
            const evalRows = Array.isArray(bp.eval_metrics) ? bp.eval_metrics : [];
            const submodules = Array.isArray(bp.submodules) ? bp.submodules : [];
            const brand = getProjectBrandAssets(proj);
            const coverSrc = brand.cover.startsWith("/") ? brand.cover : `/${brand.cover}`;

            return (
              <article
                key={proj.id}
                id={`flagship-card-${proj.id}`}
                className={`flagship-showroom-card surface-card reveal-on-scroll ${brand.accentClass}`}
              >
                <div className="flagship-showroom-split">
                  {/* LEFT STICKY VISUAL SHOWCASE COLUMN */}
                  <div className="flagship-visual-col">
                    <div className="flagship-visual-sticky">
                      {/* Brand Header Row */}
                      <div className="flagship-brand-bar">
                        <div className="flagship-brand-identity">
                          <img
                            src={brand.logo}
                            alt={`Logo ${proj.title_en}`}
                            width="48"
                            height="48"
                            className="flagship-brand-svg"
                          />
                          <div>
                            <div className="flagship-rank-group">
                              <span className="flagship-index-badge">0{index + 1} / {brand.code}</span>
                              <span className="flagship-category-label">{proj.category}</span>
                            </div>
                            <h3 className="flagship-title">
                              {language === "id" ? proj.title_id : proj.title_en}
                            </h3>
                          </div>
                        </div>
                      </div>

                      <p className="flagship-subtitle">
                        {language === "id" ? proj.subtitle_id : proj.subtitle_en}
                      </p>

                      {/* Interactive Architectural / Workbench Visual Frame */}
                      <div className="flagship-preview-frame">
                        <button
                          type="button"
                          className="flagship-preview-trigger"
                          onClick={() => {
                            playClickSound();
                            if (onViewDocument) {
                              onViewDocument(coverSrc);
                            } else {
                              onSelectProject(proj);
                            }
                          }}
                          aria-label={
                            language === "id"
                              ? `Perbesar diagram arsitektur ${proj.title_id}`
                              : `Zoom architecture diagram for ${proj.title_en}`
                          }
                        >
                          <img
                            src={coverSrc}
                            alt={language === "id" ? proj.title_id : proj.title_en}
                            width="640"
                            height="360"
                            loading="lazy"
                            className="flagship-preview-img"
                          />
                          <span className="flagship-preview-zoom-pill">
                            <Maximize2 size={13} aria-hidden="true" />
                            <span>
                              {language === "id" ? "Perbesar Arsitektur" : "Inspect Diagram"}
                            </span>
                          </span>
                        </button>

                        <div className="flagship-telemetry-strip">
                          <span className="flagship-metric-pill">{proj.highlight_metric}</span>
                        </div>
                      </div>

                      {/* Primary Action Dock */}
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
                          <span>{language === "id" ? "Detail & Dokumen" : "Full Spec & Docs"}</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT 5-PILLAR ENGINEERING WORKBENCH COLUMN */}
                  <div className="flagship-specs-col">
                    <div className="flagship-specs-topbar">
                      <span className="flagship-specs-heading">
                        {language === "id"
                          ? "Spesifikasi 5 Pilar AI Engineering"
                          : "5-Pillar AI Engineering Specification"}
                      </span>

                      <div
                        className="blueprint-lens-tabs"
                        role="tablist"
                        aria-label={language === "id" ? "Mode tampilan studi kasus" : "Case study view mode"}
                      >
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
                              ? "Fungsi, Bisnis & Bukti 10 Detik"
                              : "Business & 10s Proof"}
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
                              ? "Matriks Evaluasi & Ablasi"
                              : "Evaluation & Ablation Matrix"}
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
                                {language === "id" ? "2. Kegunaan & Nilai Bisnis" : "2. Business Utility & Impact"}
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
                              ? "4. Indikator Sukses Orang Awam (Verifikasi Keberhasilan dalam 10 Detik)"
                              : "4. Layman Proof of Success (Verify System Success in 10 Seconds)"}
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
                            ? "5. Matriks Evaluasi Teknis & Studi Komparasi (Baseline vs Produksi)"
                            : "5. Engineering Evaluation Matrix & Ablation Benchmark"}
                        </h4>
                        <div className="eval-table-wrapper">
                          <table className="eval-benchmark-table">
                            <thead>
                              <tr>
                                <th scope="col">{language === "id" ? "Komponen / Metrik Uji" : "Evaluated Component / Metric"}</th>
                                <th scope="col">{language === "id" ? "Baseline Awal" : "Baseline Reference"}</th>
                                <th scope="col">{language === "id" ? "Arsitektur Produksi" : "Production Architecture"}</th>
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

                    {/* Tech Stack Chips */}
                    <div className="flagship-tools-footer">
                      {Array.isArray(proj.tools) &&
                        proj.tools.map((t) => (
                          <span key={t} className="skill-chip">
                            {t}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* ==================================================================
          2. COMPLETE MODULAR DOCUMENTATION & RESEARCH ARCHIVE (BENTO GRID)
         ================================================================== */}
      {!loading && !error && projects.length > 0 && (
        <div className="catalog-archive-block reveal-on-scroll">
          <div className="subsection-header">
            <span className="section-kicker-tag">
              {language === "id"
                ? "ARSIP LENGKAP REPOSITORI & SUB-MODUL RISET"
                : "COMPLETE REPOSITORY & RESEARCH ARCHIVE"}
            </span>
            <h3 className="subsection-title">
              {language === "id"
                ? "Eksplorasi Seluruh 14 Dokumentasi Proyek & Eksperimen"
                : "Explore All 14 Project Documentations & Research Experiments"}
            </h3>
            <p className="section-subtitle">
              {language === "id"
                ? "Setiap modul dan repositori tetap dipelihara secara mandiri agar Anda dapat memeriksa detail kode, notebook eksperimen, dan arsitektur per komponen."
                : "Every individual module and research repository is preserved so you can inspect source code, notebooks, and component-level architectures."}
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
            {filteredCatalog.map((project, idx) => {
              const brand = getProjectBrandAssets(project);
              return (
                <article
                  key={project?.id || idx}
                  className={`project-card surface-card reveal-on-scroll ${brand.accentClass}`}
                >
                  <div>
                    <div className="p-card-top-row">
                      <div className="p-card-brand-head">
                        <img
                          src={brand.logo}
                          alt=""
                          width="34"
                          height="34"
                          className="p-card-brand-logo"
                        />
                        <span className="category-tag">{project.category || "AI Engineering"}</span>
                      </div>
                      {project.featured && (
                        <span className="featured-tag-mini">
                          FLAGSHIP 0{project.priority}
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
                      {((language === "id" ? project.description_id : project.description_en) || "").slice(0, 155)}
                      {((language === "id" ? project.description_id : project.description_en) || "").length > 155 ? "..." : ""}
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
                      <span>{language === "id" ? "Buka Spesifikasi" : "Read Spec"}</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
