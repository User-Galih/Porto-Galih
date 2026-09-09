/* ==========================================================================
   JAVASCRIPT CONTROLLER - APPLE CLEAN LANDING PAGE PORTFOLIO
   ========================================================================== */

// --- GLOBAL STATE ---
let activeLanguage = 'id'; // 'id' or 'en'
let isAudioEnabled = true;
let simulatedTrend = 'Bullish';
let activeEmitens = ['BBCA', 'BBRI', 'TLKM', 'ASII'];

// Web Audio API Context (Lazily Initialized)
let audioCtx = null;

// Raw Database Storage with full local fallback (CORS / file:// protocol safe)
let database = {
  projects: [
    {
      "id": "smartinvest-ai",
      "title_id": "SmartInvest (AI Engineering)",
      "title_en": "SmartInvest (AI Engineering)",
      "subtitle_id": "Klasifikasi Tren IHSG & Saham dengan Deep Learning (BiLSTM + Attention)",
      "subtitle_en": "IHSG & Stock Market Trend Classification with Deep Learning (BiLSTM + Attention)",
      "description_id": "Modul Deep Learning time-series berkinerja tinggi untuk memprediksi pergerakan jangka pendek (Naik/Bullish, Stabil/Sideways, Turun/Bearish) pada indeks pasar IHSG dan emiten individu konstituen LQ45/IDX30.",
      "description_en": "High-performance time-series Deep Learning module designed to classify short-term movement trends (Bullish, Sideways, Bearish) for the IHSG composite index and individual LQ45/IDX30 stocks.",
      "architecture_id": "• Arsitektur: Bidirectional LSTM + Multi-Head Attention + Custom Dense layer.<br>• Input: Data sekuensial 15 hari perdagangan dengan 11 fitur indikator teknikal (RSI, MACD, Bollinger Bands, dll.).<br>• Model IHSG (ihsg_best_model_3class.keras): Uji Blind Test menghasilkan Akurasi 92.64% dan Macro F1-Score 90.39% (F1-Score Stabil/Sideways mencapai 80.00%).<br>• Model Emiten (smartinvest_best_model_3class.keras.zip): Uji Blind Test menghasilkan Akurasi 94.46% dan Macro F1-Score 93%.<br>• Jupyter Notebooks: KLASIFIKASI_IHSG_TUNED_DAN_REKOMENDASI.ipynb & Modelling_trenSaham_FIXED_STABIL.ipynb.<br>• Deployment: FastAPI microservices dengan browser header spoofing pada Yahoo Finance scraper untuk memintas rate-limiting.",
      "architecture_en": "• Architecture: Bidirectional LSTM + Multi-Head Attention + Custom Dense layers.<br>• Input: Sequential 15-day trading data with 11 technical indicators (RSI, MACD, Bollinger Bands, etc.).<br>• IHSG Model (ihsg_best_model_3class.keras): Blind Test achieves 92.64% Accuracy and 90.39% Macro F1-Score (Sideways F1-Score: 80.00%).<br>• Stock Model (smartinvest_best_model_3class.keras.zip): Blind Test achieves 94.46% Accuracy and 93% Macro F1-Score.<br>• Jupyter Notebooks: KLASIFIKASI_IHSG_TUNED_DAN_REKOMENDASI.ipynb & Modelling_trenSaham_FIXED_STABIL.ipynb.<br>• Deployment: FastAPI microservices running browser header spoofing on yfinance scraper to prevent API rate-limiting.",
      "tools": ["Python", "TensorFlow", "Keras", "FastAPI", "Uvicorn", "yfinance", "scikit-learn", "Joblib"],
      "github_repo": "User-Galih/SmartInvest-App",
      "demo_url": "https://smart-invest-app-git-main-helmi-azkias-projects.vercel.app/"
    },
    {
      "id": "smartinvest-ds",
      "title_id": "SmartInvest (Data Science)",
      "title_en": "SmartInvest (Data Science)",
      "subtitle_id": "Optimasi Portofolio Kuantitatif (Modern Portfolio Theory)",
      "subtitle_en": "Quantitative Portfolio Optimization (Modern Portfolio Theory)",
      "description_id": "Modul riset kuantitatif dan analisis data keuangan yang mengalokasikan bobot modal optimal untuk meminimalkan risiko portofolio saham berdasarkan profil risiko investor.",
      "description_en": "Quantitative financial research module allocating optimal asset weights to minimize portfolio risk based on investor profiles.",
      "architecture_id": "• Algoritma Utama: MVEP (Mean-Variance Efficient Portfolio) via SciPy SLSQP optimizer untuk memaksimalkan Sharpe Ratio, SIM (Single Index Model) untuk menyederhanakan kovarians pasar, dan CAPM (Capital Asset Pricing Model) untuk portofolio defensif berbasis sensitivitas Beta.<br>• Exploratory Data Analysis (EDA): Analisis return historis 5 tahun emiten LQ45/IDX30, visualisasi Correlation Heatmap, Risk vs Return Scatter Plot, dan Rolling Volatility.<br>• Analisis Statistik: Uji statistik berpasangan t-test relasional via SciPy untuk menjamin konsistensi formula kuantitatif.<br>• Jupyter Notebooks: notebook.ipynb & AB_Testing_Capstone_Project.ipynb.<br>• Validasi Dasbor: Dasbor interaktif divalidasi via Streamlit sebelum integrasi ke web produksi.",
      "architecture_en": "• Core Algorithms: MVEP (Mean-Variance Efficient Portfolio) via SciPy SLSQP solver to maximize Sharpe Ratio, SIM (Single Index Model) to simplify market covariance, and CAPM (Capital Asset Pricing Model) for defensive Beta-based allocations.<br>• Exploratory Data Analysis (EDA): Analyzed 5-year historical return distributions of LQ45/IDX30 stocks, plotting Correlation Heatmaps, Risk vs. Return Scatters, and Rolling Volatility.<br>• Statistical Analysis: Relational t-test statistical validation via SciPy to guarantee mathematical formula consistency.<br>• Jupyter Notebooks: notebook.ipynb & AB_Testing_Capstone_Project.ipynb.<br>• Dashboard Validation: Interactive prototype validated via Streamlit before production integration.",
      "tools": ["Python", "Streamlit", "Pandas", "NumPy", "SciPy", "PyPortfolioOpt", "Plotly", "yfinance"],
      "github_repo": "User-Galih/SmartInvest-App",
      "demo_url": "https://smart-invest-app-git-main-helmi-azkias-projects.vercel.app/"
    },
    {
      "id": "smartinvest-fs",
      "title_id": "SmartInvest (Fullstack Web)",
      "title_en": "SmartInvest (Fullstack Web)",
      "subtitle_id": "Integrasi Sistem & Orkestrasi Platform Terdistribusi",
      "subtitle_en": "System Integration & Distributed Platform Orchestration",
      "description_id": "Orkestrasi arsitektur sistem web terdistribusi untuk menyatukan mesin analisis kuantitatif dan prediksi Deep Learning Python ke dalam dashboard interaktif investor ritel.",
      "description_en": "Distributed system orchestration merging the Python quantitative engine and Deep Learning models into a production-ready retail investor dashboard.",
      "architecture_id": "• Frontend: React (Vite) + Tailwind CSS dengan desain premium glassmorphism, visualisasi Chart.js, dan panel konfigurasi parameter.<br>• API Gateway: Node.js Express Gateway untuk mengorkestrasi autentikasi user dan koordinasi data.<br>• FastAPI Engine (SmartfastApi): Backend Python yang mengoordinasikan input modal, scraping BI Rate secara real-time dari situs resmi Bank Indonesia, menghitung pembobotan optimal secara dinamis, mengintegrasikan Google Gemini Pro API untuk narasi analisis risiko-keuntungan, serta menyimpan kalkulasi otomatis ke database Supabase (PostgreSQL) dengan sistem rotasi FIFO maksimal 20 record.",
      "architecture_en": "• Frontend: React (Vite) + Tailwind CSS using premium glassmorphic layouts, dynamic Chart.js visualizations, and parameter panels.<br>• API Gateway: Node.js Express Gateway orchestrating user auth and database CRUD routing.<br>• FastAPI Engine (SmartfastApi): Coordinates capital parameters, scrapes the Bank Indonesia rate in real-time, calculates dynamic portfolio weights, integrates Google Gemini Pro API for narrative analysis, and handles automatic saves to Supabase (PostgreSQL) using a 20-record FIFO rotation policy.",
      "tools": ["React", "Tailwind CSS", "Node.js", "Express", "FastAPI", "Supabase", "PostgreSQL", "Chart.js"],
      "github_repo": "User-Galih/SmartInvest-App",
      "demo_url": "https://smart-invest-app-git-main-helmi-azkias-projects.vercel.app/"
    },
    {
      "id": "waste-classifier",
      "title_id": "Waste Classifier API & UI",
      "title_en": "Waste Classifier API & UI",
      "subtitle_id": "Klasifikasi Sampah Otomatis dengan EfficientNetV2",
      "subtitle_en": "Automated Waste Classification with EfficientNetV2",
      "description_id": "Aplikasi deteksi gambar untuk membedakan sampah Organik dan Anorganik secara otomatis. Bertujuan membantu digitalisasi pengelolaan sampah rumah tangga dan instansi.",
      "description_en": "Image detection application to automatically classify Organic and Inorganic waste, designed to support waste management digitization in households and institutions.",
      "architecture_id": "Model dilatih menggunakan arsitektur Convolutional Neural Network EfficientNetV2 (TensorFlow/Keras) berukuran input 224x224. Backend API dibangun menggunakan FastAPI, dikontainerisasi dengan Docker, dan dideploy pada Hugging Face Spaces. Frontend UI dibangun dengan React dan dideploy di Vercel.",
      "architecture_en": "Model is trained using the EfficientNetV2 Convolutional Neural Network architecture (TensorFlow/Keras) with a 224x224 input size. Backend API is built using FastAPI, containerized with Docker, and deployed on Hugging Face Spaces. Frontend UI is built using React and hosted on Vercel.",
      "tools": ["Python", "TensorFlow", "Keras", "FastAPI", "Pillow", "Docker", "React", "Tailwind CSS"],
      "github_repo": "User-Galih/waste-classification-ui",
      "demo_url": "https://waste-classification-ui.vercel.app/"
    },
    {
      "id": "diskominfo-chatbot",
      "title_id": "Diskominfo Registration Bot & Portal",
      "title_en": "Diskominfo Registration Bot & Portal",
      "subtitle_id": "Sistem Informasi Pendaftaran Magang Berbasis AI",
      "subtitle_en": "AI-Driven Internship Registration Information System",
      "description_id": "Platform digital untuk mengotomatisasi layanan pendaftaran magang di Dinas Komunikasi dan Informatika (Diskominfo) Kota Semarang, menyaring FAQ pendaftar secara otomatis.",
      "description_en": "Digital platform to automate internship registration services at Semarang Communication and Informatics Office (Diskominfo), automatically filtering applicant FAQs.",
      "architecture_id": "Berperan sebagai Ketua Tim. Merancang arsitektur chatbot berbasis aturan (rule-based) terintegrasi untuk menyaring FAQ instan. Mengembangkan web portal pendaftaran responsif dari front-end hingga back-end, serta REST API penampung data pendaftar yang efisien dan aman.",
      "architecture_en": "Served as Team Lead. Designed and built an integrated rule-based FAQ chatbot to answer recurring queries. Developed the responsive registration web portal from front-end to back-end, alongside secure REST APIs for database management.",
      "tools": ["HTML5", "CSS3", "JavaScript", "PHP", "Bootstrap", "MySQL", "REST API", "Git"],
      "github_repo": "User-Galih",
      "demo_url": ""
    }
  ],
  certificates: [
    {
      "id": "bnsp-data-scientist",
      "title_id": "Associate Data Scientist",
      "title_en": "Associate Data Scientist",
      "issuer": "Badan Nasional Sertifikasi Profesi (BNSP)",
      "credential_id": "MET.0001.000325 2026",
      "issue_date": "April 2026",
      "expiry_date": "April 2029",
      "category": "Data Science",
      "isFeatured": true,
      "description_id": "Sertifikasi profesi berstandar nasional yang memvalidasi kompetensi dalam bidang Ilmuan Data Madya di Indonesia, diterbitkan oleh BNSP berdasarkan rekomendasi uji kompetensi Komunikasi dan Informatika.",
      "description_en": "National professional certification validating competency as an Associate Data Scientist in Indonesia, issued by BNSP based on recommendations from the Ministry of Communication and Informatics.",
      "file_url": "assets/certificates/BNSP Certification Scheme of Associate Data Scientist_Badan Nasional Sertifikasi Profesi (BNSP).jpeg",
      "verification_url": "https://www.linkedin.com/in/galih-putra-pratama-8194bb255/"
    },
    {
      "id": "dicoding-dl-mahir",
      "title_id": "Membangun Proyek Deep Learning Tingkat Mahir",
      "title_en": "Membangun Proyek Deep Learning Tingkat Mahir",
      "issuer": "Dicoding Indonesia",
      "credential_id": "JMZVO5E1QXN9",
      "issue_date": "June 8, 2026",
      "expiry_date": "June 8, 2029",
      "category": "AI & Deep Learning",
      "isFeatured": true,
      "description_id": "Kelas ditujukan bagi AI/ML/DL Engineer yang ingin memperdalam pengetahuan tentang computer vision, NLP, time series, dan sistem rekomendasi berbasis kustomisasi arsitektur TensorFlow.",
      "description_en": "Advanced course for AI/ML/DL Engineers to deepen knowledge in computer vision, NLP, time series, and recommendation systems using custom TensorFlow architectures.",
      "file_url": "assets/certificates/Membangun Proyek Deep Learning Tingkat Mahir.pdf",
      "verification_url": "https://www.dicoding.com/certificates/JMZVO5E1QXN9",
      "syllabus_id": [
        "Menyelam Lebih Dalam ke Tensorflow! (7 jam)",
        "Custom Model, Layer, Loss, dan Callback (8 jam 10 menit)",
        "Custom dan Distributed Training dengan TensorFlow (8 jam 55 menit)",
        "Sistem Rekomendasi Lanjutan dengan TensorFlow (10 jam)",
        "Natural Language Processing Lanjutan dengan TensorFlow (13 jam)",
        "Computer Vision Lanjutan dengan TensorFlow (12 jam)",
        "Time Series Lanjutan dengan TensorFlow (15 jam)",
        "Submission: Proyek time series multivariate multi-step dengan model & training kustom (Total 90 jam)"
      ],
      "syllabus_en": [
        "Diving Deeper into TensorFlow! (7 hours)",
        "Custom Models, Layers, Losses, and Callbacks (8 hours 10 mins)",
        "Custom and Distributed Training with TensorFlow (8 hours 85 mins)",
        "Advanced Recommendation Systems with TensorFlow (10 hours)",
        "Advanced Natural Language Processing with TensorFlow (13 hours)",
        "Advanced Computer Vision with TensorFlow (12 hours)",
        "Advanced Time Series with TensorFlow (15 hours)",
        "Submission: Multivariate multi-step time series forecasting project with custom loops (Total 90 hours)"
      ]
    },
    {
      "id": "dicoding-dl-fundamental",
      "title_id": "Belajar Fundamental Deep Learning",
      "title_en": "Belajar Fundamental Deep Learning",
      "issuer": "Dicoding Indonesia",
      "credential_id": "QLZ993277Z5D",
      "issue_date": "April 2026",
      "expiry_date": "April 2029",
      "category": "AI & Deep Learning",
      "isFeatured": false,
      "description_id": "Memvalidasi pemahaman dasar arsitektur Deep Learning (Neural Networks, CNN untuk klasifikasi gambar, dan dasar RNN/LSTM).",
      "description_en": "Validates fundamental understanding of Deep Learning architectures (Neural Networks, CNNs for image classification, and basic RNNs/LSTMs).",
      "file_url": "assets/certificates/Belajar Fundamental Deep Learning.pdf",
      "verification_url": "https://www.dicoding.com/certificates/QLZ993277Z5D"
    },
    {
      "id": "dicoding-ml-pemula",
      "title_id": "Belajar Machine Learning untuk Pemula",
      "title_en": "Belajar Machine Learning untuk Pemula",
      "issuer": "Dicoding Indonesia",
      "credential_id": "1OP8R25DLZQK",
      "issue_date": "March 2026",
      "expiry_date": "March 2029",
      "category": "AI & Deep Learning",
      "isFeatured": false,
      "description_id": "Meliputi teori dasar machine learning, supervised & unsupervised learning, pemrosesan data, serta pembuatan model klasifikasi/regresi sederhana dengan Scikit-Learn.",
      "description_en": "Covers machine learning basics, supervised & unsupervised learning, data preprocessing, and building simple classification/regression models using Scikit-Learn.",
      "file_url": "assets/certificates/Belajar Machine Learning untuk Pemula.pdf",
      "verification_url": "https://www.dicoding.com/certificates/1OP8R25DLZQK"
    },
    {
      "id": "dicoding-ai-dasar-1",
      "title_id": "Belajar Dasar AI (Feb 2026)",
      "title_en": "Belajar Dasar AI (Feb 2026)",
      "issuer": "Dicoding Indonesia",
      "credential_id": "JMZVO2QW3XN9",
      "issue_date": "February 2026",
      "expiry_date": "February 2029",
      "category": "AI & Deep Learning",
      "isFeatured": false,
      "description_id": "Pengenalan dasar konsep kecerdasan buatan, sejarah, cabang AI, machine learning, deep learning, dan etika AI.",
      "description_en": "Introduction to basic AI concepts, history, branches of AI, machine learning, deep learning, and AI ethics.",
      "file_url": "assets/certificates/Belajar Dasar AI.pdf",
      "verification_url": "https://www.dicoding.com/certificates/JMZVO2QW3XN9"
    },
    {
      "id": "dicoding-ai-dasar-2",
      "title_id": "Belajar Dasar AI (Sep 2025)",
      "title_en": "Belajar Dasar AI (Sep 2025)",
      "issuer": "Dicoding Indonesia",
      "credential_id": "98XWOVW5LZM3",
      "issue_date": "September 2025",
      "expiry_date": "September 2028",
      "category": "AI & Deep Learning",
      "isFeatured": false,
      "description_id": "Sertifikat dasar pengenalan kecerdasan buatan dan dampaknya pada industri teknologi.",
      "description_en": "Fundamental certificate introducing artificial intelligence and its impact on the tech industry.",
      "file_url": "assets/certificates/Belajar Dasar AI.pdf",
      "verification_url": "https://www.dicoding.com/certificates/98XWOVW5LZM3"
    },
    {
      "id": "dicoding-prompt-eng",
      "title_id": "Prompt Engineering untuk Software Developer",
      "title_en": "Prompt Engineering for Software Developers",
      "issuer": "Dicoding Indonesia",
      "credential_id": "ERZR2WODQPYV",
      "issue_date": "October 2025",
      "expiry_date": "October 2028",
      "category": "AI & Deep Learning",
      "isFeatured": false,
      "description_id": "Studi rekayasa prompt (prompt engineering) untuk berinteraksi dengan LLM secara optimal guna menunjang produktivitas developer.",
      "description_en": "Study of prompt engineering techniques to interact with LLMs optimally to boost developer productivity.",
      "file_url": "assets/certificates/Prompt Engineering untuk Software Developer.pdf",
      "verification_url": "https://www.dicoding.com/certificates/ERZR2WODQPYV"
    },
    {
      "id": "dicoding-ds-dasar",
      "title_id": "Belajar Dasar Data Science",
      "title_en": "Belajar Dasar Data Science",
      "issuer": "Dicoding Indonesia",
      "credential_id": "EYX4J6EDWZDL",
      "issue_date": "October 8, 2024",
      "expiry_date": "October 8, 2027",
      "category": "Data Science",
      "isFeatured": false,
      "description_id": "Mempelajari konsep dasar data science bagi pemula, mulai dari siklus data, eksplorasi analisis data, hingga machine learning terapan.",
      "description_en": "Teaches fundamental data science concepts for beginners, from data lifecycles and exploratory data analysis to applied machine learning.",
      "file_url": "assets/certificates/Belajar Dasar Data Science.pdf",
      "verification_url": "https://www.dicoding.com/certificates/EYX4J6EDWZDL",
      "syllabus_id": [
        "The Power of Data: Pengenalan data, jenis data, keputusan berbasis data (100 menit)",
        "Fundamental Data Science: Istilah, tren, dan keahlian data scientist (90 menit)",
        "Menjelajahi Analisis Data: Pengenalan istilah, siklus, dan proses analisis data (140 menit)",
        "Teknologi dan Tools Pendukung: SQL, NoSQL, Excel, SPSS, Tableau, Python vs R (70 menit)",
        "Machine Learning untuk Data Science: Penggunaan, alasan, dan penerapan ML (90 menit)",
        "Mulailah Mencari Peluang: Karier data, portofolio, tips & triks (85 menit)",
        "Total jam belajar: 11 jam"
      ],
      "syllabus_en": [
        "The Power of Data: Intro to data, data types, data-driven decisions (100 mins)",
        "Fundamental Data Science: Terminology, trends, and key data scientist skills (90 mins)",
        "Exploring Data Analysis: Terminology, cycles, and process of data analysis (140 mins)",
        "Supporting Technologies and Tools: SQL, NoSQL, Excel, SPSS, Tableau, Python vs R (70 mins)",
        "Machine Learning for Data Science: Use cases, rationale, and real-world ML (90 mins)",
        "Start Seeking Opportunities: Data careers, portfolios, tips & tricks (85 mins)",
        "Total learning duration: 11 hours"
      ]
    },
    {
      "id": "dicoding-sql-dasar",
      "title_id": "Belajar Dasar Structured Query Language (SQL)",
      "title_en": "Belajar Dasar Structured Query Language (SQL)",
      "issuer": "Dicoding Indonesia",
      "credential_id": "0LZ0R323RP65",
      "issue_date": "January 2025",
      "expiry_date": "January 2028",
      "category": "Data Science",
      "isFeatured": false,
      "description_id": "Mempelajari dasar penulisan query database SQL relasional, seleksi kolom, filtering data, manipulasi tabel, join database, dan pengelompokan agregasi.",
      "description_en": "Teaches fundamental queries in relational databases, column selection, data filtering, table manipulation, database joins, and group aggregation.",
      "file_url": "assets/certificates/Belajar Dasar Structured Query Language (SQL).pdf",
      "verification_url": "https://www.dicoding.com/certificates/0LZ0R323RP65"
    },
    {
      "id": "coursera-cyber-careers",
      "title_id": "Introduction to Cybersecurity Careers",
      "title_en": "Introduction to Cybersecurity Careers",
      "issuer": "IBM via Coursera",
      "credential_id": "IBM-CYBER-2026",
      "issue_date": "February 2026",
      "expiry_date": null,
      "category": "Cyber Security & DevOps",
      "isFeatured": false,
      "description_id": "Sertifikat dasar pengenalan karir keamanan siber, lanskap ancaman siber, kerentanan sistem, dan prinsip keamanan CIA Triad.",
      "description_en": "Fundamental certificate introducing cybersecurity careers, cyber threat landscapes, system vulnerabilities, and CIA Triad principles.",
      "file_url": "assets/certificates/Introduction to Cybersecurity Careers IBM.pdf",
      "verification_url": "https://www.coursera.org/account/accomplishments/verify/IBM-CYBER-2026"
    },
    {
      "id": "forage-tata-cyber",
      "title_id": "Tata - Cybersecurity Analyst Job Simulation",
      "title_en": "Tata - Cybersecurity Analyst Job Simulation",
      "issuer": "Tata Group via Forage",
      "credential_id": "AQFvTrQg3GhWFxxY2",
      "issue_date": "December 2025",
      "expiry_date": null,
      "category": "Cyber Security & DevOps",
      "isFeatured": false,
      "description_id": "Mengerjakan simulasi kasus industri: Perancangan arsitektur Identity & Access Management (IAM) global untuk 150.000 karyawan dengan protokol SAML, OAuth 2.0, SCIM, RBAC, dan MFA.",
      "description_en": "Completed industry job simulation: Designing global Identity & Access Management (IAM) architecture for 150,000 employees using SAML, OAuth 2.0, SCIM, RBAC, and MFA protocols.",
      "file_url": "assets/certificates/Tata - Cybersecurity Analyst Job Simulation.pdf",
      "verification_url": "https://theforage.com/badges/AQFvTrQg3GhWFxxY2"
    },
    {
      "id": "dicoding-aws-cloud",
      "title_id": "Cloud Practitioner Essentials (Dasar AWS Cloud)",
      "title_en": "Cloud Practitioner Essentials (Dasar AWS Cloud)",
      "issuer": "Dicoding Indonesia",
      "credential_id": "RVZKKV6RMZD5",
      "issue_date": "March 2023",
      "expiry_date": "March 2026",
      "category": "Cyber Security & DevOps",
      "isFeatured": false,
      "description_id": "Pengenalan infrastruktur dasar Amazon Web Services (AWS), EC2 instances, S3 storage, VPC networking, RDS database, IAM security, dan arsitektur cloud server.",
      "description_en": "Introduction to basic Amazon Web Services (AWS) infrastructure, EC2 instances, S3 storage, VPC networking, RDS database, IAM security, and cloud architectures.",
      "file_url": "assets/certificates/Cloud Practitioner Essentials (Belajar Dasar AWS Cloud).pdf",
      "verification_url": "https://www.dicoding.com/certificates/RVZKKV6RMZD5"
    },
    {
      "id": "dicoding-devops-dasar",
      "title_id": "Belajar Dasar-Dasar DevOps",
      "title_en": "Belajar Dasar-Dasar DevOps",
      "issuer": "Dicoding Indonesia",
      "credential_id": "JLX1LGNG6X72",
      "issue_date": "October 2022",
      "expiry_date": "November 2025",
      "category": "Cyber Security & DevOps",
      "isFeatured": false,
      "description_id": "Mempelajari dasar otomatisasi software delivery, Continuous Integration, Continuous Deployment (CI/CD), kolaborasi tim IT, dan monitoring infrastruktur.",
      "description_en": "Teaches basic software delivery automation, Continuous Integration, Continuous Deployment (CI/CD), IT team collaboration, and infrastructure monitoring.",
      "file_url": "assets/certificates/dasar devops.pdf",
      "verification_url": "https://www.dicoding.com/certificates/JLX1LGNG6X72"
    },
    {
      "id": "dicoding-python-dasar",
      "title_id": "Memulai Pemrograman dengan Python",
      "title_en": "Memulai Pemrograman dengan Python",
      "issuer": "Dicoding Indonesia",
      "credential_id": "JLX1VGL95Z72",
      "issue_date": "February 2026",
      "expiry_date": "February 2029",
      "category": "Software Engineering & Management",
      "isFeatured": false,
      "description_id": "Memvalidasi pemahaman sintaks dasar Python, tipe data, perulangan, percabangan, fungsi, object-oriented programming (OOP), dan penanganan error.",
      "description_en": "Validates understanding of basic Python syntax, data types, loops, conditionals, functions, object-oriented programming (OOP), and error handling.",
      "file_url": "assets/certificates/Memulai Pemrograman dengan Python.pdf",
      "verification_url": "https://www.dicoding.com/certificates/JLX1VGL95Z72"
    },
    {
      "id": "dicoding-git-github",
      "title_id": "Belajar Dasar Git dengan GitHub",
      "title_en": "Belajar Dasar Git dengan GitHub",
      "issuer": "Dicoding Indonesia",
      "credential_id": "1OP8RD4LVZQK",
      "issue_date": "February 2026",
      "expiry_date": "February 2029",
      "category": "Software Engineering & Management",
      "isFeatured": false,
      "description_id": "Menguasai version control system Git untuk manajemen riwayat kode program, branching, merging, dan kolaborasi tim via GitHub.",
      "description_en": "Mastering the Git version control system to manage code history, branching, merging, and remote collaboration via GitHub.",
      "file_url": "assets/certificates/Belajar Dasar Git dengan GitHub.pdf",
      "verification_url": "https://www.dicoding.com/certificates/1OP8RD4LVZQK"
    },
    {
      "id": "dicoding-prog-logic",
      "title_id": "Pengenalan ke Logika Pemrograman (Programming Logic 101)",
      "title_en": "Pengenalan ke Logika Pemrograman (Programming Logic 101)",
      "issuer": "Dicoding Indonesia",
      "credential_id": "NVP7NYEVVZR0",
      "issue_date": "February 2026",
      "expiry_date": "February 2029",
      "category": "Software Engineering & Management",
      "isFeatured": false,
      "description_id": "Melatih logika pemrograman fundamental, gerbang logika, tabel kebenaran, pseudocode, flowchart, dan pemikiran komputasi terstruktur.",
      "description_en": "Trains fundamental programming logic, logic gates, truth tables, pseudocode, flowcharts, and structured computational thinking.",
      "file_url": "assets/certificates/Pengenalan ke Logika Pemrograman (Programming Logic 101).pdf",
      "verification_url": "https://www.dicoding.com/certificates/NVP7NYEVVZR0"
    },
    {
      "id": "dicoding-software-dev",
      "title_id": "Memulai Dasar Pemrograman untuk Menjadi Pengembang Software",
      "title_en": "Memulai Dasar Pemrograman untuk Menjadi Pengembang Software",
      "issuer": "Dicoding Indonesia",
      "credential_id": "N9ZON32LRXG5",
      "issue_date": "February 2026",
      "expiry_date": "February 2029",
      "category": "Software Engineering & Management",
      "isFeatured": false,
      "description_id": "Mempelajari dasar siklus hidup pengembangan perangkat lunak (SDLC), metodologi Agile/Scrum, pemodelan data dasar, dan peran pekerjaan software engineer.",
      "description_en": "Teaches fundamental software development lifecycle (SDLC), Agile/Scrum methodology, basic data modeling, and professional software engineer roles.",
      "file_url": "assets/certificates/Memulai Dasar Pemrograman untuk Menjadi Pengembang Software.pdf",
      "verification_url": "https://www.dicoding.com/certificates/N9ZON32LRXG5"
    },
    {
      "id": "dicoding-proj-mgmt",
      "title_id": "Pelatihan Manajemen Proyek",
      "title_en": "Pelatihan Manajemen Proyek",
      "issuer": "Dicoding Indonesia",
      "credential_id": "1RXY63OM9ZVM",
      "issue_date": "July 2023",
      "expiry_date": "July 2026",
      "category": "Software Engineering & Management",
      "isFeatured": false,
      "description_id": "Mempelajari kerangka kerja manajemen proyek TI, analisis kelayakan proyek, manajemen timeline (Gantt Chart), estimasi budget, dan mitigasi risiko proyek.",
      "description_en": "Covers IT project management frameworks, project feasibility studies, timeline management (Gantt Charts), budget estimation, and project risk mitigation.",
      "file_url": "assets/certificates/Belajar Dasar Manajemen Proyek.pdf",
      "verification_url": "https://www.dicoding.com/certificates/1RXY63OM9ZVM"
    }
  ],
  education: [
    {
      "institution_id": "Universitas Dian Nuswantoro (UDINUS)",
      "institution_en": "Universitas Dian Nuswantoro (UDINUS)",
      "degree_id": "Sarjana Komputer (S.Kom.) dalam Teknik Informatika",
      "degree_en": "Bachelor of Computer Science in Informatics Engineering",
      "period": "August 2022 - August 2026",
      "gpa": "3.72 / 4.00",
      "honors_id": "Dengan Pujian (Cumlaude)",
      "honors_en": "Graduated with Honors (Cumlaude)",
      "thesis_title_id": "Implementasi Model Deep Learning Menggunakan Arsitektur EfficientNetV2 untuk Sistem Klasifikasi Sampah Otomatis",
      "thesis_title_en": "Full-Stack Implementation of Deep Learning Model Using EfficientNetV2 Architecture for Automated Waste Classification System",
      "core_courses": [
        {
          "course_id": "Kecerdasan Buatan",
          "course_en": "Artificial Intelligence",
          "grade": "A",
          "credits": 3
        },
        {
          "course_id": "Pemrosesan Bahasa Alami Berbasis Teks",
          "course_en": "Text-based Natural Language Processing",
          "grade": "A",
          "credits": 3
        },
        {
          "course_id": "Penglihatan Komputer dan Analisis Citra",
          "course_en": "Computer Vision and Image Analysis",
          "grade": "A",
          "credits": 3
        },
        {
          "course_id": "Penambangan Data",
          "course_en": "Data Mining",
          "grade": "A",
          "credits": 3
        },
        {
          "course_id": "Pengolahan Citra Digital",
          "course_en": "Digital Image Processing",
          "grade": "A",
          "credits": 3
        },
        {
          "course_id": "Keamanan Sistem dan Siber",
          "course_en": "System and Cyber Security",
          "grade": "A",
          "credits": 3
        },
        {
          "course_id": "Komputasi Kuantum",
          "course_en": "Quantum Computing",
          "grade": "A",
          "credits": 3
        },
        {
          "course_id": "Sistem Basis Data",
          "course_en": "Database Systems",
          "grade": "A",
          "credits": 2
        },
        {
          "course_id": "Pembelajaran Mesin",
          "course_en": "Machine Learning",
          "grade": "AB",
          "credits": 3
        },
        {
          "course_id": "Pemrograman Web Lanjut",
          "course_en": "Advanced Web Programming",
          "grade": "AB",
          "credits": 2
        },
        {
          "course_id": "Pemrograman Berorientasi Objek",
          "course_en": "Object-Oriented Programming",
          "grade": "A",
          "credits": 4
        }
      ]
    }
  ],
  experience: [
    {
      "id": "dbs-coding-camp",
      "company": "Coding Camp powered by DBS Foundation & Dicoding",
      "role_id": "Cohort Member - AI Engineering (Apprenticeship)",
      "role_en": "Cohort Member - AI Engineering (Apprenticeship)",
      "period_id": "Januari 2026 - Sekarang",
      "period_en": "January 2026 - Present",
      "location_id": "Indonesia (Remote)",
      "location_en": "Indonesia (Remote)",
      "responsibilities_id": [
        "Terpilih sebagai salah satu cohort member dalam jalur pembelajaran intensif AI Engineering yang didukung oleh DBS Foundation dan Dicoding Indonesia.",
        "Bertindak sebagai Technical Lead & Perwakilan Tim untuk proyek capstone 'SmartInvest', mengelola struktur repositori GitHub, timeline teknis, serta mentoring developer dalam tim.",
        "Memimpin perancangan arsitektur dan implementasi algoritma kecerdasan buatan utama dalam platform.",
        "Mengintegrasikan model AI/DL secara langsung ke dalam aplikasi full-stack web React-FastAPI untuk memastikan kelancaran fungsionalitas end-to-end."
      ],
      "responsibilities_en": [
        "Selected as a cohort member in the intensive AI Engineering learning path supported by DBS Foundation and Dicoding Indonesia.",
        "Served as Technical Lead & Team Representative for the 'SmartInvest' capstone project, managing GitHub repositories, technical timelines, and mentoring team developers.",
        "Led the architectural design and implementation of core AI models within the team's platform.",
        "Integrated AI/DL models directly into the React-FastAPI fullstack web application to ensure seamless end-to-end production functionality."
      ],
      "skills": ["Artificial Intelligence", "Deep Learning", "Team Leadership", "GitHub Management", "Full-Stack Integration"]
    },
    {
      "id": "diskominfo-semarang",
      "company": "Dinas Komunikasi, Informatika, Statistik dan Persandian Kota Semarang",
      "role_id": "LLM Application Developer & Ketua Tim (Magang)",
      "role_en": "LLM Application Developer & Team Lead (Internship)",
      "period_id": "Mei 2025 - Juli 2025 (3 Bulan)",
      "period_en": "May 2025 - July 2025 (3 Months)",
      "location_id": "Kota Semarang, Jawa Tengah (On-site)",
      "location_en": "Semarang City, Central Java (On-site)",
      "responsibilities_id": [
        "Melaksanakan magang sebagai Ketua Tim yang mengoordinasikan pembagian tugas developer, manajemen timeline, dan kelancaran kolaborasi.",
        "Merancang dan mengembangkan arsitektur chatbot berbasis aturan (rule-based FAQ chatbot) untuk otomasi penyaringan informasi pendaftaran magang resmi.",
        "Mengintegrasikan logika chatbot AI ke dalam sistem internal dinas untuk menyaring dan menjawab pertanyaan berulang secara instan.",
        "Membangun platform web responsif pendaftaran magang Diskominfo Kota Semarang dari sisi frontend hingga backend.",
        "Mengembangkan REST API dan manajemen database MySQL untuk penyimpanan data pendaftar yang efisien dan aman.",
        "Melakukan pengujian fungsionalitas sistem (testing) guna menjamin kestabilan chatbot dan web portal saat diakses oleh publik."
      ],
      "responsibilities_en": [
        "Acted as Team Lead coordinating task distribution, project timelines, and developer collaboration during the internship.",
        "Designed and developed a rule-based FAQ chatbot architecture to automate queries for official internship registration.",
        "Integrated chatbot logic into internal systems to answer repetitive inquiries and FAQs instantly.",
        "Built the responsive Diskominfo Semarang internship registration web portal from front-end to back-end.",
        "Developed secure REST APIs and MySQL database management to handle applicant records efficiently.",
        "Performed system functionality testing to guarantee the stability of the chatbot and portal under public load."
      ],
      "skills": ["Team Leadership", "Chatbot Development", "Web Development", "REST API", "Database Management", "System Testing"]
    }
  ]
};

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  // Set default Status Bar Date String
  setupDateString();

  // Load Database files (tries fetch, falls back to local database object if CORS/offline)
  loadAllData();

  // Run stock optimizer initially
  runStockOptimization();
  
  // Setup drag and drop for waste simulator
  setupWasteDropzone();

  // Interactive Background following cursor (iOS Blobs)
  setupBackgroundBlobs();

  // Setup scroll spy for navigation menu
  setupScrollSpy();

  // Setup event listeners for certificate slider
  setupCertCarouselListeners();
});

