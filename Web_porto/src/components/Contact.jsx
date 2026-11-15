import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { Mail, Check, Copy } from "lucide-react";
import { playClickSound } from "../utils/audio";

const GithubIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" rx="1" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const Contact = () => {
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const emailAddress = "galihputra9191@gmail.com";

  const handleCopyEmail = () => {
    playClickSound();
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="contact-section container" aria-labelledby="contact-heading">
      <div className="contact-card-box surface-card">
        <h2 id="contact-heading" className="section-title" style={{ marginBottom: "14px" }}>
          {language === "id"
            ? "Diskusi Teknis & Peluang Rekayasa AI"
            : "Technical Collaboration & AI Engineering Roles"}
        </h2>

        <p className="contact-lead-text">
          {language === "id"
            ? "Terbuka untuk posisi penuh waktu (Full-Time AI / ML / LLM Engineer), kolaborasi riset Deep Learning, maupun pengembangan arsitektur RAG dan microservice perusahaan."
            : "Available for full-time AI / ML / LLM Engineering roles, Deep Learning research collaborations, and enterprise RAG microservice architecture."}
        </p>

        <div className="contact-channels-grid">
          <a
            href={`mailto:${emailAddress}`}
            className="contact-item-btn primary-btn"
            onClick={playClickSound}
          >
            <Mail size={18} aria-hidden="true" />
            <span>{language === "id" ? "Kirim Email ke Galih" : "Send Direct Email"}</span>
          </a>

          <button
            type="button"
            className="contact-item-btn secondary-btn"
            onClick={handleCopyEmail}
            aria-label={language === "id" ? "Salin alamat email" : "Copy email address"}
          >
            {copied ? (
              <Check size={18} style={{ color: "var(--accent-primary)" }} aria-hidden="true" />
            ) : (
              <Copy size={18} aria-hidden="true" />
            )}
            <span>{copied ? (language === "id" ? "Email Tersalin" : "Email Copied") : emailAddress}</span>
          </button>

          <a
            href="https://github.com/User-Galih"
            target="_blank"
            rel="noreferrer"
            className="contact-item-btn secondary-btn"
            onClick={playClickSound}
          >
            <GithubIcon size={18} />
            <span>github.com/User-Galih</span>
          </a>

          <a
            href="https://linkedin.com/in/galih-putra-pratama-8194bb255"
            target="_blank"
            rel="noreferrer"
            className="contact-item-btn secondary-btn"
            onClick={playClickSound}
          >
            <LinkedinIcon size={18} />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
