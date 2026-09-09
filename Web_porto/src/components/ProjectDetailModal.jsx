import React, { useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { X, ExternalLink, MonitorPlay, FileText, Cpu } from "lucide-react";
import { playClickSound } from "../utils/audio";

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

  return (
    <div className="modal-overlay" onClick={() => { playClickSound(); onClose(); }}>
      <div className="modal-content-panel" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="modal-header-row">
          <div>
            <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "8px" }}>
              <span className="section-tag" style={{ margin: 0, padding: "4px 12px", fontSize: "0.75rem" }}>
                {project.category || "AI Project"}
              </span>
              {project.highlight_metric && (
                <span className="p-card-metric" style={{ margin: 0, padding: "4px 10px", fontSize: "0.75rem" }}>
                  {project.highlight_metric}
                </span>
              )}
            </div>

            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: "800", color: "var(--text-main)", letterSpacing: "-0.02em" }}>
              {language === "id" ? project.title_id : project.title_en}
            </h2>

            <p style={{ fontSize: "1.05rem", color: "var(--accent-primary)", fontWeight: "500", marginTop: "4px" }}>
              {language === "id" ? project.subtitle_id : project.subtitle_en}
            </p>
          </div>

          <button
            className="modal-close-btn"
            onClick={() => { playClickSound(); onClose(); }}
            title="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Action Buttons: Repo, Demo, Video, PDF Docs */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "32px", paddingBottom: "24px", borderBottom: "1px solid var(--border-subtle)" }}>
          {project.github_repo && (
            <a
              href={"https://github.com/" + project.github_repo}
              target="_blank"
              rel="noreferrer"
              className="primary-btn btn-sm"
              onClick={playClickSound}
            >
              <GithubIcon size={16} />
              <span>{language === "id" ? "Lihat GitHub Repo" : "View GitHub Repo"}</span>
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
              <ExternalLink size={16} />
              <span>{language === "id" ? "Buka Live App" : "Launch Live App"}</span>
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
              <MonitorPlay size={16} />
              <span>{language === "id" ? "Tonton Video Demo" : "Watch Demo Video"}</span>
            </a>
          )}

          {project.presentation_url && onViewDocument && (
            <button
              className="secondary-btn btn-sm"
              onClick={() => {
                playClickSound();
                onViewDocument(project.presentation_url);
              }}
            >
              <FileText size={16} />
              <span>{language === "id" ? "Dokumen Presentasi (PPT)" : "Presentation Slide"}</span>
            </button>
          )}

          {project.guide_url && onViewDocument && (
            <button
              className="secondary-btn btn-sm"
              onClick={() => {
                playClickSound();
                onViewDocument(project.guide_url);
              }}
            >
              <FileText size={16} />
              <span>{language === "id" ? "Buku Panduan (User Guide)" : "User Guide"}</span>
            </button>
          )}
        </div>

        {/* Full Description */}
        <div style={{ marginBottom: "32px" }}>
          <h4 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "10px", color: "var(--text-main)" }}>
            {language === "id" ? "Ringkasan & Tujuan Proyek" : "Executive Overview"}
          </h4>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.7", fontSize: "1rem" }}>
            {language === "id" ? project.description_id : project.description_en}
          </p>
        </div>

        {/* Architecture & Engineering Details */}
        <div style={{ marginBottom: "32px" }}>
          <h4 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "16px", color: "var(--text-main)", display: "flex", alignItems: "center", gap: "8px" }}>
            <Cpu size={18} style={{ color: "var(--accent-primary)" }} />
            <span>{language === "id" ? "Arsitektur Sistem & Spesifikasi Model" : "System Architecture & Model Specs"}</span>
          </h4>

          <div
            style={{ lineHeight: "1.7", color: "var(--text-main)" }}
            dangerouslySetInnerHTML={{
              __html: language === "id" ? project.architecture_id : project.architecture_en
            }}
          />
        </div>

        {/* Evaluation Images (if available) */}
        {Array.isArray(project.evaluation_images) && project.evaluation_images.length > 0 && (
          <div style={{ marginBottom: "32px" }}>
            <h4 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "16px", color: "var(--text-main)" }}>
              {language === "id" ? "Evaluasi Model & Matriks Performa" : "Model Evaluation & Confusion Matrices"}
            </h4>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
              {project.evaluation_images.map((img, i) => (
                <div key={i} className="glass-card" style={{ padding: "16px", overflow: "hidden" }}>
                  <img
                    src={img.url}
                    alt={img.title_en || "Evaluation"}
                    style={{ width: "100%", borderRadius: "10px", marginBottom: "12px", border: "1px solid var(--border-subtle)" }}
                  />
                  <p style={{ fontWeight: "600", fontSize: "0.92rem", marginBottom: "4px" }}>
                    {language === "id" ? img.title_id : img.title_en}
                  </p>
                  <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                    {language === "id" ? img.description_id : img.description_en}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech Stack Chips */}
        <div>
          <h4 style={{ fontSize: "0.95rem", fontWeight: "700", marginBottom: "12px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            {language === "id" ? "Teknologi & Framework" : "Technologies & Frameworks"}
          </h4>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
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