// --- DYNAMIC BACKGROUND: iOS BLOBS FOLLOW MOUSE ---
function setupBackgroundBlobs() {
  const blob1 = document.getElementById('blob-1');
  const blob2 = document.getElementById('blob-2');
  const blob3 = document.getElementById('blob-3');

  document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    // Apply parallax coordinates with inertia
    if (blob1) blob1.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
    if (blob2) blob2.style.transform = `translate(${x * -0.04}px, ${y * -0.04}px)`;
    if (blob3) blob3.style.transform = `translate(${x * 0.06}px, ${y * 0.06}px)`;
  });
}

function setupDateString() {
  const now = new Date();
  const options = { weekday: 'long', day: 'numeric', month: 'short' };
  const dateStr = now.toLocaleDateString(activeLanguage === 'id' ? 'id-ID' : 'en-US', options);
  
  // Clock update (if statusbar is present)
  let clockText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// --- WEB AUDIO API: SYNTHESIS ENGINE (Click & Woosh) ---
function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

function playClickSound() {
  if (!isAudioEnabled) return;
  try {
    initAudio();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    // Quick pop keyboard sound
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.04);
    
    gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.04);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
  } catch (e) {
    console.error("Audio playback error", e);
  }
}

function playWooshSound() {
  if (!isAudioEnabled) return;
  try {
    initAudio();
    
    // Synth envelope noise sweep
    const bufferSize = audioCtx.sampleRate * 0.4;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noiseNode = audioCtx.createBufferSource();
    noiseNode.buffer = buffer;
    
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.Q.setValueAtTime(1.5, audioCtx.currentTime);
    filter.frequency.setValueAtTime(80, audioCtx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(1400, audioCtx.currentTime + 0.3);
    
    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.35);
    
    noiseNode.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);
    
    noiseNode.start();
  } catch (e) {
    console.error("Audio playback error", e);
  }
}

