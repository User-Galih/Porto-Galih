import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { playClickSound } from "../utils/audio";
import { GraduationCap, Award, FileText, BookOpen, ExternalLink } from "lucide-react";

export const Education = ({ onViewDocument }) => {
  const { language } = useLanguage();

  const uDinus = {
    institution_id: "Universitas Dian Nuswantoro (UDINUS)",
    institution_en: "Universitas Dian Nuswantoro (UDINUS)",
    degree_id: "Sarjana Komputer (S.Kom.) — Teknik Informatika",
    degree_en: "Bachelor of Computer Science (B.Comp.Sc.) — Informatics Engineering",
    period: "Agustus 2022 - 2026",
    gpa: "3.72 / 4.00",
    honors_id: "Lulus dengan Predikat Pujian (Cumlaude)",
    honors_en: "Graduated with Honors (Cumlaude)",
    thesis_id: "Klasifikasi Citra Sampah Organik dan Anorganik Berbasis Convolutional Neural Network (CNN)",
    thesis_en: "Organic and Inorganic Waste Image Classification Using Convolutional Neural Networks (CNN)"
  };

  const publication = {
    title_id: "Komparasi Algoritma Fitur Matching SIFT dan AKAZE untuk Pencocokan Fitur Wajah Berbasis Citra",
    title_en: "Comparison of SIFT and AKAZE Feature Matching Algorithms for Image-Based Facial Feature Matching",
    venue: "Jurnal Ilmu Komputer, Teknologi dan Informasi (JURIKTI)",
    meta: "Vol. 4 No. 1 (Jan 2026) • ISSN 2963-0169",
    doi: "10.62866/jurikti.v4i1.264",
    url: "https://doi.org/10.62866/jurikti.v4i1.264"
  };

  return (
    <section id="education" className="education-section container">
      <div className="section-header js-reveal">
        <div className="section-tag">
          <GraduationCap size={13} />
          <span>{language === "id" ? "Latar Belakang Akademik" : "Academic Background"}</span>
        </div>
        <h2 className="section-title">
          {language === "id" ? "Pendidikan & Riset Komputasi" : "Education & Academic Research"}
        </h2>
        <p className="section-subtitle">
          {language === "id"
            ? "Fondasi teoretis yang kuat dalam algoritma, matematika diskrit, machine learning, dan arsitektur sistem perangkat lunak."
            : "Strong theoretical foundations in algorithmic complexity, discrete mathematics, deep learning, and software architectures."}
        </p>
      </div>

      <div className="exp-grid">
        <div className="exp-card glass-card js-reveal">
          <div className="exp-card-header">
            <div>
              <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "8px" }}>
                <span className="edu-stat-badge">
                  <Award size={14} />
                  <span>IPK {uDinus.gpa}</span>
                </span>
                <span className="section-tag" style={{ margin: 0, padding: "4px 12px", fontSize: "0.75rem" }}>
                  {language === "id" ? uDinus.honors_id : uDinus.honors_en}
                </span>
              </div>

              <h3 className="exp-role-title">
                {language === "id" ? uDinus.degree_id : uDinus.degree_en}
              </h3>
              <p className="exp-company-name">
                {language === "id" ? uDinus.institution_id : uDinus.institution_en}
              </p>
            </div>

            <div className="exp-period-badge">
              <span>{uDinus.period}</span>
            </div>
          </div>

          <ul className="exp-bullets">
            <li>
              <strong>{language === "id" ? "Fokus Studi: " : "Specialization: "}</strong>
              {language === "id"
                ? "Kecerdasan Buatan (Artificial Intelligence), Deep Learning, Computer Vision, Algoritma & Struktur Data, serta Rekayasa Perangkat Lunak Terdistribusi."
                : "Artificial Intelligence, Deep Learning architectures, Computer Vision, Data Structures & Algorithms, and Distributed Systems."}
            </li>
            <li>
              <strong>{language === "id" ? "Riset Tugas Akhir: " : "Undergraduate Thesis: "}</strong>
              {language === "id" ? uDinus.thesis_id : uDinus.thesis_en}
            </li>
            <li>
              <strong>{language === "id" ? "Aktivitas Akademik: " : "Academic Activities: "}</strong>
              {language === "id"
                ? "Aktif dalam penelitian implementasi komputasi cerdas, eksplorasi komputasi kuantum (QNN), dan pengembangan solusi AI terapan."
                : "Active in intelligent computing research, quantum machine learning (QNN) exploration, and production AI application deployment."}
            </li>
          </ul>

          <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid var(--border-subtle)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
            <button
              className="primary-btn btn-sm"
              onClick={() => {
                playClickSound();
                if (onViewDocument) onViewDocument("assets/documents/Transkrip_Nilai.pdf");
              }}
            >
              <FileText size={15} />
              <span>{language === "id" ? "Lihat Transkrip Nilai Resmi (PDF)" : "View Official Transcript (PDF)"}</span>
            </button>

            <span style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
              Dian Nuswantoro University • Semarang, Indonesia
            </span>
          </div>
        </div>

        <div className="exp-card glass-card js-reveal">
          <div className="exp-card-header">
            <div>
              <span className="section-tag" style={{ margin: 0, padding: "4px 12px", fontSize: "0.75rem", marginBottom: "8px" }}>
                {language === "id" ? "Publikasi ilmiah" : "Peer-reviewed publication"}
              </span>
              <h3 className="exp-role-title">
                {language === "id" ? publication.title_id : publication.title_en}
              </h3>
              <p className="exp-company-name">{publication.venue}</p>
            </div>
            <div className="exp-period-badge">
              <BookOpen size={13} style={{ display: "inline", marginRight: "6px" }} />
              <span>Jan 2026</span>
            </div>
          </div>

          <ul className="exp-bullets">
            <li>
              <strong>{language === "id" ? "Peran: " : "Role: "}</strong>
              {language === "id" ? "Penulis pertama." : "First author."}
            </li>
            <li>{publication.meta}</li>
            <li>
              DOI:{" "}
              <a
                className="publication-link"
                href={publication.url}
                target="_blank"
                rel="noreferrer"
                onClick={playClickSound}
              >
                {publication.doi}
              </a>
            </li>
          </ul>

          <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid var(--border-subtle)" }}>
            <a
              className="primary-btn btn-sm"
              href={publication.url}
              target="_blank"
              rel="noreferrer"
              onClick={playClickSound}
            >
              <ExternalLink size={15} />
              <span>{language === "id" ? "Buka artikel (DOI)" : "Open paper (DOI)"}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
