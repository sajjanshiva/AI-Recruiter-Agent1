'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const HomePage = () => {

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const glowX = (mousePos.x / (typeof window !== 'undefined' ? window.innerWidth : 1)) * 100;
  const glowY = (mousePos.y / (typeof window !== 'undefined' ? window.innerHeight : 1)) * 100;

  return (
    <div style={s.root}>
      <style>{css}</style>

      <div style={{
        ...s.cursorGlow,
        background: `radial-gradient(500px at ${glowX}% ${glowY}%, rgba(0,0,0,0.03) 0%, transparent 70%)`,
      }} />

      {/* ── NAV ── */}
      <nav style={s.nav}>
        <div style={s.navInner}>
          <span style={s.logo}>HIRE<span style={s.logoDot}>.</span>AI</span>
          <div className="navLinks" style={s.navLinks}>
            {['Features', 'How It Works', 'Pricing', 'Contact'].map(l => (
              <a key={l} href="#" style={s.navLink} className="nav-link">{l}</a>
            ))}
          </div>
          <Link href="/auth">
            <button style={s.navCta} className="btn-nav">Get Started →</button>
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={s.hero}>
        <div style={s.heroBg} aria-hidden="true">HIRE</div>

        <div style={s.heroContent}>
          <div style={s.heroBadge}>
            <span style={s.heroBadgeDot} />
            AI-Powered Recruitment
          </div>

          <h1 style={s.heroH1}>
            Interviews.<br />
            <span style={s.heroH1Outline}>Automated.</span><br />
            Intelligent.
          </h1>

          <p style={s.heroP}>
            A voice-first AI recruitment assistant that conducts technical & HR interviews
            autonomously — so you can focus on what truly matters.
          </p>

          <div style={s.heroCtas}>
            <Link href="/auth">
              <button style={s.btnPrimary} className="btn-primary">Start Hiring Free</button>
            </Link>
            <button style={s.btnGhost} className="btn-ghost">
              <span style={s.playIcon}>▶</span> See a Demo
            </button>
          </div>

          <div style={s.heroStats}>
            {[['10x', 'Faster Screening'], ['100%', 'Voice Driven'], ['0', 'Recruiter Presence Needed']].map(([num, label]) => (
              <div key={num} style={s.heroStat}>
                <span style={s.heroStatNum}>{num}</span>
                <span style={s.heroStatLabel}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Floating interview card — kept dark intentionally for contrast */}
        <div style={s.heroCard} className="float-card">
          <div style={s.cardHeader}>
            <div style={s.cardDots}>
              {['#ff5f57','#ffbd2e','#28c840'].map(c => (
                <div key={c} style={{...s.cardDot, background: c}} />
              ))}
            </div>
            <span style={s.cardTitle}>Live Interview · Senior Engineer</span>
          </div>
          <div style={s.cardBody}>
            <div style={s.waveRow}>
              {[40,70,55,90,45,80,60,75,50,85,40,65].map((h, i) => (
                <div key={i} style={{...s.waveBar, height: h, animationDelay: `${i * 0.1}s`}} className="wave-bar" />
              ))}
            </div>
            <div style={s.cardQuestion}>
              "Explain the difference between REST and GraphQL in terms of data fetching efficiency..."
            </div>
            <div style={s.cardMeta}>
              <span style={s.cardBadge}>🎙 Voice Active</span>
              <span style={s.cardTimer}>02:34 elapsed</span>
            </div>
            <div style={s.cardProgress}>
              <div style={s.cardProgressFill} className="progress-fill" />
            </div>
            <div style={s.cardTags}>
              {['Technical Depth', 'Communication', 'Problem Solving'].map((tag, i) => (
                <span key={tag} style={{...s.cardTag, opacity: i === 0 ? 1 : 0.35}}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div style={s.marqueeWrapper}>
        <div style={s.marqueeTrack} className="marquee-track">
          {[...Array(3)].map((_, gi) => (
            <React.Fragment key={gi}>
              {['AI Interviews', 'Voice-First', 'Zero Setup', 'Instant Feedback', 'Custom Questions', 'Unique Links', 'No Scheduling', 'Auto Scoring'].map(t => (
                <span key={t} style={s.marqueeItem}>
                  {t} <span style={s.marqueeSep}>◆</span>
                </span>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <section style={s.section}>
        <div style={s.sectionInner}>
          <div style={s.sectionLabel}>Process</div>
          <h2 style={s.sectionH2}>Four steps.<br />Zero friction.</h2>
          <div style={s.steps}>
            {[
              { n: '01', title: 'Define the Role', desc: 'Input the job title, duration, and interview type — technical, HR, or both.' },
              { n: '02', title: 'AI Generates Questions', desc: 'Our engine crafts a tailored question set matched to the role and seniority level.' },
              { n: '03', title: 'Share the Link', desc: 'A unique interview link is generated instantly. Send it to any candidate, anywhere.' },
              { n: '04', title: 'Voice AI Takes Over', desc: 'Candidates speak naturally with our AI agent. No video. No scheduling. No bias.' },
            ].map((step, i) => (
              <div key={step.n} style={s.step} className="step-card">
                <div style={s.stepNumber}>{step.n}</div>
                <div style={s.stepContent}>
                  <h3 style={s.stepTitle}>{step.title}</h3>
                  <p style={s.stepDesc}>{step.desc}</p>
                </div>
                {i < 3 && <div style={s.stepArrow}>↓</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={s.featuresSection}>
        <div style={s.sectionInner}>
          <div style={s.sectionLabel}>Features</div>
          <h2 style={s.sectionH2}>Everything you need.<br />Nothing you don't.</h2>
          <div style={s.featuresGrid} className="featuresGrid">
            {[
              { icon: '🎙', title: 'Voice AI Agent', desc: 'Natural voice-based conversations that feel human — conducted entirely by AI, no video required.' },
              { icon: '⚡', title: 'Instant Link Generation', desc: 'Share interview links in seconds after defining the role. No calendar. No coordination.' },
              { icon: '🧠', title: 'Smart Question Engine', desc: 'Questions tailored to the exact role, domain, and experience level you specify.' },
              { icon: '📊', title: 'Detailed Feedback Reports', desc: 'Get structured candidate analysis — scores, transcripts, and AI-driven insights automatically.' },
              { icon: '🔒', title: 'Bias-Free Evaluation', desc: 'Every candidate gets the exact same interview. Consistent. Fair. Objective.' },
              { icon: '⏱', title: 'Custom Duration', desc: 'Set the interview length that works for you — from 5-minute screenings to 60-minute deep dives.' },
            ].map(f => (
              <div key={f.title} style={s.featureCard} className="feature-card">
                <div style={s.featureIcon}>{f.icon}</div>
                <h3 style={s.featureTitle}>{f.title}</h3>
                <p style={s.featureDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={s.ctaSection}>
        <div style={s.ctaInner}>
          <div style={s.ctaBgText} aria-hidden="true">GO</div>
          <div style={s.sectionLabel}>Ready?</div>
          <h2 style={s.ctaH2}>Stop sitting in interviews.<br />Let AI do it.</h2>
          <p style={s.ctaP}>
            Join thousands of recruiters who have automated their entire interview pipeline with Hire AI.
          </p>
          <Link href="/auth">
            <button style={s.btnPrimary} className="btn-primary">
              Create Your First Interview →
            </button>
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={s.footer}>
        <div style={s.footerInner}>
          <span style={s.logo}>HIRE<span style={s.logoDot}>.</span>AI</span>
          <span style={s.footerNote}>© 2025 Hire AI. Recruitment, reimagined.</span>
          <div style={s.footerLinks}>
            {['Privacy', 'Terms', 'Contact'].map(l => (
              <a key={l} href="#" style={s.footerLink} className="nav-link">{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

// ── STYLES ───────────────────────────────────────────────────────────────────

const s = {
  root: {
    minHeight: '100vh',
    background: '#ffffff',
    color: '#0a0a0a',
    fontFamily: "'DM Serif Display', Georgia, serif",
    overflowX: 'hidden',
  },
  cursorGlow: { position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 },

  // NAV
  nav: {
    position: 'sticky', top: 0, zIndex: 100,
    backdropFilter: 'blur(20px)',
    background: 'rgba(255,255,255,0.92)',
    borderBottom: '1px solid rgba(0,0,0,0.08)',
  },
  navInner: {
    maxWidth: 1200, margin: '0 auto', padding: '0 32px',
    height: 68, display: 'flex', alignItems: 'center', gap: 40,
  },
  logo: {
    fontSize: 22, fontWeight: 700, letterSpacing: '0.05em',
    fontFamily: "'DM Serif Display', Georgia, serif",
    color: '#000', marginRight: 'auto',
  },
  logoDot: { color: '#000', opacity: 0.22 },
  navLinks: { display: 'flex', gap: 32 },
  navLink: {
    fontSize: 13, fontFamily: "'DM Sans', sans-serif",
    letterSpacing: '0.04em', color: 'rgba(0,0,0,0.4)',
    textDecoration: 'none', transition: 'color 0.2s', fontWeight: 500,
  },
  navCta: {
    background: '#000', color: '#fff', border: 'none',
    padding: '9px 20px', borderRadius: 100,
    fontSize: 13, fontFamily: "'DM Sans', sans-serif",
    fontWeight: 600, cursor: 'pointer', letterSpacing: '0.02em', transition: 'all 0.2s',
  },

  // HERO
  hero: {
    position: 'relative', maxWidth: 1200, margin: '0 auto',
    padding: '100px 32px 80px',
    display: 'flex', alignItems: 'flex-start', gap: 60, minHeight: '90vh',
  },
  heroBg: {
    position: 'absolute', top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: 'clamp(180px, 25vw, 360px)', fontWeight: 900,
    color: 'rgba(0,0,0,0.04)', letterSpacing: '-0.05em',
    pointerEvents: 'none', userSelect: 'none',
    fontFamily: "'DM Serif Display', Georgia, serif", whiteSpace: 'nowrap',
  },
  heroContent: { flex: 1, position: 'relative', zIndex: 2, paddingTop: 20 },
  heroBadge: {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.09)',
    borderRadius: 100, padding: '6px 16px', fontSize: 12,
    fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.06em',
    textTransform: 'uppercase', color: 'rgba(0,0,0,0.5)', marginBottom: 28,
  },
  heroBadgeDot: {
    width: 7, height: 7, borderRadius: '50%',
    background: '#16a34a', boxShadow: '0 0 8px rgba(22,163,74,0.5)',
    display: 'inline-block',
  },
  heroH1: {
    fontSize: 'clamp(52px, 6vw, 88px)', fontWeight: 400,
    lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: 28, color: '#000',
  },
  heroH1Outline: {
    WebkitTextStroke: '2px rgba(0,0,0,0.18)', color: 'transparent',
  },
  heroP: {
    fontSize: 17, lineHeight: 1.7, color: 'rgba(0,0,0,0.45)',
    maxWidth: 480, marginBottom: 40,
    fontFamily: "'DM Sans', sans-serif", fontWeight: 400,
  },
  heroCtas: { display: 'flex', gap: 16, alignItems: 'center', marginBottom: 56 },
  btnPrimary: {
    background: '#000', color: '#fff', border: 'none',
    padding: '14px 28px', borderRadius: 100, fontSize: 15,
    fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
    cursor: 'pointer', transition: 'all 0.25s', letterSpacing: '0.01em',
  },
  btnGhost: {
    background: 'transparent', color: 'rgba(0,0,0,0.5)',
    border: '1px solid rgba(0,0,0,0.16)', padding: '13px 24px',
    borderRadius: 100, fontSize: 14,
    fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, transition: 'all 0.25s',
  },
  playIcon: {
    width: 28, height: 28, borderRadius: '50%',
    background: 'rgba(0,0,0,0.07)', display: 'inline-flex',
    alignItems: 'center', justifyContent: 'center', fontSize: 10,
  },
  heroStats: {
    display: 'flex', gap: 40, paddingTop: 24,
    borderTop: '1px solid rgba(0,0,0,0.08)',
  },
  heroStat: { display: 'flex', flexDirection: 'column', gap: 4 },
  heroStatNum: { fontSize: 28, fontWeight: 700, color: '#000', letterSpacing: '-0.02em' },
  heroStatLabel: {
    fontSize: 12, color: 'rgba(0,0,0,0.35)',
    fontFamily: "'DM Sans', sans-serif",
    letterSpacing: '0.04em', textTransform: 'uppercase',
  },

  // FLOATING CARD (dark on purpose — creates visual contrast on white page)
  heroCard: {
    width: 340, flexShrink: 0, background: '#111',
    border: '1px solid rgba(0,0,0,0.1)', borderRadius: 20, overflow: 'hidden',
    position: 'relative', zIndex: 2, marginTop: 60,
    boxShadow: '0 32px 80px rgba(0,0,0,0.13)',
  },
  cardHeader: {
    padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.07)',
    display: 'flex', alignItems: 'center', gap: 12, background: '#0d0d0d',
  },
  cardDots: { display: 'flex', gap: 6 },
  cardDot: { width: 10, height: 10, borderRadius: '50%' },
  cardTitle: {
    fontSize: 11, fontFamily: "'DM Sans', sans-serif",
    color: 'rgba(255,255,255,0.35)', letterSpacing: '0.03em',
  },
  cardBody: { padding: 20 },
  waveRow: { display: 'flex', alignItems: 'center', gap: 3, height: 60, marginBottom: 16 },
  waveBar: { width: 4, borderRadius: 4, background: '#fff', opacity: 0.7 },
  cardQuestion: {
    fontSize: 13, fontFamily: "'DM Sans', sans-serif",
    color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: 16,
    padding: '12px 14px', background: 'rgba(255,255,255,0.06)',
    borderRadius: 10, borderLeft: '2px solid rgba(255,255,255,0.2)',
  },
  cardMeta: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  cardBadge: {
    fontSize: 11, fontFamily: "'DM Sans', sans-serif",
    color: '#4ade80', background: 'rgba(74,222,128,0.1)', padding: '4px 10px', borderRadius: 100,
  },
  cardTimer: { fontSize: 12, fontFamily: "'DM Mono', monospace", color: 'rgba(255,255,255,0.25)' },
  cardProgress: {
    height: 3, background: 'rgba(255,255,255,0.08)',
    borderRadius: 100, marginBottom: 14, overflow: 'hidden',
  },
  cardProgressFill: { height: '100%', width: '42%', background: '#fff', borderRadius: 100 },
  cardTags: { display: 'flex', gap: 8, flexWrap: 'wrap' },
  cardTag: {
    fontSize: 11, fontFamily: "'DM Sans', sans-serif",
    padding: '4px 10px', borderRadius: 100,
    border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)',
  },

  // MARQUEE
  marqueeWrapper: {
    borderTop: '1px solid rgba(0,0,0,0.07)', borderBottom: '1px solid rgba(0,0,0,0.07)',
    overflow: 'hidden', padding: '14px 0', background: '#f9f9f9',
  },
  marqueeTrack: { display: 'flex', whiteSpace: 'nowrap' },
  marqueeItem: {
    fontSize: 13, fontFamily: "'DM Sans', sans-serif",
    letterSpacing: '0.08em', textTransform: 'uppercase',
    color: 'rgba(0,0,0,0.28)', padding: '0 24px',
    display: 'inline-flex', alignItems: 'center', gap: 24,
  },
  marqueeSep: { fontSize: 8, opacity: 0.3 },

  // SECTIONS
  section: { padding: '120px 0' },
  sectionInner: { maxWidth: 1200, margin: '0 auto', padding: '0 32px' },
  sectionLabel: {
    fontSize: 11, fontFamily: "'DM Sans', sans-serif",
    letterSpacing: '0.12em', textTransform: 'uppercase',
    color: 'rgba(0,0,0,0.3)', marginBottom: 20,
  },
  sectionH2: {
    fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 400,
    lineHeight: 1.1, letterSpacing: '-0.02em', color: '#000', marginBottom: 64,
  },

  // STEPS
  steps: { maxWidth: 600, display: 'flex', flexDirection: 'column' },
  step: {
    position: 'relative', display: 'flex', gap: 28,
    padding: '32px 0', borderBottom: '1px solid rgba(0,0,0,0.07)',
  },
  stepNumber: {
    fontSize: 11, fontFamily: "'DM Mono', monospace",
    color: 'rgba(0,0,0,0.2)', paddingTop: 4, minWidth: 28, letterSpacing: '0.05em',
  },
  stepContent: { flex: 1 },
  stepTitle: { fontSize: 20, fontWeight: 400, color: '#000', marginBottom: 8, letterSpacing: '-0.01em' },
  stepDesc: { fontSize: 15, fontFamily: "'DM Sans', sans-serif", color: 'rgba(0,0,0,0.45)', lineHeight: 1.6 },
  stepArrow: { position: 'absolute', left: 14, bottom: -16, color: 'rgba(0,0,0,0.13)', fontSize: 18, zIndex: 1 },

  // FEATURES
  featuresSection: {
    padding: '120px 0', background: '#f9f9f9',
    borderTop: '1px solid rgba(0,0,0,0.07)', borderBottom: '1px solid rgba(0,0,0,0.07)',
  },
  featuresGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 },
  featureCard: {
    padding: '36px 32px', border: '1px solid rgba(0,0,0,0.07)',
    background: '#fff', transition: 'background 0.25s, box-shadow 0.25s', cursor: 'default',
  },
  featureIcon: { fontSize: 28, marginBottom: 20 },
  featureTitle: { fontSize: 18, fontWeight: 400, color: '#000', marginBottom: 12, letterSpacing: '-0.01em' },
  featureDesc: { fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: 'rgba(0,0,0,0.43)', lineHeight: 1.65 },

  // CTA
  ctaSection: { padding: '140px 0', textAlign: 'center', position: 'relative', overflow: 'hidden' },
  ctaInner: { position: 'relative', zIndex: 2, maxWidth: 760, margin: '0 auto', padding: '0 32px' },
  ctaBgText: {
    position: 'absolute', top: '50%', left: '50%',
    transform: 'translate(-50%, -55%)',
    fontSize: 'clamp(200px, 30vw, 400px)', fontWeight: 900,
    color: 'rgba(0,0,0,0.03)', letterSpacing: '-0.05em',
    pointerEvents: 'none', fontFamily: "'DM Serif Display', Georgia, serif",
  },
  ctaH2: {
    fontSize: 'clamp(44px, 6vw, 80px)', fontWeight: 400,
    lineHeight: 1.1, letterSpacing: '-0.02em', color: '#000', marginBottom: 24,
  },
  ctaP: {
    fontSize: 17, fontFamily: "'DM Sans', sans-serif",
    color: 'rgba(0,0,0,0.43)', marginBottom: 48, lineHeight: 1.6,
  },

  // FOOTER
  footer: { borderTop: '1px solid rgba(0,0,0,0.08)', padding: '28px 0' },
  footerInner: {
    maxWidth: 1200, margin: '0 auto', padding: '0 32px',
    display: 'flex', alignItems: 'center', gap: 20,
  },
  footerNote: {
    flex: 1, fontSize: 13, fontFamily: "'DM Sans', sans-serif",
    color: 'rgba(0,0,0,0.25)', marginLeft: 24,
  },
  footerLinks: { display: 'flex', gap: 24 },
  footerLink: {
    fontSize: 13, fontFamily: "'DM Sans', sans-serif",
    color: 'rgba(0,0,0,0.28)', textDecoration: 'none', transition: 'color 0.2s',
  },
};

// ── CSS ───────────────────────────────────────────────────────────────────────

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  .nav-link:hover  { color: rgba(0,0,0,0.9) !important; }
  .btn-nav:hover   { background: #222 !important; transform: translateY(-1px); }

  .btn-primary:hover {
    background: #1a1a1a !important;
    transform: translateY(-2px);
    box-shadow: 0 12px 36px rgba(0,0,0,0.16);
  }

  .btn-ghost:hover {
    color: rgba(0,0,0,0.85) !important;
    border-color: rgba(0,0,0,0.35) !important;
  }

  .float-card { animation: float 6s ease-in-out infinite; }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-16px); }
  }

  .wave-bar { animation: wave 1.2s ease-in-out infinite alternate; }
  @keyframes wave {
    from { transform: scaleY(0.3); opacity: 0.4; }
    to   { transform: scaleY(1);   opacity: 0.9; }
  }

  .progress-fill { animation: progress 8s linear infinite; }
  @keyframes progress {
    from { width: 10%; }
    to   { width: 90%; }
  }

  .marquee-track { animation: marquee 28s linear infinite; }
  @keyframes marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-33.33%); }
  }

  .feature-card:hover {
    background: #f4f4f4 !important;
    box-shadow: 0 4px 24px rgba(0,0,0,0.05) !important;
  }

  @media (max-width: 900px) {
    .float-card  { display: none !important; }
    .navLinks    { display: none !important; }
    .featuresGrid { grid-template-columns: 1fr 1fr !important; }
  }

  @media (max-width: 600px) {
    .featuresGrid { grid-template-columns: 1fr !important; }
  }
`;

export default HomePage;