// --- LANGUAGE DICTIONARY (i18n ENGINE) ---
// --- LANGUAGE DICTIONARY (i18n ENGINE) ---
const translations = {
  id: {
    cc_download: "Resume PDF",
    widget_gpa: "IPK UDINUS (Cumlaude)",
    widget_certs: "Sertifikasi Diverifikasi",
    nav_about: "Tentang",
    nav_projects: "Proyek",
    nav_experience: "Pengalaman",
    nav_certs: "Sertifikat",
    nav_lab: "AI Lab",
    nav_contact: "Kontak",
    app_projects: "Proyek Terpilih",
    projects_desc: "Berikut adalah implementasi sistem kecerdasan buatan, analisis kuantitatif data, dan rekayasa web full-stack yang telah saya rancang.",
    certs_desc: "Sebanyak 18 sertifikasi profesi nasional dan internasional yang memvalidasi kompetensi saya dalam bidang AI, Data Science, Cybersecurity, dan Software Engineering.",
    lab_desc: "Coba langsung simulator client-side interaktif untuk menguji penerapan logika kuantitatif finansial dan pemrosesan pemindaian citra AI.",
    cat_all: "Semua",
    tab_exp: "Pengalaman Kerja",
    tab_edu: "Pendidikan & Transkrip",
    tab_stock_opt: "Optimasi Saham (SmartInvest)",
    tab_waste_opt: "Pendeteksi Sampah (EfficientNetV2)",
    stock_title: "Parameter Optimasi",
    stock_cap: "Nominal Modal Investasi (Rupiah):",
    stock_emiten: "Emiten Terpilih (LQ45):",
    stock_ihsg: "Simulasikan Sentimen Tren IHSG:",
    stock_method: "Metode Alokasi Portofolio:",
    opt_all: "ALL (Decision Engine Otomatis)",
    btn_calc: "Kalkulasi Alokasi",
    stock_res: "Hasil Alokasi Aset",
    tbl_price: "Harga (Rp)",
    tbl_weight: "Bobot (%)",
    tbl_shares: "Lembar",
    tbl_nominal: "Total (Rp)",
    gemini_intel: "Interpretasi Portofolio (Gemini API)",
    btn_full_app: "Buka Aplikasi SmartInvest Selengkapnya",
    waste_sub: "Unggah Citra Sampah",
    drag_text: "Seret gambar kemari atau klik untuk memilih file",
    sample_text: "Or Gunakan Sampel Instan:",
    samp_plastic: "Botol Plastik",
    samp_leaf: "Daun Kering",
    hf_note: "Catatan: Model dideploy di Hugging Face Spaces. Jika deteksi membutuhkan waktu lama di awal, kontainer backend sedang melakukan cold-start (bangun dari mode tidur).",
    waste_res: "Hasil Deteksi AI",
    prev_text: "Menunggu citra masukan...",
    step_1: "Membaca Citra Masukan",
    step_2: "Merubah Resolusi ke 224x224 (RGB)",
    step_3: "Menjalankan EfficientNetV2 Inference",
    step_4: "Menerima argmax Matriks Probabilitas",
    res_class: "Klasifikasi Sampah:",
    res_conf: "Skor Kepercayaan:",
    mail_send: "Kirim Email",
    mail_to: "Kepada:",
    mail_from: "Dari:",
    mail_subject: "Subjek:",
    btn_send: "Kirim",
    contact_desc: "Punya tawaran proyek kolaborasi atau ingin berdiskusi seputar AI & Data Science? Silakan kirim pesan Anda langsung lewat formulir iMessage ini.",
    tech_stack_title: "Keahlian Utama:",
    hero_greeting: "Hi, saya Galih Putra Pratama",
    hero_status: "🟢 Siap Bekerja",
    hero_title: "AI Engineer & Data Scientist",
    hero_summary: "Mahasiswa Teknik Informatika di Universitas Dian Nuswantoro (UDINUS) dengan gairah besar dalam membangun sistem cerdas yang otonom—khususnya dalam merancang Advanced AI Agents dan aplikasi LLM menggunakan modern framework seperti LangChain, LangGraph, dan Llama. Didukung sertifikasi profesional di bidang Data Science, saya fokus pada pengintegrasian kemampuan AI state-of-the-art ini ke dalam aplikasi web Full-Stack siap produksi untuk memecahkan masalah nyata.",
    placeholder_email: "email_anda@perusahaan.com",
    placeholder_subject: "Tawaran Wawancara / Diskusi AI",
    placeholder_message: "Halo Galih, saya tertarik dengan profil portofolio Anda..."
  },
  en: {
    cc_download: "Resume PDF",
    widget_gpa: "UDINUS GPA (Cumlaude)",
    widget_certs: "Verified Certifications",
    nav_about: "About",
    nav_projects: "Projects",
    nav_experience: "Experience",
    nav_certs: "Certificates",
    nav_lab: "AI Lab",
    nav_contact: "Contact",
    app_projects: "Selected Projects",
    projects_desc: "Demonstrating my work in practical artificial intelligence systems, quantitative financial analysis, and full-stack web engineering.",
    certs_desc: "A verified directory of 18 professional credentials validating my competency in AI, Data Science, Cybersecurity, and Software Engineering.",
    lab_desc: "Try out these interactive client-side simulators showing quantitative portfolio assets sizing and deep learning image preprocessing.",
    cat_all: "All",
    tab_exp: "Work Experience",
    tab_edu: "Education & Transcript",
    tab_stock_opt: "Stock Sizer (SmartInvest)",
    tab_waste_opt: "Waste Scanner (EfficientNetV2)",
    stock_title: "Optimization Parameters",
    stock_cap: "Investment Capital (IDR):",
    stock_emiten: "Selected Constituents (LQ45):",
    stock_ihsg: "Simulate IHSG Market Trend:",
    stock_method: "Portfolio Allocation Method:",
    opt_all: "ALL (Automated Decision Engine)",
    btn_calc: "Calculate Weights",
    stock_res: "Asset Allocation Outcome",
    tbl_price: "Price (Rp)",
    tbl_weight: "Weight (%)",
    tbl_shares: "Shares",
    tbl_nominal: "Total (Rp)",
    gemini_intel: "Portfolio Analytics (Gemini AI)",
    btn_full_app: "Launch Complete SmartInvest Platform",
    waste_sub: "Upload Waste Image",
    drag_text: "Drag & drop image here or click to browse",
    sample_text: "Or Use Quick Samples:",
    samp_plastic: "Plastic Bottle",
    samp_leaf: "Dry Leaf",
    hf_note: "Note: The model is hosted on Hugging Face Spaces. If classification takes time initially, the container is undergoing a cold-start (waking from sleep).",
    waste_res: "AI Classifier Outcome",
    prev_text: "Awaiting image input...",
    step_1: "Reading Input Image Tensor",
    step_2: "Resizing to 224x224 (RGB Array)",
    step_3: "Running EfficientNetV2 Inference",
    step_4: "Receiving Argmax Output Slices",
    res_class: "Waste Classification:",
    res_conf: "Confidence Score:",
    mail_send: "Compose Message",
    mail_to: "To:",
    mail_from: "From:",
    mail_subject: "Subject:",
    btn_send: "Send",
    contact_desc: "Interested in hiring me or collaborating? Fill out this iMessage-style compose box to send me an email simulation.",
    tech_stack_title: "Core Expertise:",
    hero_greeting: "Hi, I'm Galih Putra Pratama",
    hero_status: "🟢 Open to Work",
    hero_title: "AI Engineer & Data Scientist",
    hero_summary: "Informatics Engineering student at Dian Nuswantoro University (UDINUS) with a great passion for building autonomous intelligent systems—specifically in designing Advanced AI Agents and LLM applications using modern frameworks like LangChain, LangGraph, and Llama. Backed by professional data science certifications, I focus on integrating these state-of-the-art AI capabilities into production-ready Full-Stack web applications to solve real-world problems.",
    placeholder_email: "your_email@company.com",
    placeholder_subject: "Interview Offer / AI Discussion",
    placeholder_message: "Hello Galih, I am interested in your portfolio profile..."
  }
};

