# SmartInvest Unified AI Ecosystem (5-Pillar Production Spec)

> **Catatan Dokumentasi Modular:** Repositori/folder gabungan ini menyatukan arsitektur end-to-end **SmartInvest** dalam satu spesifikasi produksi terpadu, sementara dokumentasi per divisi tetap dipertahankan secara utuh dan terpisah pada:
> 1. **AI Engineering (BiLSTM + Multi-Head Attention):** `Project_1` (`smartinvest-ai` / `User-Galih/SmartInvest-App`)
> 2. **Quantitative Data Science (MVEP, SIM, CAPM):** `Project_1` (`smartinvest-ds` / `User-Galih/SmartInvest-App`)
> 3. **Fullstack Distributed Platform (React + Express + FastAPI + Supabase):** `Project_1` (`smartinvest-fs` / `User-Galih/SmartInvest-App`)
> 4. **Autonomous Multi-Agent Financial Copilot:** `Project_9_SmartInvest_Agent` (`smartinvest-agent-system` / `User-Galih/SmartInvest-Agent-BE` & `SmartInvest-Agent-UI`)

---

## 1. Fungsi Teknis (Technical Function)
Sistem menerima input modal investasi, profil risiko pengguna, serta ticker saham indeks **IHSG / LQ45 / IDX30**, lalu mengeksekusi 4 pipeline terintegrasi:
1. **Market Data & Scraper Pipeline:** Mengambil data historis 5 tahun dan sekuensial 15 hari bursa terakhir via `yfinance` dengan *dynamic browser header spoofing* serta suku bunga acuan Bank Indonesia (BI Rate) secara real-time.
2. **Deep Learning Trend Classifier (`BiLSTM + Multi-Head Attention`):** Mengekstraksi 11 indikator teknikal (RSI, MACD, Bollinger Bands, EMA, SMA, ATR, Stochastic, OBV, dll.) untuk mengklasifikasikan arah pergerakan jangka pendek ke dalam 3 kelas (*Bullish*, *Sideways*, *Bearish*).
3. **Quantitative Portfolio Optimizer (`SciPy SLSQP`):** Menghitung alokasi bobot modal optimal menggunakan *Mean-Variance Efficient Portfolio (MVEP)* untuk memaksimalkan *Sharpe Ratio*, *Single Index Model (SIM)*, dan *CAPM*.
4. **Multi-Agent Narrative & Sentiment Copilot (Google Gemini API):** Agen otonom yang menggabungkan sentimen berita korporasi IDX, sinyal teknikal BiLSTM, dan bobot kuantitatif MPT menjadi laporan rekomendasi terstruktur yang disimpan ke PostgreSQL (Supabase) dengan kebijakan rotasi *20-record FIFO*.

---

## 2. Kegunaan & Nilai Bisnis (Business Utility)
- **Masalah Nyata:** Investor ritel di Bursa Efek Indonesia sering mengalami kerugian akibat membeli saham hanya berdasarkan rumor (*FOMO*), kesulitan membaca puluhan indikator teknikal sekaligus, dan tidak tahu cara membagi porsi modal (*position sizing*) untuk meminimalkan risiko.
- **Solusi & Efisiensi:** Mengotomatiskan proses riset teknikal + perhitungan alokasi portofolio kuantitatif yang biasanya memakan waktu **2-3 jam analisis manual** di spreadsheet menjadi **< 4 detik** dalam satu layar terpadu.

---

## 3. Target Pengguna & Skenario Pemakaian (Target Audience)
- **Target Pengguna:** Investor ritel pasar modal Indonesia (fokus saham *blue-chip* LQ45 & IDX30), analis riset ekuitas junior, dan peserta edukasi pasar modal.
- **Skenario Operasional:** Pengguna membuka dashboard web sebelum jam bursa buka, memasukkan nominal modal (misal Rp 10.000.000) dan memilih saham LQ45, lalu sistem menampilkan status tren IHSG makro, sinyal *Bullish/Sideways/Bearish* tiap emiten, persentase pembagian modal, dan penjelasan naratif dari AI Copilot.

---

## 4. Indikator Sukses Orang Awam (Layman Proof of Success)
Bagaimana pengguna non-teknis langsung tahu sistem ini bekerja dengan benar dalam 10 detik:
1. **Indikator Cuaca Pasar 3-Warna (Traffic-Light Signal):** Alih-alih menampilkan angka tensor mentah, layar langsung menampilkan label tegas **Bullish (Hijau)**, **Sideways (Kuning)**, atau **Bearish (Merah)** beserta persentase keyakinan model.
2. **Simulasi Pembagian Modal Rupiah Nyata:** Jika pengguna memasukkan Rp 10.000.000 pada 4 saham, sistem langsung memecahnya ke nominal Rupiah per saham (bukan rumus matriks kovarians yang membingungkan) dan membuktikan total alokasi = 100%.
3. **Transparansi Alasan (Explainable Copilot):** Setiap rekomendasi disertai alasan yang bisa dicek silang oleh orang awam (misal: *"BBCA mendapat porsi 42% karena tren 15 hari terakhir Bullish dengan volatilitas historis paling rendah di antara kandidat"*).

---

## 5. Matriks Evaluasi Teknis & Sistem (Engineering Evaluation Matrix)

### A. Performa Model Deep Learning (Blind Test Split)
| Modul Model | Arsitektur | Input Window & Fitur | Blind Test Accuracy | Macro F1-Score | Catatan Evaluasi |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Model Analisis Emiten (LQ45/IDX30)** | `BiLSTM + Multi-Head Attention + Custom Dense` | 15 Hari x 11 Indikator Teknikal | **94.46%** | **93.00%** | Teruji stabil lintas volatilitas emiten individu (`smartinvest_best_model_3class.keras`) |
| **Model Rekomendasi IHSG (Makro)** | `BiLSTM + Multi-Head Attention + Custom Dense` | 15 Hari x 11 Indikator Teknikal | **92.64%** | **90.39%** | F1-Score kelas *Sideways* mencapai **80.00%** (`ihsg_best_model_3class.keras`) |

### B. Ablation & Metodologi Validasi Kuantitatif
- **Mengapa BiLSTM + Attention vs LSTM Standar:** Penambahan *Multi-Head Attention* di atas lapisan *Bidirectional LSTM* memungkinkan model memberi bobot lebih tinggi pada hari bursa dengan lonjakan volume/momentum ekstrem dalam jendela 15 hari, meningkatkan separasi kelas *Sideways* yang biasanya sulit dibedakan dari *Bullish/Bearish* lemah.
- **Validasi Statistik Portofolio:** Formula kuantitatif MVEP, SIM, dan CAPM telah divalidasi silang menggunakan uji statistik berpasangan (*paired t-test* via `SciPy`) pada distribusi return historis 5 tahun.
