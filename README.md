# Galih Putra Pratama - AI Engineering Portfolio & Case Study Workbench

**Live Portfolio:** [https://porto-galih-eta.vercel.app/](https://porto-galih-eta.vercel.app/)

This repository houses the interactive web portfolio (`Web_porto/`), structured project case studies (`Project/`), and design governance specifications (`DESIGN.md`) for **Galih Putra Pratama, S.Kom.** (Production AI Engineer & BNSP Associate Data Scientist).

## Key Engineering Highlights

1. **5-Pillar Production AI Blueprint (`ai-engineer-blueprint`):**
   Every flagship project in the portfolio is documented and interactive across 5 pillars:
   - **Pillar 1 (Technical Function):** Deterministic input -> processing pipeline -> structured output.
   - **Pillar 2 (Business Utility):** Quantified operational bottlenecks solved and efficiency gains.
   - **Pillar 3 (Target Persona):** Specific industry roles and deployment scenarios.
   - **Pillar 4 (Layman Proof of Success):** 10-second observable validation criteria for non-technical stakeholders.
   - **Pillar 5 (Evaluation & Ablation Matrix):** Empirical metrics (`Faithfulness`, `Recall@5`, `MAE`, `RMSE`, `Macro-F1`, `p95 Latency`) and architectural ablation comparisons.

2. **SmartInvest Unified Ecosystem + Modular Preservation:**
   - **Unified Overview:** [`Project/Project_12_SmartInvest_Ecosystem`](./Project/Project_12_SmartInvest_Ecosystem) consolidates the 4 SmartInvest workstreams (AI Engineering, LangGraph Multi-Agent, Data Science, and Fullstack Go/Next.js) into a single flagship system.
   - **Separate Module Documentation Preserved:** [`Project/Project_1`](./Project/Project_1) (`smartinvest-ai`, `smartinvest-ds`, `smartinvest-fs`) and [`Project/Project_9_SmartInvest_Agent`](./Project/Project_9_SmartInvest_Agent) remain intact and directly accessible from the portfolio UI.

3. **UI/UX Quality & Accessibility Gate (`antislop` Compliant):**
   - Documented in [`DESIGN.md`](./DESIGN.md): single deliberate Emerald accent (`#10b981` dark / `#047857` light), verified WCAG AA contrast ratios (`17.63:1` primary text, `6.93:1` secondary text), full keyboard navigation, explicit media dimensions (`R-40`), and `prefers-reduced-motion` support (`R-39`).

## Development & Build

```bash
cd Web_porto
npm install
npm run dev      # Start local Vite dev server
npm run build    # Sync Project/*/metadata.json and build production bundle
```