function toggleLanguage() {
  playClickSound();
  activeLanguage = (activeLanguage === 'id') ? 'en' : 'id';
  
  // Update header toggle button text
  document.getElementById('langToggle').innerText = (activeLanguage === 'id') ? "EN 🇬🇧" : "ID 🇮🇩";
  
  // Translate UI elements with data-key
  document.querySelectorAll('[data-key]').forEach(el => {
    const key = el.getAttribute('data-key');
    if (translations[activeLanguage][key]) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = translations[activeLanguage][key];
      } else if (el.tagName === 'A' && el.querySelector('span')) {
        el.querySelector('span').innerText = translations[activeLanguage][key];
      } else if (el.tagName === 'BUTTON' && el.querySelector('span')) {
        el.querySelector('span').innerText = translations[activeLanguage][key];
      } else {
        el.innerText = translations[activeLanguage][key];
      }
    }
  });

  // Re-render components
  renderProjects();
  renderCertificates();
  renderExperience();
  renderEducation();
  runStockOptimization();
}

function toggleAudio() {
  isAudioEnabled = !isAudioEnabled;
  const audioBtn = document.getElementById('audioToggle');
  
  if (isAudioEnabled) {
    audioBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
    setTimeout(playClickSound, 100);
  } else {
    audioBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
  }
}

