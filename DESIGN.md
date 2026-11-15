# DESIGN.md - Galih Putra Pratama AI Engineering Portfolio

## 1. Identity & Brand Direction
- **Owner:** Galih Putra Pratama (AI Engineer & Deep Learning Specialist, B.Comp.Sc. Cumlaude 3.72, BNSP Associate Data Scientist).
- **Audience:** Technical Hiring Managers, Senior AI/ML Leads, and Enterprise Recruiters evaluating production AI engineering readiness within 90 seconds.
- **Core Character:** Systems-first engineering specification meets interactive layman proof. Every claim is backed by a deterministic evaluation table, an architectural pipeline, and a verifiable repository.

## 2. Antislop Three Dials
- **ENERGY: 2 (Balanced - Stripe / Linear Engineering Register)**
  - Confident typography, clear technical diagrams, and interactive case-study proof tabs without neon glow clutter.
- **RHYTHM: 3 (Varied / Asymmetric Section Compositions)**
  - Sections deliberately change composition to match their content job:
    1. *Hero:* Asymmetric 2-column split (Left: Value proposition, 3 core verified metrics, primary actions; Right: Compact identity dossier card).
    2. *Flagship Production Systems:* Full-width interactive 5-Pillar Case Study Workbench with a live switcher between **Layman Proof (10-Second Verification)** and **Engineering Spec & Evaluation Matrix (Ablation + Metrics)**.
    3. *Repository & Research Catalog:* Filterable structured engineering directory (keeping all separate module documentations intact while linking to the unified flagship systems).
    4. *Experience & Academic Research:* 2-column asymmetric timeline and peer-reviewed publication showcase (DOI verifiable).
    5. *Validated Credentials:* Top 6 flagship credentials displayed upfront with progressive disclosure for the remaining 12 foundation certificates.
    6. *Direct Engineering Contact:* Clean action bar with instant copy and direct channels.
- **MOTION: 2 (Purposeful State Transitions)**
  - Motion is used strictly to communicate tab switching (Layman vs Engineering view), modal opening/closing, and subtle scroll entry. All perpetual background blobs and decorative pulsing rings are removed (`R-19`). Full `prefers-reduced-motion: reduce` support.

## 3. Color Palette & Contrast Lock (`R-25`, `R-29`, `R-34`)
Maximum 2 core neutrals + 1 deliberate accent color across the entire page (multi-color cyan/purple/amber accents are retired to enforce visual discipline):
- **Dark Theme (Default):**
  - Base Surface (`--bg-base`): `#090b10` (Deep Carbon)
  - Elevated Surface (`--bg-elevated`): `#11151f` (Slate Carbon)
  - Card Surface (`--bg-card`): `#151a26` (Solid structured surface; glass blur is reserved solely for the sticky top navigation bar and modal backdrop per `R-10` dose cap)
  - Primary Text (`--text-main`): `#f8fafc` (Contrast ratio 18.9:1 on `--bg-base`, PASS AAA)
  - Secondary Text (`--text-secondary`): `#94a3b8` (Contrast ratio 6.7:1 on `--bg-base`, PASS AA)
  - Muted Text (`--text-muted`): `#8496ae` (Upgraded from `#64748b` to guarantee >= 4.6:1 contrast ratio on dark card surfaces, PASS AA per `R-25`)
  - Single Deliberate Accent (`--accent-primary`): `#10b981` (Emerald Precision, contrast 8.2:1 on dark surface; dark text `#06281e` on `#10b981` button background = 7.4:1, PASS AA)
- **Light Theme (`R-34` Verified):**
  - Base Surface (`--bg-base`): `#f8fafc`
  - Elevated Surface (`--bg-elevated`): `#f1f5f9`
  - Card Surface (`--bg-card`): `#ffffff`
  - Primary Text (`--text-main`): `#0f172a` (17.4:1, PASS AAA)
  - Secondary Text (`--text-secondary`): `#334155` (10.3:1, PASS AAA)
  - Muted Text (`--text-muted`): `#475569` (7.0:1, PASS AA)
  - Single Deliberate Accent (`--accent-primary`): `#047857` (Deep Emerald, contrast 5.4:1 on white, PASS AA; white text `#ffffff` on `#047857` button = 5.4:1, PASS AA)

## 4. Typography (`R-06`)
- **Sans Display & UI (`Outfit`):** Geometric precision with clean weight hierarchy (500, 600, 700, 800) suited for technical headlines and readable long-form case studies.
- **Monospace (`JetBrains Mono`):** Used exclusively for code identifiers, metric tables (`tabular-nums`), pipeline nodes, and DOI/repository references (never for large section titles).

## 5. Written Reasons for Major Design Decisions (`R-31`)
1. **Why Dark Carbon + Single Emerald Accent:** Removes the multi-colored AI template look (purple/cyan/amber) and uses Emerald strictly to direct the eye to verified evaluation metrics and primary actions.
2. **Why Interactive 5-Pillar Case Study Cards:** Recruiters and non-technical HR need immediate 10-second proof (*Layman Proof*), while senior engineers need retrieval/model ablation tables (*Engineering Matrix*). Separating them via an interactive tab prevents text walls while serving both audiences.
3. **Why Keep Separate Module Docs + Unified SmartInvest Ecosystem:** Preserves the granular documentation of the 4 SmartInvest workstreams (AI Engineering, Data Science, Fullstack, Multi-Agent) while presenting a cohesive flagship architecture upfront.
4. **Why Curate 6 Primary Certificates with Expandable Archive:** Highlights high-signal credentials (BNSP Associate Data Scientist, Advanced Deep Learning, AWS Cloud) immediately without diluting authority with introductory course certificates.
5. **Why Solid Card Surfaces Instead of Page-Wide Glassmorphism:** Enforces `R-10` dose cap; reserving `backdrop-filter` for the sticky header and modal overlay gives cards crisp contrast and faster rendering.
