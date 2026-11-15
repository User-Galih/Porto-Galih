import React, { useState, useEffect, useMemo } from "react";
import { useLanguage } from "../context/LanguageContext";
import { playClickSound } from "../utils/audio";
import { Award, ExternalLink, FileText, ShieldCheck, ChevronDown, ChevronUp, AlertCircle, RefreshCw } from "lucide-react";

const TOP_CREDENTIAL_IDS = [
  "bnsp-data-scientist",
  "dicoding-dl-mahir",
  "dicoding-dl-fundamental",
  "dicoding-prompt-eng",
  "dicoding-aws-cloud",
  "forage-tata-cyber"
];

export const Certifications = ({ onViewDocument }) => {
  const { language } = useLanguage();
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("featured");
  const [showAllInFeatured, setShowAllInFeatured] = useState(false);

  const loadCertificates = () => {
    setLoading(true);
    setError(null);
    fetch("/data/certificates.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setCerts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading certificates:", err);
        setError(err.message || "Failed to load certificates.");
        setLoading(false);
      });
  };

  useEffect(() => {
    loadCertificates();
  }, []);

  const filterTabs = [
    { id: "featured", labelId: "6 Sertifikasi Utama (Pilihan)", labelEn: "Top 6 Core Credentials" },
    { id: "all", labelId: `Semua (${certs.length || 18})`, labelEn: `All (${certs.length || 18})` },
    { id: "ai", labelId: "AI & Deep Learning", labelEn: "AI & Deep Learning" },
    { id: "data-cloud", labelId: "Data, Cloud & DevOps", labelEn: "Data, Cloud & DevOps" },
    { id: "security-tools", labelId: "Cybersecurity & Software", labelEn: "Cybersecurity & Software" }
  ];

  const displayedCerts = useMemo(() => {
    if (activeFilter === "featured" && !showAllInFeatured) {
      const topList = TOP_CREDENTIAL_IDS.map((id) => certs.find((c) => c.id === id)).filter(Boolean);
      return topList.length > 0 ? topList : certs.slice(0, 6);
    }

    if (activeFilter === "all" || (activeFilter === "featured" && showAllInFeatured)) {
      return certs;
    }

    return certs.filter((c) => {
      const id = (c.id || "").toLowerCase();
      if (activeFilter === "ai") {
        return id.includes("bnsp") || id.includes("ai") || id.includes("dl") || id.includes("ml") || id.includes("prompt");
      }
      if (activeFilter === "data-cloud") {
        return id.includes("ds") || id.includes("sql") || id.includes("aws") || id.includes("cloud") || id.includes("devops");
      }
      if (activeFilter === "security-tools") {
        return id.includes("cyber") || id.includes("git") || id.includes("python") || id.includes("prog") || id.includes("proj") || id.includes("software");
      }
      return true;
    });
  }, [certs, activeFilter, showAllInFeatured]);

  return (
    <section id="certifications" className="certifications-section container" aria-labelledby="certs-heading">
      <div className="section-header">
        <h2 id="certs-heading" className="section-title">
          {language === "id"
            ? "Lisensi Profesi & Sertifikasi Teknis"
            : "Professional Licenses & Technical Certifications"}
        </h2>
        <p className="section-subtitle">
          {language === "id"
            ? "Menampilkan 6 kredensial utama yang paling relevan untuk peran AI Engineer (termasuk sertifikasi negara BNSP Associate Data Scientist), dengan akses penuh ke seluruh 18 sertifikat terverifikasi."
            : "Highlighting the 6 highest-signal credentials for AI Engineering roles (including the national BNSP Associate Data Scientist license), with full access to all 18 verified certificates."}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="project-filter-bar" role="group" aria-label={language === "id" ? "Filter sertifikasi" : "Filter certifications"}>
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`filter-pill ${activeFilter === tab.id ? "active" : ""}`}
            aria-pressed={activeFilter === tab.id}
            onClick={() => {
              playClickSound();
              setActiveFilter(tab.id);
              if (tab.id !== "featured") {
                setShowAllInFeatured(false);
              }
            }}
          >
            {language === "id" ? tab.labelId : tab.labelEn}
          </button>
        ))}
      </div>

      {/* Loading State (R-27) */}
      {loading && (
        <div className="state-box surface-card" role="status" aria-live="polite">
          <div className="skeleton-line title-skel" />
          <div className="skeleton-line body-skel" />
          <p className="state-text">
            {language === "id" ? "Memuat daftar sertifikasi resmi..." : "Loading verified credentials..."}
          </p>
        </div>
      )}

      {/* Error State (R-27) */}
      {!loading && error && (
        <div className="state-box surface-card error-state" role="alert">
          <AlertCircle size={24} className="error-icon" aria-hidden="true" />
          <div>
            <h3 className="state-title">
              {language === "id" ? "Gagal memuat sertifikasi" : "Could not load credentials"}
            </h3>
            <p className="state-text">{error}</p>
          </div>
          <button type="button" className="secondary-btn btn-sm" onClick={loadCertificates}>
            <RefreshCw size={15} aria-hidden="true" />
            <span>{language === "id" ? "Muat Ulang" : "Retry"}</span>
          </button>
        </div>
      )}

      {/* Empty State (R-27) */}
      {!loading && !error && displayedCerts.length === 0 && (
        <div className="state-box surface-card">
          <p className="state-text">
            {language === "id" ? "Tidak ada sertifikat pada kategori ini." : "No certificates found in this category."}
          </p>
        </div>
      )}

      {/* Certs Grid */}
      {!loading && !error && displayedCerts.length > 0 && (
        <>
          <div className="certs-grid">
            {displayedCerts.map((cert) => {
              const isBNSP = cert.id.includes("bnsp");
              const toPublicPath = (url) => {
                if (!url) return null;
                return url.startsWith("/") ? url : `/${url}`;
              };
              const imageSrc = toPublicPath(cert.image_url);
              const previewSrc = toPublicPath(cert.preview_url || cert.file_url) || imageSrc;
              const verifyUrl = cert.verification_url && cert.verification_url.trim();

              return (
                <article
                  key={cert.id}
                  className={`cert-card surface-card ${isBNSP ? "is-bnsp-highlight" : ""}`}
                >
                  <button
                    type="button"
                    className="cert-thumb"
                    onClick={() => {
                      playClickSound();
                      if (previewSrc && onViewDocument) onViewDocument(previewSrc);
                    }}
                    aria-label={
                      language === "id"
                        ? `Pratinjau dokumen sertifikat ${cert.title_id || cert.title_en}`
                        : `Preview certificate document ${cert.title_en}`
                    }
                  >
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt={language === "id" ? cert.title_id : cert.title_en}
                        width="360"
                        height="225"
                        loading="lazy"
                      />
                    ) : (
                      <div className="cert-thumb-fallback">
                        <Award size={28} aria-hidden="true" />
                        <span className="cert-credential-code">{cert.credential_id || "VERIFIED"}</span>
                      </div>
                    )}
                  </button>

                  <div className="cert-card-body">
                    <div>
                      <div className="cert-issuer">
                        <span>{cert.issuer || "Dicoding Indonesia"}</span>
                        {isBNSP && (
                          <span className="bnsp-pill">
                            <ShieldCheck size={13} aria-hidden="true" />
                            <span>BNSP RI</span>
                          </span>
                        )}
                      </div>

                      <h3 className="cert-title">
                        {language === "id" ? cert.title_id || cert.title_en : cert.title_en}
                      </h3>

                      {cert.description_id && (
                        <p className="cert-desc-short">
                          {language === "id" ? cert.description_id : cert.description_en}
                        </p>
                      )}
                    </div>

                    <div className="cert-card-bottom">
                      {previewSrc && (
                        <button
                          type="button"
                          className="card-action-btn"
                          onClick={() => {
                            playClickSound();
                            onViewDocument(previewSrc);
                          }}
                        >
                          <FileText size={13} aria-hidden="true" />
                          <span>{language === "id" ? "Buka Dokumen" : "View Document"}</span>
                        </button>
                      )}

                      {verifyUrl ? (
                        <a
                          href={verifyUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="cert-view-action"
                          onClick={playClickSound}
                        >
                          <span>{language === "id" ? "Cek Kredensial" : "Verify ID"}</span>
                          <ExternalLink size={12} aria-hidden="true" />
                        </a>
                      ) : (
                        <span className="cert-id-text">
                          ID: {cert.credential_id || "BNSP Verified"}
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {activeFilter === "featured" && certs.length > 6 && (
            <div className="certs-expand-row">
              <button
                type="button"
                className="secondary-btn"
                onClick={() => {
                  playClickSound();
                  setShowAllInFeatured((prev) => !prev);
                }}
              >
                {showAllInFeatured ? (
                  <>
                    <ChevronUp size={16} aria-hidden="true" />
                    <span>
                      {language === "id"
                        ? "Tampilkan 6 Sertifikasi Utama Saja"
                        : "Show Top 6 Core Credentials Only"}
                    </span>
                  </>
                ) : (
                  <>
                    <ChevronDown size={16} aria-hidden="true" />
                    <span>
                      {language === "id"
                        ? `Tampilkan Seluruh ${certs.length} Sertifikasi Terverifikasi`
                        : `Expand All ${certs.length} Verified Certifications`}
                    </span>
                  </>
                )}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Certifications;
