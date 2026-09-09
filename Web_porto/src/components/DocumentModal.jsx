import React, { useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { X, Download, FileText, ExternalLink } from "lucide-react";
import { playClickSound } from "../utils/audio";

export const DocumentModal = ({ fileUrl, onClose }) => {
  const { language } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  if (!fileUrl) return null;

  const isPdf = fileUrl.toLowerCase().endsWith(".pdf");
  const fileName = fileUrl.split("/").pop().replace(/%20/g, " ");

  return (
    <div className="doc-modal-backdrop" onClick={() => { playClickSound(); onClose(); }}>
      <div 
        className="doc-viewer-container glass-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="doc-viewer-header">
          <div className="doc-title-layout">
            <FileText size={18} style={{ color: "var(--accent-primary)" }} />
            <span style={{ fontWeight: "600", maxWidth: "450px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {fileName}
            </span>
          </div>

          <div className="doc-header-actions">
            <a
              href={fileUrl}
              target="_blank"
              rel="noreferrer"
              className="doc-header-btn"
              title="Open in new tab"
              onClick={playClickSound}
            >
              <ExternalLink size={15} />
            </a>

            <a 
              href={fileUrl} 
              download={fileName} 
              className="doc-header-btn"
              title="Download File"
              onClick={playClickSound}
            >
              <Download size={15} />
            </a>

            <button 
              className="doc-header-btn" 
              onClick={() => { playClickSound(); onClose(); }}
              title="Close Preview"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="doc-viewer-body">
          {isPdf ? (
            <iframe 
              src={fileUrl} 
              className="doc-iframe-viewer" 
              title={fileName}
              frameBorder="0"
            >
              <div style={{ padding: "40px", textAlign: "center", color: "var(--text-secondary)" }}>
                <p style={{ marginBottom: "16px" }}>
                  {language === "id"
                    ? "Browser Anda tidak mendukung preview iframe PDF secara langsung."
                    : "Your browser does not support inline PDF viewing."}
                </p>
                <a href={fileUrl} target="_blank" rel="noreferrer" className="primary-btn btn-sm">
                  {language === "id" ? "Buka File PDF" : "Open PDF Directly"}
                </a>
              </div>
            </iframe>
          ) : (
            <div className="doc-image-viewer-wrapper">
              <img 
                src={fileUrl} 
                alt={fileName} 
                className="doc-image-element"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentModal;