// --- DATABASE LOAD ENGINE ---
function loadAllData() {
  // Helper to check fetch success, fallback on fail
  fetch('data/projects.json')
    .then(r => r.json())
    .then(data => {
      database.projects = data;
      renderProjects();
    })
    .catch(() => {
      console.warn("Using projects fallback local database due to offline/CORS security");
      renderProjects();
    });

  fetch('data/certificates.json')
    .then(r => r.json())
    .then(data => {
      database.certificates = data;
      renderCertificates();
    })
    .catch(() => {
      console.warn("Using certificates fallback local database");
      renderCertificates();
    });

  fetch('data/experience.json')
    .then(r => r.json())
    .then(data => {
      database.experience = data;
      renderExperience();
    })
    .catch(() => {
      console.warn("Using experience fallback");
      renderExperience();
    });

  fetch('data/education.json')
    .then(r => r.json())
    .then(data => {
      database.education = data;
      renderEducation();
    })
    .catch(() => {
      console.warn("Using education fallback");
      renderEducation();
    });
}

// --- RENDER PROJECTS GRID ---
function renderProjects() {
  const container = document.getElementById('projectsContainer');
  if (!container) return;
  
  container.innerHTML = '';
  
  database.projects.forEach((proj, idx) => {
    const title = proj[`title_${activeLanguage}`] || proj.title_id;
    const subtitle = proj[`subtitle_${activeLanguage}`] || proj.subtitle_id;
    const desc = proj[`description_${activeLanguage}`] || proj.description_id;
    const arch = proj[`architecture_${activeLanguage}`] || proj.architecture_id;
    const gridId = `git-stats-${proj.id}`;

    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
      <span class="project-card-subtitle">${subtitle}</span>
      <h3 class="project-card-title">${title}</h3>
      <p class="project-card-desc">${desc}</p>
      
      <h4 class="project-card-section-title">${activeLanguage === 'id' ? 'Arsitektur Teknis' : 'Technical Architecture'}</h4>
      <p class="project-card-desc" style="font-style:normal; font-size:11px;">${arch}</p>
      
      <h4 class="project-card-section-title">Tools & Frameworks</h4>
      <div class="project-card-tools">
        ${proj.tools.map(t => `<span class="project-card-badge">${t}</span>`).join('')}
      </div>
      
      <!-- Live GitHub Stars -->
      <div class="project-card-github-stats" id="${gridId}" style="display:none;">
        <span><i class="fa-solid fa-star"></i> <span class="stars-val">0</span> Stars</span>
        <span><i class="fa-solid fa-code-fork"></i> <span class="forks-val">0</span> Forks</span>
        <span><i class="fa-solid fa-code"></i> <span class="lang-val">Code</span></span>
      </div>
      
      <div class="project-card-actions">
        ${proj.github_repo ? `<a href="https://github.com/${proj.github_repo}" target="_blank" class="project-card-btn repo" onclick="playClickSound()"><i class="fa-brands fa-github"></i> GitHub</a>` : ''}
        ${proj.demo_url ? `<a href="${proj.demo_url}" target="_blank" class="project-card-btn demo" onclick="playClickSound()"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo</a>` : ''}
      </div>
    `;
    container.appendChild(card);

    // Fetch Stars
    if (proj.github_repo) {
      fetchGitHubStatsForCard(proj.github_repo, gridId);
    }
  });
}

function fetchGitHubStatsForCard(repoPath, elementId) {
  fetch(`https://api.github.com/repos/${repoPath}`)
    .then(r => {
      if (!r.ok) throw new Error("Limit");
      return r.json();
    })
    .then(data => {
      const statsNode = document.getElementById(elementId);
      if (!statsNode) return;
      statsNode.querySelector('.stars-val').innerText = data.stargazers_count;
      statsNode.querySelector('.forks-val').innerText = data.forks_count;
      statsNode.querySelector('.lang-val').innerText = data.language || "Python";
      statsNode.style.display = 'flex';
    })
    .catch(() => {});
}

// --- RENDER CERTIFICATIONS ACCORDION ---
let activeCertFilter = 'All';

function renderCertificates() {
  const container = document.getElementById('certsAccordionGrid');
  if (!container) return;
  
  container.innerHTML = '';
  
  // Filter certificates
  const filtered = database.certificates.filter(c => {
    if (activeCertFilter === 'All') return true;
    return c.category === activeCertFilter;
  });

  // Sort: featured items first
  filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
  
  filtered.forEach((cert, idx) => {
    const title = cert[`title_${activeLanguage}`] || cert.title_id;
    const desc = cert[`description_${activeLanguage}`] || cert.description_id;
    const catClass = getCategoryClass(cert.category);
    const cardId = `cert-card-${cert.id}`;

    const card = document.createElement('div');
    card.className = `cert-card-new ${catClass}`;
    card.id = cardId;
    card.innerHTML = `
      <div class="cert-card-header-new">
        <div class="cert-card-meta-row-new">
          <span class="cert-card-issuer-new">${cert.issuer}</span>
          <span class="cert-card-date-new">${cert.issue_date}</span>
        </div>
        <h3 class="cert-card-title-new">
          ${title}
          ${cert.isFeatured ? `<span class="featured-tag">Featured</span>` : ''}
        </h3>
      </div>
      
      <div class="cert-card-body-new">
        <p class="cert-card-desc-new">${desc}</p>
        
        <div class="cert-card-ids-row-new">
          <div class="cert-card-id-item-new">
            <span class="cert-card-id-label-new">ID Kredensial</span>
            <span class="cert-card-id-val-new">${cert.credential_id || 'N/A'}</span>
          </div>
          <div class="cert-card-id-item-new">
            <span class="cert-card-id-label-new">${activeLanguage === 'id' ? 'Masa Berlaku' : 'Validity'}</span>
            <span class="cert-card-id-val-new">${cert.expiry_date || (activeLanguage === 'id' ? 'Selamanya' : 'Lifetime')}</span>
          </div>
        </div>
      </div>
      
      <div class="cert-card-footer-new">
        <button class="btn-cert-action file" onclick="openCertificateFile('${cert.file_url}')">
          <i class="fa-solid fa-file-pdf"></i> <span>${activeLanguage === 'id' ? 'Lihat Berkas' : 'View PDF'}</span>
        </button>
        ${cert.verification_url ? `
          <a href="${cert.verification_url}" target="_blank" class="btn-cert-action verify" onclick="playClickSound()">
            <i class="fa-solid fa-shield-halved"></i> <span>${activeLanguage === 'id' ? 'Verifikasi' : 'Verify'}</span>
          </a>
        ` : ''}
      </div>
    `;
    container.appendChild(card);
  });

  // Render indicators dots
  renderCarouselDots(filtered.length);

  // Reset scroll pos
  container.scrollLeft = 0;

  // Restart auto-scroll
  startCertAutoScroll();
}

// --- CAROUSEL NAVIGATION CONTROLLERS ---
let certAutoScrollInterval = null;

function renderCarouselDots(count) {
  const dotsContainer = document.getElementById('certsCarouselDots');
  if (!dotsContainer) return;
  dotsContainer.innerHTML = '';
  
  for (let i = 0; i < count; i++) {
    const dot = document.createElement('span');
    dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
    dot.onclick = () => {
      stopCertAutoScroll();
      scrollCertToCard(i);
      startCertAutoScroll();
    };
    dotsContainer.appendChild(dot);
  }
}

function scrollCertToCard(index) {
  const container = document.getElementById('certsAccordionGrid');
  if (!container) return;
  const cards = container.querySelectorAll('.cert-card-new');
  if (cards.length > index && index >= 0) {
    const card = cards[index];
    container.scrollTo({
      left: card.offsetLeft - container.offsetLeft,
      behavior: 'smooth'
    });
  }
}

function scrollCertificates(direction) {
  playClickSound();
  stopCertAutoScroll();
  const container = document.getElementById('certsAccordionGrid');
  if (!container) return;
  const cardWidth = 360; // Card Flex-basis (340px) + Gap (20px)
  container.scrollBy({
    left: direction * cardWidth,
    behavior: 'smooth'
  });
  setTimeout(updateCarouselDots, 350);
  startCertAutoScroll();
}

function updateCarouselDots() {
  const container = document.getElementById('certsAccordionGrid');
  const dotsContainer = document.getElementById('certsCarouselDots');
  if (!container || !dotsContainer) return;
  
  const cards = container.querySelectorAll('.cert-card-new');
  const dots = dotsContainer.querySelectorAll('.carousel-dot');
  if (cards.length === 0 || dots.length === 0) return;
  
  const scrollLeft = container.scrollLeft;
  const containerCenter = scrollLeft + container.clientWidth / 2;
  
  let activeIndex = 0;
  let minDistance = Infinity;
  
  cards.forEach((card, index) => {
    const cardCenter = card.offsetLeft + card.clientWidth / 2;
    const distance = Math.abs(containerCenter - cardCenter);
    if (distance < minDistance) {
      minDistance = distance;
      activeIndex = index;
    }
  });
  
  dots.forEach((dot, index) => {
    dot.classList.remove('active');
    if (index === activeIndex) {
      dot.classList.add('active');
    }
  });
}

function startCertAutoScroll() {
  stopCertAutoScroll();
  certAutoScrollInterval = setInterval(() => {
    const container = document.getElementById('certsAccordionGrid');
    if (!container) return;
    const maxScroll = container.scrollWidth - container.clientWidth;
    if (container.scrollLeft >= maxScroll - 20) {
      container.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: 360, behavior: 'smooth' });
    }
    setTimeout(updateCarouselDots, 350);
  }, 4000);
}

