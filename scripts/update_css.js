
const fs = require("fs");
const css = `/* ==========================================================================
   GALIH PUTRA PRATAMA — AI ENGINEER PORTFOLIO DESIGN SYSTEM
   High-Caliber Dark Tech Aesthetic | Anti-Slop / Production Quality
   ========================================================================== */

:root {
  /* Color Palette - Dark Tech / Obsidian & Electric Mint */
  --bg-base: #07080c;
  --bg-elevated: #0f1118;
  --bg-card: rgba(15, 18, 28, 0.72);
  --bg-card-hover: rgba(22, 27, 42, 0.85);
  --bg-glass: rgba(11, 14, 23, 0.75);
  --bg-input: rgba(18, 22, 34, 0.8);

  /* Borders & Accents */
  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-medium: rgba(255, 255, 255, 0.14);
  --border-accent: rgba(16, 185, 129, 0.35);
  --border-accent-cyan: rgba(6, 182, 212, 0.35);

  /* Accents */
  --accent-primary: #10b981;        /* Electric Emerald / Mint */
  --accent-primary-hover: #34d399;
  --accent-dim: rgba(16, 185, 129, 0.12);
  --accent-glow: rgba(16, 185, 129, 0.25);
  --accent-cyan: #06b6d4;           /* Vector / Retrieval Cyan */
  --accent-cyan-dim: rgba(6, 182, 212, 0.12);
  --accent-purple: #8b5cf6;         /* Neural Purple */
  --accent-purple-dim: rgba(139, 92, 246, 0.12);
  --accent-amber: #f59e0b;
  --accent-amber-dim: rgba(245, 158, 11, 0.12);

  /* Text Colors */
  --text-main: #f8fafc;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  --text-inverse: #07080c;

  /* Fonts */
  --font-display: "Outfit", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;

  /* Layout & Radii */
  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 22px;
  --radius-xl: 32px;
  --radius-pill: 9999px;
  --max-width: 1320px;
  --transition-smooth: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Light Theme Variables */
body.light-theme {
  --bg-base: #f8fafc;
  --bg-elevated: #f1f5f9;
  --bg-card: rgba(255, 255, 255, 0.82);
  --bg-card-hover: rgba(255, 255, 255, 0.95);
  --bg-glass: rgba(248, 250, 252, 0.85);
  --bg-input: #ffffff;

  --border-subtle: rgba(0, 0, 0, 0.08);
  --border-medium: rgba(0, 0, 0, 0.14);
  --border-accent: rgba(5, 150, 105, 0.4);
  --border-accent-cyan: rgba(8, 145, 178, 0.4);

  --accent-primary: #059669;
  --accent-primary-hover: #10b981;
  --accent-dim: rgba(5, 150, 105, 0.08);
  --accent-glow: rgba(5, 150, 105, 0.18);
  --accent-cyan: #0891b2;
  --accent-cyan-dim: rgba(8, 145, 178, 0.08);

  --text-main: #0f172a;
  --text-secondary: #475569;
  --text-muted: #64748b;
  --text-inverse: #ffffff;
}

/* Base Reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 100px;
}

body {
  font-family: var(--font-display);
  background-color: var(--bg-base);
  color: var(--text-main);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
  position: relative;
  min-height: 100vh;
}

/* Ambient Lighting Gradients */
body::before {
  content: "";
  position: fixed;
  inset: 0;
  background-image: 
    radial-gradient(circle at 18% 22%, rgba(16, 185, 129, 0.06) 0%, transparent 45%),
    radial-gradient(circle at 82% 15%, rgba(6, 182, 212, 0.05) 0%, transparent 40%),
    radial-gradient(circle at 50% 65%, rgba(139, 92, 246, 0.04) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}

/* Container */
.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 28px;
  width: 100%;
  position: relative;
  z-index: 1;
}

@media (max-width: 640px) {
  .container {
    padding: 0 16px;
  }
}

/* Section Header */
.section-header {
  margin-bottom: 48px;
}

.section-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent-primary);
  background: var(--accent-dim);
  border: 1px solid var(--border-accent);
  padding: 6px 14px;
  border-radius: var(--radius-pill);
  margin-bottom: 16px;
}

.section-tag::before {
  content: "";
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent-primary);
  box-shadow: 0 0 8px var(--accent-primary);
}

.section-title {
  font-size: clamp(2.2rem, 4vw, 3.5rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.12;
  color: var(--text-main);
  text-wrap: balance;
}

.section-subtitle {
  font-size: 1.1rem;
  color: var(--text-secondary);
  max-width: 720px;
  margin-top: 12px;
  line-height: 1.6;
}

.section-divider-line {
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, var(--border-subtle) 30%, var(--border-subtle) 70%, transparent 100%);
  margin: 80px auto;
  border: none;
}

/* ==========================================================================
   DYNAMIC ISLAND NAVIGATION
   ========================================================================== */
.dynamic-island-container {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  width: calc(100% - 32px);
  max-width: 1120px;
  pointer-events: none;
}

.dynamic-island-wrapper {
  pointer-events: auto;
  background: var(--bg-glass);
  backdrop-filter: blur(28px) saturate(190%);
  -webkit-backdrop-filter: blur(28px) saturate(190%);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-pill);
  padding: 8px 16px 8px 24px;
  box-shadow: 0 16px 36px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08);
  transition: var(--transition-smooth);
}

.island-navbar-layout {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.island-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.05rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--text-main);
  cursor: pointer;
  white-space: nowrap;
}

.island-logo-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent-primary);
  box-shadow: 0 0 10px var(--accent-primary);
}

.island-nav-links {
  display: flex;
  align-items: center;
  gap: 4px;
}

.island-nav-btn {
  background: transparent;
  border: none;
  color: var(--text-secondary);
  font-family: var(--font-display);
  font-size: 0.92rem;
  font-weight: 500;
  padding: 8px 14px;
  border-radius: var(--radius-pill);
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.island-nav-btn:hover {
  color: var(--text-main);
  background: rgba(255, 255, 255, 0.06);
}

.island-nav-btn.active {
  color: var(--text-main);
  background: rgba(255, 255, 255, 0.09);
  font-weight: 600;
  box-shadow: inset 0 0 0 1px var(--border-subtle);
}

.island-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.island-control-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-subtle);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text-secondary);
  transition: var(--transition-smooth);
}

.island-control-btn:hover {
  color: var(--text-main);
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-1px);
}

.island-control-btn.lang-btn {
  width: auto;
  padding: 0 12px;
  border-radius: var(--radius-pill);
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 600;
}

.island-github-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--accent-dim);
  border: 1px solid var(--border-accent);
  color: var(--accent-primary);
  font-family: var(--font-mono);
  font-size: 0.8rem;
  font-weight: 600;
  padding: 8px 14px;
  border-radius: var(--radius-pill);
  text-decoration: none;
  transition: var(--transition-smooth);
}

.island-github-link:hover {
  background: var(--accent-primary);
  color: var(--text-inverse);
  box-shadow: 0 0 16px var(--accent-glow);
  transform: translateY(-1px);
}

@media (max-width: 900px) {
  .island-nav-links {
    display: none;
  }
}

/* ==========================================================================
   BUTTONS & CARDS
   ========================================================================== */
.glass-card {
  background: var(--bg-card);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  box-shadow: 0 12px 30px -10px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05);
  transition: var(--transition-smooth);
}

.glass-card:hover {
  background: var(--bg-card-hover);
  border-color: var(--border-medium);
}

.primary-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: var(--accent-primary);
  color: var(--text-inverse);
  font-family: var(--font-display);
  font-size: 0.98rem;
  font-weight: 700;
  padding: 13px 26px;
  border-radius: var(--radius-pill);
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: var(--transition-smooth);
  box-shadow: 0 8px 24px -6px var(--accent-glow);
}

.primary-btn:hover {
  background: var(--accent-primary-hover);
  transform: translateY(-2px);
  box-shadow: 0 12px 30px -4px var(--accent-glow);
}

.secondary-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-main);
  font-family: var(--font-display);
  font-size: 0.98rem;
  font-weight: 600;
  padding: 13px 26px;
  border-radius: var(--radius-pill);
  border: 1px solid var(--border-subtle);
  cursor: pointer;
  text-decoration: none;
  transition: var(--transition-smooth);
}

.secondary-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--border-medium);
  transform: translateY(-2px);
}

.btn-sm {
  padding: 8px 16px;
  font-size: 0.85rem;
}

/* ==========================================================================
   HERO SECTION
   ========================================================================== */
.hero-section {
  padding-top: 140px;
  padding-bottom: 60px;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.35fr 0.85fr;
  gap: 52px;
  align-items: center;
}

@media (max-width: 1024px) {
  .hero-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}

.hero-status-pill {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: var(--accent-dim);
  border: 1px solid var(--border-accent);
  padding: 6px 16px;
  border-radius: var(--radius-pill);
  font-family: var(--font-mono);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--accent-primary);
  margin-bottom: 24px;
}

.status-pulse-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent-primary);
  position: relative;
}

.status-pulse-dot::after {
  content: "";
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 2px solid var(--accent-primary);
  animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
}

@keyframes pulse-ring {
  0% { transform: scale(0.6); opacity: 0.8; }
  100% { transform: scale(2.2); opacity: 0; }
}

.hero-title {
  font-size: clamp(2.6rem, 5vw, 4.4rem);
  font-weight: 900;
  line-height: 1.06;
  letter-spacing: -0.04em;
  color: var(--text-main);
  margin-bottom: 16px;
  text-wrap: balance;
}

.hero-title .gradient-text {
  background: linear-gradient(135deg, var(--text-main) 40%, var(--accent-primary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-role-lead {
  font-size: clamp(1.15rem, 2vw, 1.4rem);
  font-weight: 600;
  color: var(--accent-primary);
  letter-spacing: -0.01em;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.hero-bio {
  font-size: 1.1rem;
  color: var(--text-secondary);
  line-height: 1.7;
  max-width: 640px;
  margin-bottom: 32px;
}

.hero-cta-group {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 44px;
}

/* Hero Stats Bar */
.hero-stats-bar {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  padding: 24px;
  background: var(--bg-glass);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  backdrop-filter: blur(20px);
}

@media (max-width: 768px) {
  .hero-stats-bar {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-value {
  font-family: var(--font-mono);
  font-size: 1.7rem;
  font-weight: 700;
  color: var(--text-main);
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.02em;
}

.stat-value.accent {
  color: var(--accent-primary);
}

.stat-value.cyan {
  color: var(--accent-cyan);
}

.stat-label {
  font-size: 0.8rem;
  color: var(--text-muted);
  font-weight: 500;
  line-height: 1.3;
}

/* Hero Profile Card */
.hero-profile-card {
  position: relative;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border-radius: var(--radius-xl);
}

.profile-img-container {
  position: relative;
  width: 100%;
  max-width: 320px;
  aspect-ratio: 1 / 1;
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--border-subtle);
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.6);
  margin-bottom: 20px;
}

.profile-img-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.hero-profile-card:hover .profile-img-container img {
  transform: scale(1.04);
}

.profile-badge-overlay {
  position: absolute;
  bottom: 12px;
  left: 12px;
  right: 12px;
  background: rgba(11, 14, 23, 0.88);
  backdrop-filter: blur(12px);
  border: 1px solid var(--border-subtle);
  padding: 8px 14px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--text-main);
}

.profile-card-name {
  font-size: 1.35rem;
  font-weight: 700;
  margin-bottom: 4px;
}

.profile-card-role {
  font-size: 0.92rem;
  color: var(--text-secondary);
  margin-bottom: 16px;
}

.profile-tech-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
  margin-bottom: 20px;
}

.skill-chip {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-subtle);
  color: var(--text-secondary);
  padding: 4px 10px;
  border-radius: var(--radius-pill);
  transition: all 0.2s ease;
}

.skill-chip:hover {
  color: var(--text-main);
  border-color: var(--border-medium);
  background: rgba(255, 255, 255, 0.08);
}

.skill-chip.chip-primary {
  background: var(--accent-dim);
  border-color: var(--border-accent);
  color: var(--accent-primary);
}

.skill-chip.chip-cyan {
  background: var(--accent-cyan-dim);
  border-color: var(--border-accent-cyan);
  color: var(--accent-cyan);
}

/* ==========================================================================
   FEATURED AI SHOWCASE (FLAGSHIP BENTO)
   ========================================================================== */
.featured-showcase-section {
  padding: 30px 0;
}

.flagship-card {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-xl);
  border: 1px solid var(--border-accent);
  background: linear-gradient(145deg, rgba(16, 22, 34, 0.95) 0%, rgba(10, 13, 20, 0.85) 100%);
  padding: 40px;
  box-shadow: 0 20px 50px -15px rgba(0, 0, 0, 0.6), 0 0 30px -10px var(--accent-glow);
}

.flagship-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.flagship-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(90deg, rgba(16, 185, 129, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%);
  border: 1px solid var(--accent-primary);
  color: var(--accent-primary);
  font-family: var(--font-mono);
  font-size: 0.85rem;
  font-weight: 700;
  padding: 6px 16px;
  border-radius: var(--radius-pill);
}

.flagship-metric-badge {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--accent-cyan);
  background: var(--accent-cyan-dim);
  border: 1px solid var(--border-accent-cyan);
  padding: 6px 14px;
  border-radius: var(--radius-pill);
}

.flagship-title {
  font-size: clamp(1.9rem, 3.5vw, 2.6rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  margin-bottom: 12px;
  color: var(--text-main);
}

.flagship-subtitle {
  font-size: 1.12rem;
  color: var(--accent-primary);
  font-weight: 500;
  margin-bottom: 18px;
}

.flagship-description {
  font-size: 1.05rem;
  color: var(--text-secondary);
  line-height: 1.7;
  max-width: 960px;
  margin-bottom: 24px;
}

.arch-flow-preview {
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 14px 18px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  font-family: var(--font-mono);
  font-size: 0.82rem;
  color: var(--text-secondary);
}

.arch-flow-title {
  color: var(--text-muted);
  text-transform: uppercase;
  font-size: 0.72rem;
  letter-spacing: 0.05em;
  margin-right: 6px;
}

.arch-step-node {
  background: rgba(255, 255, 255, 0.06);
  padding: 4px 10px;
  border-radius: var(--radius-sm);
  color: var(--text-main);
}

.arch-step-arrow {
  color: var(--accent-primary);
  font-weight: bold;
}

.flagship-actions-row {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
  margin-top: 24px;
}

/* Secondary Feature Grid */
.secondary-feature-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-top: 28px;
}

@media (max-width: 860px) {
  .secondary-feature-grid {
    grid-template-columns: 1fr;
  }
}

.secondary-feature-card {
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* ==========================================================================
   PROJECTS MATRIX & FILTER BAR
   ========================================================================== */
.projects-section {
  padding: 60px 0;
}

.project-filter-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 36px;
}

.filter-pill {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border-subtle);
  color: var(--text-secondary);
  font-family: var(--font-display);
  font-size: 0.92rem;
  font-weight: 500;
  padding: 9px 18px;
  border-radius: var(--radius-pill);
  cursor: pointer;
  transition: var(--transition-smooth);
}

.filter-pill:hover {
  color: var(--text-main);
  background: rgba(255, 255, 255, 0.08);
  border-color: var(--border-medium);
}

.filter-pill.active {
  background: var(--text-main);
  color: var(--text-inverse);
  font-weight: 700;
  border-color: var(--text-main);
}

.projects-matrix-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(370px, 1fr));
  gap: 24px;
}

@media (max-width: 640px) {
  .projects-matrix-grid {
    grid-template-columns: 1fr;
  }
}

.project-card {
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: var(--radius-lg);
  position: relative;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease;
}

.project-card:hover {
  transform: translateY(-4px);
  border-color: var(--border-accent);
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.6), 0 0 24px -8px var(--accent-glow);
}

.p-card-top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 14px;
}

.category-tag {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 4px 10px;
  border-radius: var(--radius-pill);
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-muted);
}

.category-tag.cat-rag {
  background: var(--accent-dim);
  color: var(--accent-primary);
  border: 1px solid var(--border-accent);
}

.category-tag.cat-dl {
  background: var(--accent-cyan-dim);
  color: var(--accent-cyan);
  border: 1px solid var(--border-accent-cyan);
}

.category-tag.cat-quantum {
  background: var(--accent-purple-dim);
  color: var(--accent-purple);
  border: 1px solid rgba(139, 92, 246, 0.3);
}

.p-card-title {
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text-main);
  margin-bottom: 6px;
  line-height: 1.3;
}

.p-card-subtitle {
  font-size: 0.92rem;
  color: var(--text-secondary);
  margin-bottom: 14px;
  line-height: 1.5;
}

.p-card-metric {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--accent-primary);
  background: var(--accent-dim);
  border: 1px solid var(--border-accent);
  padding: 5px 12px;
  border-radius: var(--radius-sm);
  margin-bottom: 18px;
  display: inline-block;
  line-height: 1.4;
}

.p-card-tools {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 22px;
}

.p-card-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid var(--border-subtle);
}

.card-action-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  font-weight: 600;
  padding: 8px 14px;
  border-radius: var(--radius-pill);
  text-decoration: none;
  border: 1px solid var(--border-subtle);
  background: rgba(255, 255, 255, 0.04);
  color: var(--text-secondary);
  cursor: pointer;
  transition: var(--transition-smooth);
}

.card-action-btn:hover {
  background: rgba(255, 255, 255, 0.09);
  color: var(--text-main);
  border-color: var(--border-medium);
}

.card-action-btn.btn-github {
  background: rgba(255, 255, 255, 0.08);
  color: var(--text-main);
}

.card-action-btn.btn-demo {
  background: var(--accent-dim);
  border-color: var(--border-accent);
  color: var(--accent-primary);
}

.card-action-btn.btn-demo:hover {
  background: var(--accent-primary);
  color: var(--text-inverse);
}

/* ==========================================================================
   EXPERIENCE & EDUCATION
   ========================================================================== */
.experience-section, .education-section {
  padding: 50px 0;
}

.exp-grid {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.exp-card {
  padding: 32px;
}

.exp-card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.exp-role-title {
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--text-main);
}

.exp-company-name {
  font-size: 1.05rem;
  color: var(--accent-primary);
  font-weight: 600;
  margin-top: 4px;
}

.exp-period-badge {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--text-muted);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border-subtle);
  padding: 6px 14px;
  border-radius: var(--radius-pill);
  white-space: nowrap;
}

.exp-bullets {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 18px 0 20px;
}

.exp-bullets li {
  position: relative;
  padding-left: 22px;
  color: var(--text-secondary);
  font-size: 0.98rem;
  line-height: 1.6;
}

.exp-bullets li::before {
  content: "▹";
  position: absolute;
  left: 0;
  color: var(--accent-primary);
  font-size: 1.1rem;
}

.edu-stat-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--accent-primary);
  background: var(--accent-dim);
  border: 1px solid var(--border-accent);
  padding: 6px 16px;
  border-radius: var(--radius-pill);
}

/* ==========================================================================
   CERTIFICATIONS GRID
   ========================================================================== */
.certifications-section {
  padding: 50px 0;
}

.certs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
  gap: 18px;
}

.cert-card {
  padding: 22px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: var(--transition-smooth);
}

.cert-card:hover {
  transform: translateY(-3px);
  border-color: var(--border-accent);
  box-shadow: 0 16px 32px -12px rgba(0, 0, 0, 0.5);
}

.cert-issuer {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--accent-primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 8px;
}

.cert-title {
  font-size: 1.02rem;
  font-weight: 600;
  color: var(--text-main);
  line-height: 1.4;
  margin-bottom: 14px;
}

.cert-card-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 12px;
  border-top: 1px solid var(--border-subtle);
  font-size: 0.8rem;
  color: var(--text-muted);
}

.cert-view-action {
  color: var(--text-secondary);
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-weight: 500;
}

.cert-card:hover .cert-view-action {
  color: var(--accent-primary);
}

/* ==========================================================================
   CONTACT SECTION & FOOTER
   ========================================================================== */
.contact-section {
  padding: 70px 0 90px;
  text-align: center;
}

.contact-card-box {
  max-width: 820px;
  margin: 0 auto;
  padding: 48px 36px;
  border-radius: var(--radius-xl);
}

.contact-channels-grid {
  display: flex;
  justify-content: center;
  gap: 14px;
  flex-wrap: wrap;
  margin-top: 32px;
}

.contact-item-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 13px 26px;
  border-radius: var(--radius-pill);
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: var(--transition-smooth);
}

.app-footer-bar {
  border-top: 1px solid var(--border-subtle);
  background: var(--bg-elevated);
  padding: 28px 0;
}

.footer-layout {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
  font-size: 0.88rem;
  color: var(--text-muted);
}

.footer-system-stats {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-mono);
  font-size: 0.8rem;
}

/* ==========================================================================
   MODALS
   ========================================================================== */
.modal-overlay, .doc-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 99999;
  background: rgba(4, 6, 12, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  overflow-y: auto;
  animation: fadeIn 0.25s ease forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-content-panel {
  background: var(--bg-elevated);
  border: 1px solid var(--border-medium);
  border-radius: var(--radius-xl);
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  padding: 36px;
  box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px -10px var(--accent-glow);
  position: relative;
  animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes slideUp {
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.modal-header-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 24px;
}

.modal-close-btn {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid var(--border-subtle);
  color: var(--text-secondary);
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition-smooth);
}

.modal-close-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  color: var(--text-main);
  transform: scale(1.05);
}

.model-arch-block {
  background: rgba(0, 0, 0, 0.3);
  border-radius: var(--radius-md);
  padding: 16px 20px;
  border: 1px solid var(--border-subtle);
  margin-bottom: 12px;
}

.model-arch-block ul {
  padding-left: 20px;
  margin-top: 8px;
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.6;
}

.model-arch-block code {
  font-family: var(--font-mono);
  background: rgba(255, 255, 255, 0.08);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.85em;
  color: var(--accent-primary);
}

.doc-viewer-container {
  background: var(--bg-elevated);
  border: 1px solid var(--border-medium);
  border-radius: var(--radius-lg);
  max-width: 1000px;
  width: 100%;
  height: 88vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 30px 70px -20px rgba(0, 0, 0, 0.9);
}

.doc-viewer-header {
  padding: 14px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border-subtle);
  background: var(--bg-glass);
}

.doc-title-layout {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-mono);
  font-size: 0.9rem;
  color: var(--text-main);
}

.doc-header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.doc-header-btn {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid var(--border-subtle);
  color: var(--text-secondary);
  padding: 8px 12px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-decoration: none;
  transition: var(--transition-smooth);
}

.doc-header-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  color: var(--text-main);
}

.doc-viewer-body {
  flex: 1;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: #181920;
}

.doc-iframe-viewer {
  width: 100%;
  height: 100%;
  border: none;
}

.doc-image-viewer-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  min-height: 100%;
}

.doc-image-element {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: var(--radius-md);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}
`;

fs.writeFileSync("Web_porto/src/index.css", css, "utf8");
console.log("Web_porto/src/index.css written successfully.");
