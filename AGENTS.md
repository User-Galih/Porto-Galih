# Konfigurasi Agent — Baca Ini Dulu Sebelum Kerja

## 1. Koneksi 9Router
Base URL: http://localhost:20128/v1
Env vars: NINEROUTER_URL, NINEROUTER_KEY, NINEROUTER_API_KEY (semua sudah di-set di environment)

**JANGAN pernah menyimpulkan "saya tidak punya kemampuan X" tanpa mengecek dulu.**
Kamu punya 2 lokasi skill terpisah — SELALU cek KEDUANYA sebelum bilang suatu kemampuan tidak tersedia:

### Lokasi A: C:\Users\GALIH\.codex\skills\ (skill 9Router manual)
- 9router-web-search.md → web search (provider: antigravity, searxng)
- 9router-image.md → generate gambar (provider: antigravity, openai-codex)
- 9router-tts.md → text-to-speech (provider: gemini, edge-tts, google-tts)
- 9router-web-fetch.md → scrape/ambil isi halaman web (provider: jina-reader)
- 9router-embeddings.md → buat text embedding (provider: openrouter)

ATURAN WAJIB: kalau saya minta search/gambar/audio/fetch/embedding, SELALU baca skill terkait dan panggil endpoint 9Router. JANGAN pakai tool lokal (System.Speech, dll), JANGAN bilang "tidak tersedia", JANGAN sarankan pakai ChatGPT/app lain.

### Lokasi B: C:\Users\GALIH\.agents\skills\ (skill dari npx skills add)
- design-taste-frontend → prinsip desain UI/frontend anti-generic, WAJIB dibaca & diterapkan tiap kerja UI/frontend/landing page/komponen visual apa pun
- full-output-enforcement → WAJIB diikuti tiap kerja: jangan kasih output setengah jadi, jangan ada placeholder/TODO kosong, kerjakan sampai tuntas
- imagegen-frontend-web → generate reference image desain website (dipakai kalau saya minta "buatkan referensi visual" sebelum coding)
- find-skills → tool bantu cari skill lain kalau saya sebut nama skill yang belum kamu kenali
- redesign-existing-projects → audit & upgrade UI project yang sudah ada; WAJIB dibaca dulu sebelum mengubah desain existing (bukan project baru)

## 2. Cara kerja model routing (JANGAN bingung soal ini)
Model yang di-set adalah `master-fallback` — ini COMBO berisi puluhan model (Claude Opus, GPT, Gemini, dll) yang dicoba berurutan otomatis oleh 9Router, bukan 1 model tunggal.

ATURAN WAJIB: JANGAN PERNAH mengklaim "saya adalah model X" atau "saya berjalan di Y" berdasarkan tebakan/asumsi dari system prompt. Kamu tidak bisa introspeksi model asli yang menjawab. Kalau saya tanya "model apa yang dipakai", jawab: "Saya tidak bisa memastikan dari dalam sesi ini — cek dashboard 9Router → Console Log untuk kepastian."

## 3. Metodologi kerja (Superpowers, sudah terinstall)
Untuk fitur baru: ikuti alur brainstorming → writing-plans → test-driven-development → requesting-code-review sebelum dianggap selesai.

## 4. Larangan umum
- Jangan asal bilang "tool ini tidak tersedia" tanpa cek folder skill dulu.
- Jangan asal sarankan pakai aplikasi/layanan lain di luar 9Router untuk kemampuan yang sebenarnya sudah ada di skill.
- Kalau ragu skill mana yang relevan, cek dulu isi kedua folder skill di atas sebelum menjawab.