function stopCertAutoScroll() {
  if (certAutoScrollInterval) {
    clearInterval(certAutoScrollInterval);
  }
}

function setupCertCarouselListeners() {
  const container = document.getElementById('certsAccordionGrid');
  if (!container) return;
  container.addEventListener('mouseenter', stopCertAutoScroll);
  container.addEventListener('mouseleave', startCertAutoScroll);
  container.addEventListener('scroll', updateCarouselDots);
}

// --- SCROLLSPY ACTIVE LINK HIGHLIGHTER ---
function setupScrollSpy() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.header-nav a');
  
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 120; // Offset threshold header height
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

function getCategoryClass(cat) {
  switch (cat) {
    case 'AI & Deep Learning': return 'cat-ai';
    case 'Data Science': return 'cat-ds';
    case 'Cyber Security & DevOps': return 'cat-cyber';
    case 'Software Engineering & Management': return 'cat-soft';
    default: return 'cat-general';
  }
}

function filterCerts(category) {
  playClickSound();
  activeCertFilter = category;
  
  // Toggle tab buttons
  document.querySelectorAll('.certs-filters .cert-tab-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.innerText === category || (category === 'All' && btn.getAttribute('data-key') === 'cat_all')) {
      btn.classList.add('active');
    }
  });
  
  renderCertificates();
}

function toggleAccordion(cardId) {
  playClickSound();
  const card = document.getElementById(cardId);
  const isExpanded = card.classList.contains('expanded');
  
  // Close all other accordions first
  document.querySelectorAll('.cert-accordion-card').forEach(el => {
    el.classList.remove('expanded');
  });
  
  // Toggle current accordion
  if (!isExpanded) {
    card.classList.add('expanded');
  }
}

function openCertificateFile(filePath) {
  playClickSound();
  if (filePath) {
    window.open(filePath, '_blank');
  } else {
    showAlert(
      activeLanguage === 'id' ? "Berkas Tidak Ditemukan" : "File Not Found",
      activeLanguage === 'id' ? 
        "Berkas sertifikat fisik belum diunggah. Silakan gunakan tombol Verifikasi Online untuk memeriksa kredensial asli." :
        "Physical certificate file has not been uploaded yet. Please use the Online Verification button to view credentials."
    );
  }
}

// --- RENDER EXPERIENCE TIMELINE ---
function renderExperience() {
  const container = document.getElementById('experienceTimeline');
  if (!container) return;
  
  container.innerHTML = '';
  
  database.experience.forEach(exp => {
    const role = exp[`role_${activeLanguage}`];
    const period = exp[`period_${activeLanguage}`];
    const location = exp[`location_${activeLanguage}`];
    const bulletPoints = exp[`responsibilities_${activeLanguage}`];
    
    const div = document.createElement('div');
    div.className = 'timeline-item';
    div.innerHTML = `
      <div class="timeline-dot"></div>
      <h3 class="timeline-company">${exp.company}</h3>
      <h4 class="timeline-role">${role}</h4>
      <div class="timeline-meta">
        <span><i class="fa-regular fa-calendar"></i> ${period}</span>
        <span><i class="fa-solid fa-location-dot"></i> ${location}</span>
      </div>
      <ul class="timeline-list">
        ${bulletPoints.map(p => `<li>${p}</li>`).join('')}
      </ul>
    `;
    container.appendChild(div);
  });
}

