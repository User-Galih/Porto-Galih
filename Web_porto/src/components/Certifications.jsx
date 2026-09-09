import React, { useState, useEffect, useMemo } from "react";
import { useLanguage } from "../context/LanguageContext";
import { playClickSound } from "../utils/audio";
import { Award, ExternalLink, FileText, ShieldCheck } from "lucide-react";

export const Certifications = ({ onViewDocument }) => {
  const { language } = useLanguage();
  const [certs, setCerts] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    fetch("/data/certificates.json")
      .then((res) => res.json())
      .then((data) => setCerts(data || []))
      .catch((err) => console.error("Error loading certificates:", err));
  }, []);

  const filterTabs = [
    { id: "all", labelId: "Semua", labelEn: "All" },
    { id: "ai", labelId: "AI & Deep Learning", labelEn: "AI & Deep Learning" },
    { id: "data-cloud", labelId: "Data & Cloud", labelEn: "Data & Cloud" },
    { id: "security-tools", labelId: "Cybersecurity & Tools", labelEn: "Cybersecurity & Tools" }
  ];

  const filteredCerts = useMemo(() => {
    if (activeFilter === "all") return certs;

    return certs.filter((c) => {
      const id = c.id.toLowerCase();
      // filter check

      if (activeFilter === "ai") {
        return (
          id.includes("bnsp") ||
          id.includes("ai") ||
          id.includes("dl") ||
          id.includes("ml") ||
          id.includes("prompt")
        );
      }
      if (activeFilter === "data-cloud") {
        return (
          id.includes("ds") ||
          id.includes("sql") ||
          id.includes("aws") ||
          id.includes("cloud") ||
          id.includes("devops")
        );
      }
      if (activeFilter === "security-tools") {
        return (
          id.includes("cyber") ||
          id.includes("git") ||
          id.includes("python") ||
          id.includes("prog") ||
          id.includes("proj") ||
          id.includes("software")
        );
      }
      return true;
    });
  }, [certs, activeFilter]);

  return (
    <section id="certifications" className="certifications-section container">
      <div className="section-header js-reveal">
        <div className="section-tag">
          <Award size={13} />
          <span>{language === "id" ? "Kredensial Profesional" : "Professional Credentials"}</span>
        </div>
        <h2 className="section-title">
          {language === "id" ? "Sertifikasi & Lisensi Resmi" : "Certifications & Validated Skills"}
        </h2>
        <p className="section-subtitle">
          {language === "id"
            ? `Tervalidasi secara resmi oleh Badan Nasional Sertifikasi Profesi (BNSP), Dicoding Indonesia, IBM, dan Tata Group. Total ${certs.length} sertifikasi terverifikasi.`
            : `Officially certified by the National Professional Certification Board (BNSP), Dicoding Indonesia, IBM, and Tata Group. Total of ${certs.length} verified credentials.`}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="project-filter-bar" style={{ marginBottom: "28px" }}>
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            className={`filter-pill ${activeFilter === tab.id ? "active" : ""}`}
            onClick={() => {
              playClickSound();
              setActiveFilter(tab.id);
            }}
          >
            {language === "id" ? tab.labelId : tab.labelEn}
          </button>
        ))}
      </div>

      {/* Certs Grid */}
      <div className="certs-grid">
        {filteredCerts.map((cert) => {
          const isBNSP = cert.id.includes("bnsp");

          const toPublicPath = (url) => {
            if (!url) return null;
            return url.startsWith("/") ? url : `/${url}`;
          };
          const imageSrc = toPublicPath(cert.image_url);
          const previewSrc = toPublicPath(cert.preview_url || cert.file_url) || imageSrc;
          const verifyUrl = cert.verification_url && cert.verification_url.trim();

          return (
            <div
              key={cert.id}
              className="cert-card glass-card js-reveal"
              style={isBNSP ? { borderColor: "var(--accent-primary)" } : {}}
            >
              <button
                type="button"
                className="cert-thumb"
                onClick={() => {
                  playClickSound();
                  if (previewSrc && onViewDocument) onViewDocument(previewSrc);
                }}
                aria-label={language === "id" ? "Lihat PDF sertifikat" : "View certificate PDF"}
              >
                {imageSrc ? (
                  <img src={imageSrc} alt={language === "id" ? cert.title_id : cert.title_en} />
                ) : (
                  <div className="cert-thumb-fallback">
                    <Award size={28} />
                  </div>
                )}
              </button>

              <div className="cert-card-body">
                <div>
                  <div className="cert-issuer">
                    <span>{cert.issuer || "Dicoding Indonesia"}</span>
                    {isBNSP && (
                      <span style={{ color: "var(--accent-primary)", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                        <ShieldCheck size={14} />
                        <span>BNSP</span>
                      </span>
                    )}
                  </div>

                  <h3 className="cert-title">
                    {language === "id" ? cert.title_id || cert.title_en : cert.title_en}
                  </h3>
                </div>

                <div className="cert-card-bottom">
                  {previewSrc && (
                    <button
                      className="card-action-btn"
                      style={{ padding: "6px 12px", fontSize: "0.78rem" }}
                      onClick={() => {
                        playClickSound();
                        onViewDocument(previewSrc);
                      }}
                    >
                      <FileText size={13} />
                      <span>{language === "id" ? "Preview PDF" : "Preview PDF"}</span>
                    </button>
                  )}

                  {verifyUrl ? (
                    <a
                      href={verifyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="cert-view-action"
                      style={{ fontSize: "0.78rem" }}
                      onClick={playClickSound}
                      title="Open official credential page"
                    >
                      <span>{language === "id" ? "Verifikasi" : "Verify"}</span>
                      <ExternalLink size={12} />
                    </a>
                  ) : (
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                      {language === "id" ? "Tanpa tautan verifikasi" : "No public verify link"}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Certifications;
