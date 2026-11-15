import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { playClickSound } from "../utils/audio";
import { Award, BookOpen, ExternalLink, ShieldCheck } from "lucide-react";

export const Education = () => {
  const { language } = useLanguage();

  const uDinus = {
    institution_id: "Universitas Dian Nuswantoro (UDINUS)",
    institution_en: "Universitas Dian Nuswantoro (UDINUS)",
    degree_id: "Sarjana Komputer (S.Kom.) - Teknik Informatika",
    degree_en: "Bachelor of Computer Science (B.Comp.Sc.) - Informatics Engineering",
    period: "2022 - 2026",
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
    <section id="education" className="education-section container" aria-labelledby="education-heading">
      <div className="section-header reveal-on-scroll">
        <span className="section-kicker-tag">
          {language === "id"
            ? "FONDASI AKADEMIK & PUBLIKASI ILMIAH PEER-REVIEWED"
            : "ACADEMIC FOUNDATION & PEER-REVIEWED RESEARCH"}
        </span>
        <h2 id="education-heading" className="section-title">
          {language === "id"
            ? "Pendidikan Akademik & Publikasi Jurnal Ilmiah"
            : "Academic Education & Peer-Reviewed Publication"}
        </h2>
        <p className="section-subtitle">
          {language === "id"
            ? "Lulusan Teknik Informatika dengan predikat Cumlaude serta Penulis Pertama pada publikasi jurnal ilmiah nasional terindeks DOI."
            : "Informatics Engineering graduate with Cumlaude honors and First Author of a DOI-verified computer vision journal article."}
        </p>
      </div>

      <div className="edu-two-col-grid">
        <article className="exp-card surface-card reveal-on-scroll">
          <div className="exp-card-header">
            <div className="exp-identity-row">
              <img
                src="/assets/brands/ecovision-logo.svg"
                alt=""
                width="44"
                height="44"
                className="exp-brand-emblem"
              />
              <div>
                <div className="edu-badges-row">
                  <span className="edu-stat-badge">
                    <Award size={14} aria-hidden="true" />
                    <span>IPK {uDinus.gpa}</span>
                  </span>
                  <span className="category-tag">
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
            </div>

            <div className="exp-period-badge">
              <span>{uDinus.period}</span>
            </div>
          </div>

          <ul className="exp-bullets">
            <li>
              <strong>{language === "id" ? "Fokus Spesialisasi: " : "Specialization: "}</strong>
              {language === "id"
                ? "Kecerdasan Buatan (Artificial Intelligence), Arsitektur Deep Learning, Computer Vision, Struktur Data & Algoritma, serta Sistem Terdistribusi."
                : "Artificial Intelligence, Deep Learning Architectures, Computer Vision, Data Structures & Algorithms, and Distributed Systems."}
            </li>
            <li>
              <strong>{language === "id" ? "Skripsi / Tugas Akhir: " : "Undergraduate Thesis: "}</strong>
              {language === "id" ? uDinus.thesis_id : uDinus.thesis_en}
            </li>
            <li>
              <strong>{language === "id" ? "Eksplorasi Riset: " : "Research Explorations: "}</strong>
              {language === "id"
                ? "Penerapan Quantum Neural Networks (8-Qubit Qiskit), ekstraksi fitur citra SIFT vs AKAZE, serta deployment sistem RAG dan Deep Learning ke lingkungan produksi."
                : "Applied Quantum Neural Networks (8-Qubit Qiskit), SIFT vs AKAZE feature extraction benchmarking, and production RAG/Deep Learning deployment."}
            </li>
          </ul>

          <div className="edu-card-footer">
            <span className="edu-verified-note">
              <ShieldCheck size={15} style={{ color: "var(--accent-primary)" }} aria-hidden="true" />
              <span>
                {language === "id"
                  ? "Kredensial Akademik Terverifikasi • Semarang, Indonesia"
                  : "Verified Academic Record • Semarang, Indonesia"}
              </span>
            </span>
          </div>
        </article>

        <article className="exp-card surface-card reveal-on-scroll">
          <div className="exp-card-header">
            <div className="exp-identity-row">
              <img
                src="/assets/brands/quantum-nlp-logo.svg"
                alt=""
                width="44"
                height="44"
                className="exp-brand-emblem"
              />
              <div>
                <div className="edu-badges-row">
                  <span className="edu-stat-badge">
                    <BookOpen size={14} aria-hidden="true" />
                    <span>{language === "id" ? "Penulis Pertama (First Author)" : "First Author"}</span>
                  </span>
                  <span className="category-tag">ISSN 2963-0169</span>
                </div>

                <h3 className="exp-role-title">
                  {language === "id" ? publication.title_id : publication.title_en}
                </h3>
                <p className="exp-company-name">{publication.venue}</p>
              </div>
            </div>
            <div className="exp-period-badge">
              <span>Jan 2026</span>
            </div>
          </div>

          <ul className="exp-bullets">
            <li>
              <strong>{language === "id" ? "Kontribusi Riset: " : "Research Contribution: "}</strong>
              {language === "id"
                ? "Mengevaluasi secara kuantitatif ketahanan skala, rotasi, kepadatan keypoint, dan kecepatan komputasi antara algoritma SIFT (DoG) dan AKAZE (Fast Explicit Diffusion) pada NIST facial dataset."
                : "Quantitatively benchmarked scale/rotation invariance, keypoint density, and execution speed between SIFT (DoG) and AKAZE (Fast Explicit Diffusion) across the NIST facial dataset."}
            </li>
            <li>
              <strong>{language === "id" ? "Identitas Jurnal: " : "Publication Metadata: "}</strong>
              {publication.meta}
            </li>
            <li>
              <strong>DOI: </strong>
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

          <div className="edu-card-footer">
            <a
              className="primary-btn btn-sm"
              href={publication.url}
              target="_blank"
              rel="noreferrer"
              onClick={playClickSound}
            >
              <ExternalLink size={15} aria-hidden="true" />
              <span>{language === "id" ? "Verifikasi Publikasi Jurnal (DOI)" : "Verify Journal Publication (DOI)"}</span>
            </a>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Education;
