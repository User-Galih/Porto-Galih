import React, { useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { X, ExternalLink, MonitorPlay, FileText, Cpu, CheckCircle2 } from "lucide-react";
import { playClickSound } from "../utils/audio";

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export const ProjectDetailModal = ({ project, onClose, onViewDocument }) => {
  const { language } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  if (!project) return null;

  const bp = project.blueprint || null;
  const laymanProofs = bp
    ? (language === "id" ? bp.layman_proof_id : bp.layman_proof_en) || []
    : [];
  const evalMetrics = bp && Array.isArray(bp.eval_metrics) ? bp.eval_metrics : [];

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      onClick={() => {
        playClickSound();
        onClose();
      }}
    >
      <div className="modal-content-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-row">
          <div>
            <div className="modal-meta-badges">
              <span className="category-tag">{project.category || "AI Engineering"}</span>
              {project.highlight_metric && (
                <span className="flagship-metric-pill">{project.highlight_metric}</span>
              )}
            </div>

            <h2 id="modal-project-title" className="modal-title-heading">
              {language === "id" ? project.title_id : project.title_en}
            </h2>

            <p className="modal-subtitle-lead">
              {language === "id" ? project.subtitle_id : project.subtitle_en}
            </p>
          </div>

          <button
            type="button"
            className="modal-close-btn"
            onClick={() => {
              playClickSound();
              onClose();
            }}
            aria-label={language === "id" ? "Tutup modal spesifikasi" : "Close specification modal"}
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {/* Action Buttons: Repo, Demo, Video, PDF Docs */}
        <div className="modal-actions-bar">
          {project.github_repo && (
            <a
              href={"https://github.com/" + project.github_repo}
              target="_blank"
              rel="noreferrer"
              className="primary-btn btn-sm"
              onClick={playClickSound}
            >
              <GithubIcon size={16} />
              <span>{language === "id" ? "Buka Repositori GitHub" : "Open GitHub Repository"}</span>
            </a>
          )}

          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noreferrer"
              className="secondary-btn btn-sm"
              onClick={playClickSound}
            >
              <ExternalLink size={16} aria-hidden="true" />
              <span>{language === "id" ? "Buka Aplikasi Live" : "Launch Live Application"}</span>
            </a>
          )}

          {project.video_url && (
            <a
              href={project.video_url}
              target="_blank"
              rel="noreferrer"
              className="secondary-btn btn-sm"
              onClick={playClickSound}
            >
              <MonitorPlay size={16} aria-hidden="true" />
              <span>{language === "id" ? "Tonton Video Demo" : "Watch Demo Video"}</span>
            </a>
          )}

          {project.presentation_url && onViewDocument && (
            <button
              type="button"
              className="secondary-btn btn-sm"
              onClick={() => {
                playClickSound();
                onViewDocument(project.presentation_url);
              }}
            >
              <FileText size={16} aria-hidden="true" />
              <span>{language === "id" ? "Slide Presentasi (PDF)" : "Presentation Deck (PDF)"}</span>
            </button>
          )}

          {project.guide_url && onViewDocument && (
            <button
              type="button"
              className="secondary-btn btn-sm"
              onClick={() => {
                playClickSound();
                onViewDocument(project.guide_url);
              }}
            >
              <FileText size={16} aria-hidden="true" />
              <span>{language === "id" ? "Buku Panduan (PDF)" : "User Guide (PDF)"}</span>
            </button>
          )}
        </div>

        {/* Executive Overview */}
        <div className="modal-section-block">
          <h3 className="modal-section-title">
            {language === "id" ? "Ringkasan Sistem" : "System Overview"}
          </h3>
          <p className="modal-body-text">
            {language === "id" ? project.description_id : project.description_en}
          </p>
        </div>

        {/* 5-Pillar Blueprint Summary (if available) */}
        {bp && (
          <div className="modal-section-block">
            <h3 className="modal-section-title">
              {language === "id"
                ? "Spesifikasi 5 Pilar AI Engineering"
                : "5-Pillar AI Engineering Blueprint"}
            </h3>
            <div className="pillars-three-grid" style={{ marginBottom: "18px" }}>
              <div className="pillar-box">
                <span className="pillar-label">
                  {language === "id" ? "1. Fungsi Teknis" : "1. Technical Function"}
                </span>
                <p className="pillar-body">
                  {language === "id" ? bp.function_id : bp.function_en}
                </p>
              </div>
              <div className="pillar-box">
                <span className="pillar-label">
                  {language === "id" ? "2. Kegunaan Bisnis" : "2. Business Utility"}
                </span>
                <p className="pillar-body">
                  {language === "id" ? bp.utility_id : bp.utility_en}
                </p>
              </div>
              <div className="pillar-box">
                <span className="pillar-label">
                  {language === "id" ? "3. Target Pengguna" : "3. Target Audience"}
                </span>
                <p className="pillar-body">
                  {language === "id" ? bp.target_id : bp.target_en}
                </p>
              </div>
            </div>

            {laymanProofs.length > 0 && (
              <div className="layman-proof-banner" style={{ marginBottom: "18px" }}>
                <h4 className="layman-proof-heading">
                  {language === "id"
                    ? "4. Indikator Sukses Orang Awam (Verifikasi 10 Detik)"
                    : "4. Layman Proof of Success (10-Second Verification)"}
                </h4>
                <ul className="layman-proof-list">
                  {laymanProofs.map((item, idx) => (
                    <li key={idx}>
                      <CheckCircle2 size={16} className="proof-check-icon" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {evalMetrics.length > 0 && (
              <div className="eval-table-wrapper">
                <table className="eval-benchmark-table">
                  <thead>
                    <tr>
                      <th scope="col">{language === "id" ? "Komponen" : "Component"}</th>
                      <th scope="col">{language === "id" ? "Baseline" : "Baseline"}</th>
                      <th scope="col">{language === "id" ? "Arsitektur Produksi" : "Production Architecture"}</th>
                      <th scope="col">{language === "id" ? "Bukti Evaluasi" : "Evaluation Evidence"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {evalMetrics.map((row, rIdx) => (
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
            )}
          </div>
        )}

        {/* Architecture & Engineering Details */}
        <div className="modal-section-block">
          <h3 className="modal-section-title">
            <Cpu size={18} style={{ color: "var(--accent-primary)" }} aria-hidden="true" />
            <span>
              {language === "id"
                ? "Detail Arsitektur & Pipeline Teknis"
                : "Architectural Pipeline & Model Specifications"}
            </span>
          </h3>

          <div
            className="modal-arch-html"
            dangerouslySetInnerHTML={{
              __html: language === "id" ? project.architecture_id : project.architecture_en
            }}
          />
        </div>

        {/* Evaluation Images (Confusion Matrices) */}
        {Array.isArray(project.evaluation_images) && project.evaluation_images.length > 0 && (
          <div className="modal-section-block">
            <h3 className="modal-section-title">
              {language === "id"
                ? "Bukti Visual Evaluasi Model (Confusion Matrix)"
                : "Visual Model Evaluation Evidence (Confusion Matrices)"}
            </h3>

            <div className="eval-images-grid">
              {project.evaluation_images.map((img, i) => (
                <div key={i} className="surface-card eval-image-card">
                  <img
                    src={img.url}
                    alt={language === "id" ? img.title_id : img.title_en}
                    width="520"
                    height="380"
                    loading="lazy"
                    className="eval-matrix-img"
                  />
                  <p className="eval-img-title">
                    {language === "id" ? img.title_id : img.title_en}
                  </p>
                  <p className="eval-img-desc">
                    {language === "id" ? img.description_id : img.description_en}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech Stack Chips */}
        <div>
          <h3 className="modal-stack-heading">
            {language === "id" ? "Teknologi & Pustaka" : "Technologies & Libraries"}
          </h3>
          <div className="flagship-tools-list">
            {Array.isArray(project.tools) &&
              project.tools.map((tool) => (
                <span key={tool} className="skill-chip chip-primary">
                  {tool}
                </span>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailModal;