// --- RENDER EDUCATION SECTION ---
function renderEducation() {
  const container = document.getElementById('educationContainer');
  if (!container) return;
  
  container.innerHTML = '';
  
  database.education.forEach(edu => {
    const inst = edu[`institution_${activeLanguage}`] || edu.institution_id;
    const degree = edu[`degree_${activeLanguage}`] || edu.degree_id;
    const honors = edu[`honors_${activeLanguage}`] || edu.honors_id;
    const thesis = edu[`thesis_title_${activeLanguage}`] || edu.thesis_title_id;
    
    // Group courses by semester
    const semesters = {};
    edu.core_courses.forEach(c => {
      const sem = c.semester || 4;
      if (!semesters[sem]) {
        semesters[sem] = [];
      }
      semesters[sem].push(c);
    });
    
    // Sort semesters ascending
    const sortedSemesters = Object.keys(semesters).sort((a, b) => a - b);
    
    const div = document.createElement('div');
    div.className = 'edu-block';
    
    let semesterAccordionHTML = '<div class="semester-list">';
    sortedSemesters.forEach((sem, sIdx) => {
      const courses = semesters[sem];
      const semTitle = activeLanguage === 'id' ? `Semester ${sem}` : `Semester ${sem}`;
      const courseCountText = activeLanguage === 'id' ? `${courses.length} Mata Kuliah` : `${courses.length} Courses`;
      
      semesterAccordionHTML += `
        <div class="semester-item ${sIdx === 0 ? 'expanded' : ''}" id="semester-item-${sem}">
          <div class="semester-header" onclick="toggleSemester(${sem})">
            <span class="semester-title">
              <i class="fa-solid fa-graduation-cap"></i> ${semTitle}
              <span class="semester-badge">${courseCountText}</span>
            </span>
            <span class="semester-right">
              <i class="fa-solid fa-chevron-right"></i>
            </span>
          </div>
          <div class="semester-content" id="semester-content-${sem}">
            <div class="semester-courses-list">
              ${courses.map(c => {
                const cName = c[`course_${activeLanguage}`] || c.course_id;
                const creditsText = activeLanguage === 'id' ? `${c.credits} SKS` : `${c.credits} Credits`;
                return `
                  <div class="semester-course-card">
                    <span class="semester-course-name">${cName}</span>
                    <div class="semester-course-meta">
                      <span class="semester-course-credits">${creditsText}</span>
                      <span class="semester-course-grade">${c.grade}</span>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>
      `;
    });
    semesterAccordionHTML += '</div>';

    div.innerHTML = `
      <h3 class="edu-institution">${inst}</h3>
      <h4 class="edu-degree">${degree}</h4>
      <div class="edu-meta">
        <span><i class="fa-regular fa-calendar"></i> ${edu.period}</span> &nbsp;|&nbsp; 
        <span><strong>GPA:</strong> ${edu.gpa} (${honors})</span>
      </div>
      <p class="edu-thesis"><strong>${activeLanguage === 'id' ? 'Tugas Akhir' : 'Final Thesis'}:</strong> "${thesis}"</p>
      
      <div class="edu-transcript-box-wrapper">
        <h4 style="font-family:'Outfit', sans-serif; font-size:12px; font-weight:700; text-transform:uppercase; color:var(--text-main); margin-top:10px; margin-bottom:10px;">
          ${activeLanguage === 'id' ? 'Transkrip Nilai Unggulan (Nilai A/AB)' : 'Outstanding Coursework (Grades A/AB)'}
        </h4>
        ${semesterAccordionHTML}
      </div>
      
      <div class="edu-btn-row">
        <a href="assets/documents/Transkrip_Nilai.pdf" target="_blank" class="btn-primary-ios" style="display:inline-flex; width:auto; text-decoration:none; align-items:center; gap:8px;">
          <i class="fa-solid fa-file-pdf"></i> <span>${activeLanguage === 'id' ? 'Lihat Transkrip PDF Asli' : 'View Original Transcript PDF'}</span>
        </a>
      </div>
    `;
    container.appendChild(div);
  });
}

function toggleSemester(semNum) {
  playClickSound();
  const el = document.getElementById(`semester-item-${semNum}`);
  if (!el) return;
  const isExpanded = el.classList.contains('expanded');
  
  // Collapse all other semesters
  document.querySelectorAll('.semester-item').forEach(item => {
    item.classList.remove('expanded');
  });
  
  // Toggle current semester
  if (!isExpanded) {
    el.classList.add('expanded');
  }
}

// --- LAB TAB SWITCHER CONTROLLER ---
function switchLabTab(tab) {
  playClickSound();
  document.getElementById('btnTabStock').classList.remove('active');
  document.getElementById('btnTabWaste').classList.remove('active');
  document.getElementById('contentStock').classList.remove('active');
  document.getElementById('contentWaste').classList.remove('active');

  if (tab === 'stock') {
    document.getElementById('btnTabStock').classList.add('active');
    document.getElementById('contentStock').classList.add('active');
  } else {
    document.getElementById('btnTabWaste').classList.add('active');
    document.getElementById('contentWaste').classList.add('active');
  }
}

// --- STOCK PORTFOLIO OPTIMIZATION SIMULATOR LOGIC ---
const stockMeta = {
  BBCA: { name: "Bank Central Asia", price: 10200, color: "#007AFF" },
  BBRI: { name: "Bank Rakyat Indonesia", price: 4800, color: "#af52de" },
  TLKM: { name: "Telkom Indonesia", price: 3600, color: "#ff3b30" },
  ASII: { name: "Astra International", price: 5100, color: "#34c759" }
};

function setSimulatedTrend(trend) {
  playClickSound();
  simulatedTrend = trend;
  
  document.getElementById('trendBullish').classList.remove('active');
  document.getElementById('trendBearish').classList.remove('active');
  document.getElementById('trendSideways').classList.remove('active');
  
  document.getElementById(`trend${trend}`).classList.add('active');
  
  runStockOptimization();
}

function runStockOptimization() {
  const capital = parseFloat(document.getElementById('stockCapital').value) || 10000000;
  const selectMethod = document.getElementById('stockMethod').value;
  
  let chosenMethod = selectMethod;
  
  if (selectMethod === 'ALL') {
    if (simulatedTrend === 'Bullish') chosenMethod = 'SIM';
    else if (simulatedTrend === 'Bearish') chosenMethod = 'CAPM';
    else chosenMethod = 'MVEP';
  }
  
  let rawWeights = {};
  let rationale = "";
  let geminiInterpretation = "";
  
  if (chosenMethod === 'SIM') {
    rawWeights = { BBCA: 45, BBRI: 25, TLKM: 15, ASII: 15 };
    if (activeLanguage === 'id') {
      rationale = `<strong>Decision Engine:</strong> Pasar IHSG <strong>Bullish (Optimis)</strong>. Sistem secara otomatis memilih metode <strong>Single Index Model (SIM)</strong> guna memaksimalkan return portofolio pada emiten LQ45.`;
      geminiInterpretation = "IHSG terindikasi kuat berada di fase tren Bullish jangka pendek. Alokasi modal didominasi oleh perbankan besar BBCA dan BBRI sebagai penyerap keuntungan pasar utama. Model SIM menyelaraskan korelasi emiten secara sistematis untuk Sharpe Ratio tertinggi.";
    } else {
      rationale = `<strong>Decision Engine:</strong> IHSG Market detected as <strong>Bullish</strong>. The system selects <strong>Single Index Model (SIM)</strong> to focus capital on growth-momentum assets.`;
      geminiInterpretation = "Given the Bullish index index trend, the MPT-SIM model relocates weights to banking drivers. Beta structures are balanced to extract alpha gains with a predicted 14.5% annual yield.";
    }
  } else if (chosenMethod === 'CAPM') {
    rawWeights = { BBCA: 65, BBRI: 15, TLKM: 10, ASII: 10 };
    if (activeLanguage === 'id') {
      rationale = `<strong>Decision Engine:</strong> Pasar IHSG <strong>Bearish (Menurun)</strong>. Sistem memilih metode <strong>CAPM</strong> untuk menempatkan sebagian besar modal pada emiten defensif (BBCA) guna meredam resiko pasar.`;
      geminiInterpretation = "Mengantisipasi penurunan bursa (Bearish), model CAPM mengalokasikan bobot terbesar ke BBCA karena tingkat sensitivitas (Beta 0.72) yang rendah terhadap pergerakan pasar. Meminimalisir drawdown portofolio.";
    } else {
      rationale = `<strong>Decision Engine:</strong> IHSG Market detected as <strong>Bearish</strong>. The system selects <strong>CAPM</strong> to allocate capital heavily into defensive shares (BBCA) to preserve assets.`;
      geminiInterpretation = "To survive a Bearish downturn, the CAPM engine weights BBCA heavily. Low-Beta exposure ensures optimal downside protection while maintaining a presence in defensive blue-chip stocks.";
    }
  } else {
    rawWeights = { BBCA: 35, BBRI: 35, TLKM: 20, ASII: 10 };
    if (activeLanguage === 'id') {
      rationale = `<strong>Decision Engine:</strong> Pasar IHSG <strong>Sideways (Datar)</strong>. Sistem memilih metode <strong>MVEP</strong> untuk menyeimbangkan bobot guna meredam volatilitas fluktuasi risiko portfolio.`;
      geminiInterpretation = "Dalam bursa Sideways (konsolidasi), model MVEP (Mean-Variance Efficient Portfolio) menghitung limit kovarians risiko terkecil. BBCA dan BBRI dibagi secara setara untuk kestabilan korelasi return harian.";
    } else {
      rationale = `<strong>Decision Engine:</strong> IHSG Market detected as <strong>Sideways</strong>. The system selects <strong>MVEP</strong> to minimize portfolio risk variance dynamically.`;
      geminiInterpretation = "A Sideways consolidation pattern triggers the MVEP (Markowitz variance limit). Banking engines are equalized, optimizing Sharpe risk trade-offs on low volatility margins.";
    }
  }

  // Filter weights by activeEmitens and normalize to 100%
  let activeWeights = {};
  let activeSum = 0;
  
  activeEmitens.forEach(ticker => {
    if (rawWeights[ticker] !== undefined) {
      activeWeights[ticker] = rawWeights[ticker];
      activeSum += rawWeights[ticker];
    }
  });

  let finalWeights = {};
  if (activeSum > 0) {
    let checkSum = 0;
    let keys = Object.keys(activeWeights);
    
    keys.forEach((ticker, idx) => {
      if (idx === keys.length - 1) {
        // Last element gets the remainder to ensure exact 100%
        finalWeights[ticker] = 100 - checkSum;
      } else {
        const normalized = Math.round((activeWeights[ticker] / activeSum) * 100);
        finalWeights[ticker] = normalized;
        checkSum += normalized;
      }
    });
  } else {
    // Fallback if none are selected (though UI shouldn't allow it)
    finalWeights = { BBCA: 100 };
  }

  document.getElementById('decisionEngineResponse').innerHTML = rationale;
  document.getElementById('geminiNaratif').innerText = geminiInterpretation;

  const tbody = document.getElementById('lotTableBody');
  tbody.innerHTML = '';
  
  let legendData = [];
  
  Object.keys(finalWeights).forEach(ticker => {
    const meta = stockMeta[ticker];
    const weightVal = finalWeights[ticker];
    
    const targetNominal = capital * (weightVal / 100);
    const rawShares = targetNominal / meta.price;
    const finalLots = Math.floor(rawShares / 100);
    const finalShares = finalLots * 100;
    const finalSpent = finalShares * meta.price;
    
    legendData.push({ ticker: ticker, weight: weightVal, color: meta.color });

    const row = document.createElement('tr');
    row.innerHTML = `
      <td><span style="border-bottom: 2px solid ${meta.color}; font-weight:700;">${ticker}</span></td>
      <td>Rp ${meta.price.toLocaleString('id-ID')}</td>
      <td>${weightVal}%</td>
      <td>${finalShares.toLocaleString('id-ID')}</td>
      <td><strong>${finalLots}</strong></td>
      <td>Rp ${finalSpent.toLocaleString('id-ID')}</td>
    `;
    tbody.appendChild(row);
  });

  renderAllocationPie(legendData);
  renderLegend(legendData);
}

function toggleEmiten(el, ticker) {
  playClickSound();
  
  const isCurrentlyActive = activeEmitens.includes(ticker);
  
  if (isCurrentlyActive) {
    if (activeEmitens.length <= 1) {
      showAlert(
        activeLanguage === 'id' ? "Pemberitahuan" : "Notification",
        activeLanguage === 'id' ? "Anda harus memilih setidaknya satu emiten saham!" : "You must select at least one stock emiten!"
      );
      return;
    }
    activeEmitens = activeEmitens.filter(x => x !== ticker);
    el.classList.remove('active');
  } else {
    activeEmitens.push(ticker);
    el.classList.add('active');
  }
  
  runStockOptimization();
}

function showGpaDetail() {
  playClickSound();
  showAlert(
    activeLanguage === 'id' ? "Prestasi Akademik Galih" : "Galih's Academic Achievement",
    activeLanguage === 'id' ? 
      "Galih Putra Pratama lulus dari Universitas Dian Nuswantoro (UDINUS) dengan IPK 3.72/4.00 (Cumlaude). Seluruh mata kuliah unggulan di bidang AI, Deep Learning, Pemrosesan Bahasa Alami, dan Computer Vision diselesaikan dengan nilai A." :
      "Galih Putra Pratama graduated from Dian Nuswantoro University (UDINUS) with a Cumulative GPA of 3.72/4.00 (Cumlaude). All core advanced subjects in AI, Deep Learning, Natural Language Processing, and Computer Vision were passed with Grade A."
  );
}

function showCertsDetail() {
  playClickSound();
  showAlert(
    activeLanguage === 'id' ? "Kredensial Profesional Diverifikasi" : "Verified Professional Credentials",
    activeLanguage === 'id' ? 
      "Memiliki 18 sertifikasi profesional nasional dan internasional yang mencakup bidang Data Science, AI, dan Software Engineering, termasuk sertifikasi Associate Data Scientist dari BNSP Indonesia, pengembang Deep Learning tingkat mahir dari Dicoding, keamanan sistem informasi dari IBM, serta AWS Cloud Practitioner." :
      "Holds 18 professional credentials and certifications including Associate Data Scientist from BNSP Indonesia, advanced Deep Learning developer from Dicoding, cybersecurity simulation from IBM, and AWS Cloud Practitioner."
  );
}

function renderAllocationPie(segments) {
  const svg = document.getElementById('allocationPieChart');
  svg.innerHTML = '';
  
  let accumulatedAngle = 0;
  const cx = 110, cy = 110, r = 75;
  
  segments.forEach(seg => {
    const percentage = seg.weight;
    const angle = (percentage / 100) * 360;
    
    const startAngle = accumulatedAngle;
    const endAngle = accumulatedAngle + angle;
    
    const x1 = cx + r * Math.cos((startAngle - 90) * Math.PI / 180);
    const y1 = cy + r * Math.sin((startAngle - 90) * Math.PI / 180);
    const x2 = cx + r * Math.cos((endAngle - 90) * Math.PI / 180);
    const y2 = cy + r * Math.sin((endAngle - 90) * Math.PI / 180);
    
    const largeArc = angle > 180 ? 1 : 0;
    
    const pathData = `
      M ${cx} ${cy}
      L ${x1} ${y1}
      A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}
      Z
    `;
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathData);
    path.setAttribute('fill', seg.color);
    path.setAttribute('stroke', '#ffffff');
    path.setAttribute('stroke-width', '2');
    
    svg.appendChild(path);
    
    accumulatedAngle += angle;
  });
  
  // Overlay small inner circle for Donut effect
  const innerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  innerCircle.setAttribute('cx', cx);
  innerCircle.setAttribute('cy', cy);
  innerCircle.setAttribute('r', '40');
  innerCircle.setAttribute('fill', '#ffffff');
  svg.appendChild(innerCircle);
}

function renderLegend(segments) {
  const legend = document.getElementById('allocationLegend');
  legend.innerHTML = '';
  
  segments.forEach(seg => {
    const item = document.createElement('div');
    item.className = 'legend-item';
    item.innerHTML = `
      <span class="legend-color" style="background:${seg.color}"></span>
      <span>${seg.ticker} (${seg.weight}%)</span>
    `;
    legend.appendChild(item);
  });
}

// --- WASTE CLASSIFIER SIMULATOR LOGIC ---
function setupWasteDropzone() {
  const dropzone = document.getElementById('wasteDropzone');
  
  dropzone.addEventListener('click', () => {
    document.getElementById('wasteFileInput').click();
  });
  
  dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.style.borderColor = 'var(--primary-color)';
    dropzone.style.background = 'rgba(0, 122, 255, 0.03)';
  });
  
  dropzone.addEventListener('dragleave', () => {
    dropzone.style.borderColor = 'var(--border-color)';
    dropzone.style.background = 'var(--bg-secondary)';
  });
  
  dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.style.borderColor = 'var(--border-color)';
    dropzone.style.background = 'var(--bg-secondary)';
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processUploadedWasteImage(files[0]);
    }
  });
}

function handleWasteUpload(event) {
  const file = event.target.files[0];
  if (file) {
    processUploadedWasteImage(file);
  }
}

function processUploadedWasteImage(file) {
  playClickSound();
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = document.getElementById('wasteImagePreview');
    img.src = e.target.result;
    img.style.display = 'block';
    document.querySelector('.scanner-placeholder').style.display = 'none';
  };
  reader.readAsDataURL(file);

  // Send real file data to Hugging Face space backend API
  const formData = new FormData();
  formData.append("image", file);
  runWasteClassificationPipeline(formData);
}

function runWasteClassifierSample(sampleType) {
  playClickSound();
  const img = document.getElementById('wasteImagePreview');
  
  let url = '';
  if (sampleType === 'plastic') {
    url = 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&q=80&w=300';
  } else {
    url = 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=300';
  }
  
  img.src = url;
  img.style.display = 'block';
  document.querySelector('.scanner-placeholder').style.display = 'none';
  
  // Fetch image and send to backend API
  fetch(url)
    .then(res => res.blob())
    .then(blob => {
      const file = new File([blob], `${sampleType}.jpg`, { type: "image/jpeg" });
      const formData = new FormData();
      formData.append("image", file);
      runWasteClassificationPipeline(formData);
    })
    .catch(err => {
      console.error("Error loading sample image, using offline fallback", err);
      // Online fallback fails (CORS/offline), use simulated fallback
      const mockClass = (sampleType === 'plastic') ? 'ANORGANIK' : 'ORGANIK';
      const mockConf = (sampleType === 'plastic') ? '98.9%' : '97.6%';
      runWasteClassificationPipeline(null, { mockClass, mockConf });
    });
}

function runWasteClassificationPipeline(formData, fallbackData = null) {
  document.getElementById('wasteResultBox').style.display = 'none';
  document.querySelectorAll('.pipeline-step').forEach(line => {
    line.className = 'pipeline-step';
    line.querySelector('i').className = 'fa-regular fa-circle';
  });

  const laser = document.getElementById('laserScanner');
  laser.style.display = 'block';
  laser.style.animation = 'scanLaserLine 2s infinite linear';

  let apiResult = null;
  let apiError = null;
  let animationFinished = false;

  // Animate first 3 steps on timing
  setTimeout(() => { activatePipelineStep(1); }, 400);
  setTimeout(() => { activatePipelineStep(2); }, 800);
  setTimeout(() => { activatePipelineStep(3); }, 1300);
  
  setTimeout(() => {
    animationFinished = true;
    if (apiResult || apiError || fallbackData) {
      completePipeline();
    } else {
      // API is still loading (e.g. cold start)
      const step4 = document.getElementById('step4');
      if (step4) {
        step4.querySelector('span').innerText = activeLanguage === 'id' ? 
          "Menunggu Respon API (Cold-Start)..." : 
          "Awaiting API Response (Cold-Start)...";
      }
    }
  }, 1800);

  if (fallbackData) {
    // Immediate fallback execution
    return;
  }

  // Trigger real backend classification API
  fetch('https://galihpp123-waste-classification-api.hf.space/predict', {
    method: 'POST',
    body: formData
  })
    .then(res => {
      if (!res.ok) throw new Error("API response not OK");
      return res.json();
    })
    .then(data => {
      apiResult = data;
      if (animationFinished) {
        completePipeline();
      }
    })
    .catch(err => {
      console.error("API call failed, fallback will be used", err);
      apiError = err;
      if (animationFinished) {
        completePipeline();
      }
    });

  function completePipeline() {
    laser.style.display = 'none';
    laser.style.animation = 'none';

    // Step 4 completion
    activatePipelineStep(4);
    const step4 = document.getElementById('step4');
    if (step4) {
      step4.querySelector('span').innerText = activeLanguage === 'id' ? 
        "Menerima argmax Matriks Probabilitas" : 
        "Receiving Argmax Output Slices";
    }

    const badge = document.getElementById('wasteClassBadge');
    // Reset custom styling in case it was error
    badge.style.background = '';

    if (apiResult) {
      const rawClass = apiResult.class_name ? apiResult.class_name.toUpperCase() : 'ORGANIK';
      const isOrganic = rawClass === 'ORGANIK';
      const confidence = `${(apiResult.confidence * 100).toFixed(1)}%`;

      badge.innerText = rawClass;
      if (isOrganic) {
        badge.className = 'class-badge';
        document.getElementById('wasteConfValue').innerText = confidence;
        document.getElementById('wasteAdviceText').innerText = activeLanguage === 'id' ? 
          "Buanglah ke tempat sampah organik berwarna hijau untuk diolah menjadi pupuk kompos ramah lingkungan." :
          "Dispose of this in the green organic trash bin to be composted into eco-friendly fertilizer.";
      } else {
        badge.className = 'class-badge anorganik';
        document.getElementById('wasteConfValue').innerText = confidence;
        document.getElementById('wasteAdviceText').innerText = activeLanguage === 'id' ?
          "Buanglah ke tempat sampah anorganik berwarna kuning untuk didaur ulang kembali (botol/kemasan plastik)." :
          "Dispose of this in the yellow inorganic trash bin to be recycled (plastic/packaging items).";
      }
    } else if (fallbackData) {
      const rawClass = fallbackData.mockClass;
      const confidence = fallbackData.mockConf;
      badge.innerText = rawClass;
      if (rawClass === 'ORGANIK') {
        badge.className = 'class-badge';
        document.getElementById('wasteConfValue').innerText = confidence;
        document.getElementById('wasteAdviceText').innerText = activeLanguage === 'id' ? 
          "Buanglah ke tempat sampah organik berwarna hijau untuk diolah menjadi pupuk kompos ramah lingkungan." :
          "Dispose of this in the green organic trash bin to be composted into eco-friendly fertilizer.";
      } else {
        badge.className = 'class-badge anorganik';
        document.getElementById('wasteConfValue').innerText = confidence;
        document.getElementById('wasteAdviceText').innerText = activeLanguage === 'id' ?
          "Buanglah ke tempat sampah anorganik berwarna kuning untuk didaur ulang kembali (botol/kemasan plastik)." :
          "Dispose of this in the yellow inorganic trash bin to be recycled (plastic/packaging items).";
      }
    } else {
      // Error handling
      badge.innerText = "ERROR";
      badge.className = 'class-badge';
      badge.style.background = '#ff3b30'; // Red color indicating failure
      document.getElementById('wasteConfValue').innerText = '0.0%';
      document.getElementById('wasteAdviceText').innerText = activeLanguage === 'id' ?
        "Gagal menghubungi backend API. Pastikan server aktif dan berkas gambar valid." :
        "Failed to contact the backend API. Please make sure the server is active and the image file is valid.";
    }

    document.getElementById('wasteResultBox').style.display = 'flex';
  }
}

function activatePipelineStep(stepNum) {
  const line = document.getElementById(`step${stepNum}`);
  if (!line) return;
  line.classList.add('completed');
  line.querySelector('i').className = 'fa-solid fa-circle-check';
}

// --- iOS MAIL APP SIMULATION (Compose Form) ---
function sendMailSimulated() {
  const sender = document.getElementById('mailSender').value;
  const subject = document.getElementById('mailSubject').value;
  const message = document.getElementById('mailMessage').value;

  if (!sender || !subject || !message) {
    showAlert(
      activeLanguage === 'id' ? "Validasi Formulir" : "Form Validation",
      activeLanguage === 'id' ? "Mohon lengkapi semua kolom email pengirim, subjek, dan isi pesan." : "Please fill in all fields (from, subject, message)."
    );
    return;
  }

  playWooshSound();

  const env = document.getElementById('flyingEnvelope');
  env.style.opacity = '1';
  env.style.animation = 'flyMessageBubble 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards';

  setTimeout(() => {
    document.getElementById('mailSender').value = '';
    document.getElementById('mailSubject').value = '';
    document.getElementById('mailMessage').value = '';
    env.style.opacity = '0';
    env.style.animation = 'none';

    // Copy to clipboard
    const copyText = `Dari: ${sender}\nSubjek: ${subject}\nPesan: ${message}`;
    navigator.clipboard.writeText(copyText);

    showAlert(
      activeLanguage === 'id' ? "Email Simulasi Dikirim!" : "Simulated Email Sent!",
      activeLanguage === 'id' ? 
        "Terima kasih atas pesan Anda! Detail surat Anda telah disalin otomatis ke clipboard. Silakan klik tombol di bawah untuk langsung terhubung ke email atau LinkedIn asli saya." :
        "Thank you! Your simulated message has been copied to your clipboard. Use the actions below to connect directly with my real Email or LinkedIn profile.",
      true
    );
  }, 850);
}

// --- iOS SYSTEM DIALOG OVERLAYS ---
function showAlert(title, message, showActionButtons = false) {
  document.getElementById('alertTitle').innerText = title;
  document.getElementById('alertMessage').innerText = message;
  
  const footer = document.getElementById('alertFooter');
  footer.innerHTML = '';
  
  if (showActionButtons) {
    const btnLinkedIn = document.createElement('button');
    btnLinkedIn.className = 'ios-dialog-btn';
    btnLinkedIn.innerText = 'LinkedIn';
    btnLinkedIn.onclick = () => {
      window.open('https://www.linkedin.com/in/galih-putra-pratama-8194bb255/', '_blank');
      closeAlert();
    };

    const btnMailto = document.createElement('button');
    btnMailto.className = 'ios-dialog-btn';
    btnMailto.style.background = '#34c759'; // Green accent
    btnMailto.innerText = activeLanguage === 'id' ? 'Email Asli' : 'Real Email';
    btnMailto.onclick = () => {
      window.open('mailto:galihputra9191@gmail.com', '_self');
      closeAlert();
    };

    const btnCancel = document.createElement('button');
    btnCancel.className = 'ios-dialog-btn btn-sec';
    btnCancel.innerText = activeLanguage === 'id' ? 'Tutup' : 'Close';
    btnCancel.onclick = closeAlert;

    footer.appendChild(btnLinkedIn);
    footer.appendChild(btnMailto);
    footer.appendChild(btnCancel);
  } else {
    const btnOk = document.createElement('button');
    btnOk.className = 'ios-dialog-btn';
    btnOk.innerText = 'OK';
    btnOk.onclick = closeAlert;
    footer.appendChild(btnOk);
  }
  
  document.getElementById('alertOverlay').classList.add('open');
}

function closeAlert() {
  playClickSound();
  document.getElementById('alertOverlay').classList.remove('open');
}
