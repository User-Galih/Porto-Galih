import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { Briefcase, Calendar } from "lucide-react";

export const Experience = () => {
  const { language } = useLanguage();

  const experiences = [
    {
      id: "dbs-coding-camp",
      company: "Coding Camp powered by DBS Foundation & Dicoding",
      role_id: "AI Engineer & Ketua Tim (Operasional)",
      role_en: "AI Engineer & Team Lead (Operations)",
      period_id: "Jan 2026 - Sekarang",
      period_en: "Jan 2026 - Present",
      meta: "AI Engineering Specialization",
      tools: ["TensorFlow", "FastAPI", "Keras", "yfinance", "React", "Docker", "Git/GitHub"],
      responsibilities_id: [
        "Ketua tim operasional capstone SmartInvest: pembagian tugas, manajemen timeline, dan koordinasi lintas divisi Data Science, AI Engineer, dan Fullstack.",
        "Mengusulkan dan mengimplementasikan yfinance sebagai sumber data real-time untuk konstituen LQ45 dan IDX30.",
        "Merancang model BiLSTM + Attention untuk klasifikasi tren IHSG, membangun microservice FastAPI, dan mengintegrasikannya ke aplikasi web React/Node.js."
      ],
      responsibilities_en: [
        "Led SmartInvest capstone operations across Data Science, AI Engineering, and Fullstack workstreams.",
        "Introduced yfinance as the live market data source for LQ45 and IDX30 constituents.",
        "Designed BiLSTM + Attention IHSG trend models, shipped FastAPI microservices, and integrated them into the React/Node.js product."
      ]
    },
    {
      id: "diskominfo-semarang",
      company: "Diskominfo Kota Semarang",
      role_id: "LLM App Developer & Ketua Tim (Magang)",
      role_en: "LLM App Developer & Team Lead (Internship)",
      period_id: "Mei 2025 - Jul 2025",
      period_en: "May 2025 - Jul 2025",
      meta: "Chatbot & Web Services",
      tools: ["Python", "JavaScript", "Google Gemini", "REST API", "MySQL", "Git"],
      responsibilities_id: [
        "Ketua tim developer sistem pendaftaran magang: koordinasi tugas, timeline, dan rilis.",
        "Membangun chatbot berbasis aturan terintegrasi Google Gemini API dengan basis pengetahuan dokumen kebijakan dan FAQ internal.",
        "Membangun platform web pendaftaran magang end-to-end (frontend–backend, REST API, basis data) serta pengujian performa di lingkungan publik."
      ],
      responsibilities_en: [
        "Led the internship-registration product team across tasking, timeline, and release.",
        "Built a rule-based chatbot integrated with Google Gemini API over internal policy and FAQ documents.",
        "Shipped the registration platform end-to-end (frontend, backend, REST API, database) and tested it in a public environment."
      ]
    },
    {
      id: "udinus-assistant",
      company: "Universitas Dian Nuswantoro",
      role_id: "Asisten Praktikum — Sistem Basis Data & Dasar Pemrograman",
      role_en: "Teaching Assistant — Database Systems & Programming Fundamentals",
      period_id: "Feb 2024 - Des 2024",
      period_en: "Feb 2024 - Dec 2024",
      meta: "Academic Teaching",
      tools: ["SQL", "Python", "Database Normalization", "Teaching"],
      responsibilities_id: [
        "Mendampingi 30 mahasiswa pada dua mata kuliah praktikum: Sistem Basis Data (query SQL, normalisasi) dan Dasar Pemrograman (logika dan struktur kode).",
        "Menyusun dan mengoreksi modul serta tugas praktikum sebagai bahan evaluasi pembelajaran."
      ],
      responsibilities_en: [
        "Mentored 30 students across Database Systems (SQL queries, normalization) and Programming Fundamentals (logic and code structure).",
        "Prepared and graded practicum modules and assignments used in course evaluation."
      ]
    }
  ];

  return (
    <section id="experience" className="experience-section container">
      <div className="section-header js-reveal">
        <div className="section-tag">
          <Briefcase size={13} />
          <span>{language === "id" ? "Rekam Jejak" : "Career Track"}</span>
        </div>
        <h2 className="section-title">
          {language === "id" ? "Pengalaman Rekayasa AI & Kepemimpinan" : "Engineering & Leadership Experience"}
        </h2>
        <p className="section-subtitle">
          {language === "id"
            ? "Pengalaman memimpin pengembangan sistem AI, koordinasi tim teknis, dan integrasi pipeline end-to-end."
            : "Demonstrated technical leadership, end-to-end AI pipeline architecture, and team coordination."}
        </p>
      </div>

      <div className="exp-grid">
        {experiences.map((exp) => (
          <div key={exp.id} className="exp-card glass-card js-reveal">
            <div className="exp-card-header">
              <div>
                <span className="section-tag" style={{ margin: 0, padding: "4px 12px", fontSize: "0.75rem", marginBottom: "8px" }}>
                  {exp.meta}
                </span>
                <h3 className="exp-role-title">
                  {language === "id" ? exp.role_id : exp.role_en}
                </h3>
                <p className="exp-company-name">{exp.company}</p>
              </div>

              <div className="exp-period-badge">
                <Calendar size={13} style={{ display: "inline", marginRight: "6px" }} />
                <span>{language === "id" ? exp.period_id : exp.period_en}</span>
              </div>
            </div>

            <ul className="exp-bullets">
              {(language === "id" ? exp.responsibilities_id : exp.responsibilities_en).map((resp, i) => (
                <li key={i}>{resp}</li>
              ))}
            </ul>

            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "16px", paddingTop: "16px", borderTop: "1px solid var(--border-subtle)" }}>
              {exp.tools.map((t) => (
                <span key={t} className="skill-chip">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
