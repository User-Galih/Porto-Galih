import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { Calendar } from "lucide-react";

export const Experience = () => {
  const { language } = useLanguage();

  const experiences = [
    {
      id: "dbs-coding-camp",
      logo: "/assets/brands/smartinvest-logo.svg",
      company: "Coding Camp powered by DBS Foundation & Dicoding",
      role_id: "AI Engineer & Ketua Tim Operasional Capstone",
      role_en: "AI Engineer & Capstone Operations Team Lead",
      period_id: "Jan 2026 - Sekarang",
      period_en: "Jan 2026 - Present",
      meta: "AI Engineering Specialization",
      tools: ["TensorFlow", "FastAPI", "Keras", "yfinance", "React 19", "Docker", "Git/GitHub"],
      responsibilities_id: [
        "Memimpin operasional tim lintas divisi (Data Science, AI Engineering, dan Fullstack) pada proyek investasi cerdas SmartInvest mulai dari perancangan spesifikasi hingga rilis produksi.",
        "Menginisiasi dan mengintegrasikan pipeline akuisisi data pasar real-time menggunakan yfinance untuk konstituen saham LQ45 dan IDX30 beserta indikator makroekonomi.",
        "Merancang arsitektur Bidirectional LSTM + Multi-Head Attention untuk klasifikasi tren IHSG dan saham individu (akurasi blind test 94.46%), membungkusnya ke dalam microservice FastAPI, serta mengintegrasikannya dengan antarmuka React."
      ],
      responsibilities_en: [
        "Led cross-functional SmartInvest capstone operations across Data Science, AI Engineering, and Fullstack teams from specification to production release.",
        "Introduced and engineered the live market data ingestion pipeline using yfinance for LQ45 and IDX30 constituents alongside macroeconomic indicators.",
        "Architected Bidirectional LSTM + Multi-Head Attention models for IHSG and equity trend classification (94.46% blind test accuracy), deployed FastAPI microservices, and integrated them into the React platform."
      ]
    },
    {
      id: "diskominfo-semarang",
      logo: "/assets/brands/nusapolicy-logo.svg",
      company: "Dinas Komunikasi, Informatika, Statistik dan Persandian (Diskominfo) Kota Semarang",
      role_id: "LLM Application Developer & Ketua Tim (Magang)",
      role_en: "LLM Application Developer & Team Lead (Internship)",
      period_id: "Mei 2025 - Jul 2025",
      period_en: "May 2025 - Jul 2025",
      meta: "Government AI & Web Services",
      tools: ["Python", "JavaScript", "Google Gemini API", "REST API", "MySQL", "Git"],
      responsibilities_id: [
        "Memimpin tim pengembang sistem layanan pendaftaran magang terpadu: membagi tugas teknis, mengelola jadwal rilis, dan memimpin pengujian sistem.",
        "Membangun asisten tanya-jawab otomatis yang mengintegrasikan Google Gemini API di atas basis pengetahuan dokumen kebijakan dan FAQ resmi instansi.",
        "Merilis platform web pendaftaran magang end-to-end (frontend, backend REST API, dan basis data relasional MySQL) untuk melayani pendaftar publik."
      ],
      responsibilities_en: [
        "Led the internship registration platform engineering team across task allocation, milestone tracking, and public release.",
        "Built an automated policy assistant integrating Google Gemini API grounded over internal municipal regulations and FAQ documents.",
        "Delivered the end-to-end web registration platform (frontend, REST API backend, and MySQL database) tested in a live public environment."
      ]
    },
    {
      id: "udinus-assistant",
      logo: "/assets/brands/quantum-nlp-logo.svg",
      company: "Universitas Dian Nuswantoro (UDINUS)",
      role_id: "Asisten Praktikum: Sistem Basis Data & Dasar Pemrograman",
      role_en: "Teaching Assistant: Database Systems & Programming Fundamentals",
      period_id: "Feb 2024 - Des 2024",
      period_en: "Feb 2024 - Dec 2024",
      meta: "Academic Instruction",
      tools: ["SQL", "Python", "Database Normalization", "Algorithmic Logic"],
      responsibilities_id: [
        "Membimbing 30 mahasiswa pada praktikum Sistem Basis Data (perancangan skema relasional, normalisasi, query SQL kompleks) dan Dasar Pemrograman (algoritma dan struktur kode Python).",
        "Menyusun modul latihan mingguan dan melakukan evaluasi kode mahasiswa secara objektif."
      ],
      responsibilities_en: [
        "Mentored 30 undergraduate students across Database Systems (relational schema design, normalization, complex SQL queries) and Programming Fundamentals (Python algorithms).",
        "Authored weekly practicum modules and evaluated student code submissions."
      ]
    }
  ];

  return (
    <section id="experience" className="experience-section container" aria-labelledby="experience-heading">
      <div className="section-header reveal-on-scroll">
        <span className="section-kicker-tag">
          {language === "id"
            ? "REKAM JEJAK OPERASIONAL & KEPEMIMPINAN TEKNIS"
            : "OPERATIONAL TRACK RECORD & TECHNICAL LEADERSHIP"}
        </span>
        <h2 id="experience-heading" className="section-title">
          {language === "id"
            ? "Pengalaman Rekayasa AI & Kepemimpinan Tim"
            : "AI Engineering & Team Leadership Experience"}
        </h2>
        <p className="section-subtitle">
          {language === "id"
            ? "Memimpin tim lintas disiplin dalam merancang pipeline model Deep Learning, mengintegrasikan layanan LLM di instansi pemerintah, dan membimbing praktikum akademik."
            : "Leading cross-functional teams to ship production Deep Learning pipelines, deploy municipal LLM services, and mentor undergraduate practicums."}
        </p>
      </div>

      <div className="exp-timeline-stack">
        {experiences.map((exp, idx) => (
          <article key={exp.id} className="exp-card surface-card reveal-on-scroll">
            <div className="exp-card-header">
              <div className="exp-identity-row">
                <img
                  src={exp.logo}
                  alt=""
                  width="44"
                  height="44"
                  className="exp-brand-emblem"
                />
                <div>
                  <span className="category-tag" style={{ display: "inline-block", marginBottom: "6px" }}>
                    0{idx + 1} · {exp.meta}
                  </span>
                  <h3 className="exp-role-title">
                    {language === "id" ? exp.role_id : exp.role_en}
                  </h3>
                  <p className="exp-company-name">{exp.company}</p>
                </div>
              </div>

              <div className="exp-period-badge">
                <Calendar size={13} style={{ display: "inline", marginRight: "6px" }} aria-hidden="true" />
                <span>{language === "id" ? exp.period_id : exp.period_en}</span>
              </div>
            </div>

            <ul className="exp-bullets">
              {(language === "id" ? exp.responsibilities_id : exp.responsibilities_en).map((resp, i) => (
                <li key={i}>{resp}</li>
              ))}
            </ul>

            <div className="exp-tools-footer">
              {exp.tools.map((t) => (
                <span key={t} className="skill-chip">
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Experience;
