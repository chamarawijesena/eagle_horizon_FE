<script setup lang="ts">
const values = [
  { icon: '🏆', title: 'Excellence', desc: 'We pursue the highest standards in every aspect of our work, from materials to workmanship.' },
  { icon: '🤝', title: 'Integrity', desc: 'Honest communication, fair pricing, and ethical business practices in everything we do.' },
  { icon: '🔒', title: 'Safety', desc: 'Zero-compromise approach to workplace safety and building standards compliance.' },
  { icon: '🌱', title: 'Sustainability', desc: 'Committed to eco-friendly building practices and reducing our environmental footprint.' },
]

const team = [
  { name: 'Michael Harrington', role: 'Founder & CEO', initials: 'MH' },
  { name: 'Sophia Chen', role: 'Head of Operations', initials: 'SC' },
  { name: 'David Okafor', role: 'Lead Architect', initials: 'DO' },
  { name: 'Lisa Tanaka', role: 'Project Director', initials: 'LT' },
]

const milestones = [
  { year: '2005', event: 'Eagle Constructions founded in Melbourne with a team of 8.' },
  { year: '2009', event: 'Completed our 100th project — the Riverside Commercial Complex.' },
  { year: '2013', event: 'Expanded operations to Sydney and Brisbane.' },
  { year: '2017', event: 'Received Master Builders Award for Excellence in Construction.' },
  { year: '2021', event: 'Launched Green Build Division — sustainable construction practice.' },
  { year: '2025', event: 'Over 500 projects delivered. 150+ team members nationwide.' },
]
</script>

<template>
  <!-- Page Hero -->
  <section class="page-hero">
    <div class="container">
      <span class="section-tag">Who We Are</span>
      <h1>About Eagle Constructions</h1>
      <p>Two decades of building trust, delivering excellence, and shaping communities across Australia.</p>
    </div>
  </section>

  <!-- Story Section -->
  <section class="section">
    <div class="container story-inner">
      <div class="story-content">
        <span class="section-tag">Our Story</span>
        <h2>From Humble Beginnings to Industry Leaders</h2>
        <p>
          Eagle Constructions was founded in 2005 by Michael Harrington, a master builder with a vision
          to redefine construction standards in Australia. What started as a small team of eight passionate
          builders in Melbourne has grown into one of the country's most respected construction companies.
        </p>
        <p>
          Over the years, we've delivered more than 500 projects spanning residential homes, commercial
          complexes, civil infrastructure, and large-scale renovations. Our success is built on a simple
          philosophy: treat every project as if it's our own home.
        </p>
        <p>
          Today, Eagle Constructions operates nationally with offices in Melbourne, Sydney, and Brisbane,
          serving clients who trust us to turn their vision into reality — on time, within budget, and
          with uncompromising quality.
        </p>
      </div>
      <div class="story-visual">
        <div class="visual-box">
          <svg viewBox="0 0 360 280" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="360" height="280" rx="12" fill="#F5F7FA"/>
            <rect x="30" y="160" width="60" height="100" fill="#1B3A6B" rx="4"/>
            <rect x="110" y="100" width="80" height="160" fill="#2d5a9e" rx="4"/>
            <polygon points="110,100 150,40 190,100" fill="#E8A020"/>
            <rect x="210" y="130" width="60" height="130" fill="#1B3A6B" rx="4"/>
            <rect x="285" y="150" width="50" height="110" fill="#2d5a9e" rx="4"/>
            <rect x="0" y="255" width="360" height="25" fill="#dce3ed" rx="2"/>
            <!-- Windows -->
            <rect x="40" y="175" width="15" height="15" fill="#E8A020" opacity="0.7"/>
            <rect x="63" y="175" width="15" height="15" fill="#E8A020" opacity="0.4"/>
            <rect x="122" y="115" width="20" height="20" fill="#E8A020" opacity="0.6"/>
            <rect x="152" y="115" width="20" height="20" fill="#E8A020" opacity="0.8"/>
            <rect x="122" y="150" width="20" height="20" fill="#E8A020" opacity="0.4"/>
            <rect x="152" y="150" width="20" height="20" fill="#E8A020" opacity="0.6"/>
            <rect x="220" y="145" width="15" height="15" fill="#E8A020" opacity="0.7"/>
            <rect x="245" y="145" width="15" height="15" fill="#E8A020" opacity="0.4"/>
          </svg>
        </div>
        <div class="story-badge">
          <span class="badge-number">20+</span>
          <span class="badge-text">Years of Excellence</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Values -->
  <section class="section values-section">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">What Drives Us</span>
        <h2>Our Core Values</h2>
        <p>Every decision we make is guided by these principles.</p>
      </div>
      <div class="values-grid">
        <div v-for="val in values" :key="val.title" class="value-card">
          <div class="value-icon">{{ val.icon }}</div>
          <h3>{{ val.title }}</h3>
          <p>{{ val.desc }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Timeline -->
  <section class="section">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">Our Journey</span>
        <h2>Key Milestones</h2>
      </div>
      <div class="timeline">
        <div v-for="(item, i) in milestones" :key="item.year" class="timeline-item" :class="{ right: i % 2 !== 0 }">
          <div class="timeline-content">
            <span class="timeline-year">{{ item.year }}</span>
            <p>{{ item.event }}</p>
          </div>
          <div class="timeline-dot"></div>
        </div>
      </div>
    </div>
  </section>

  <!-- Team -->
  <section class="section team-section">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">Our People</span>
        <h2>Leadership Team</h2>
        <p>The experienced professionals steering Eagle Constructions forward.</p>
      </div>
      <div class="team-grid">
        <div v-for="member in team" :key="member.name" class="team-card">
          <div class="team-avatar">{{ member.initials }}</div>
          <h3>{{ member.name }}</h3>
          <span>{{ member.role }}</span>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="cta-bar">
    <div class="container cta-inner">
      <div>
        <h2>Ready to work with us?</h2>
        <p>Let's discuss your next construction project.</p>
      </div>
      <RouterLink to="/contact" class="btn-primary">Get in Touch</RouterLink>
    </div>
  </section>
</template>

<style scoped>
.page-hero {
  background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%);
  color: var(--white);
  padding: 4rem 1.5rem;
  text-align: center;
}

.page-hero h1 {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  margin: 0.75rem 0;
}

.page-hero p {
  color: rgba(255,255,255,0.75);
  font-size: 1.05rem;
  max-width: 560px;
  margin: 0 auto;
}

.section {
  padding: 5rem 1.5rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-tag {
  display: inline-block;
  background: rgba(232, 160, 32, 0.12);
  color: var(--accent);
  padding: 0.3rem 0.9rem;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
}

.section-header h2 {
  font-size: clamp(1.7rem, 3vw, 2.4rem);
  font-weight: 800;
  color: var(--primary);
  margin-bottom: 0.75rem;
}

.section-header p {
  color: var(--text-muted);
  max-width: 540px;
  margin: 0 auto;
}

/* Story */
.story-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.story-content .section-tag {
  display: inline-block;
  margin-bottom: 0.75rem;
}

.story-content h2 {
  font-size: clamp(1.6rem, 3vw, 2.1rem);
  font-weight: 800;
  color: var(--primary);
  margin-bottom: 1.25rem;
  line-height: 1.2;
}

.story-content p {
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.75;
  margin-bottom: 1rem;
}

.story-visual {
  position: relative;
}

.visual-box {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 40px rgba(27,58,107,0.15);
}

.story-badge {
  position: absolute;
  bottom: -1rem;
  right: -1rem;
  background: var(--accent);
  color: var(--primary-dark);
  padding: 1rem 1.5rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
}

.badge-number {
  display: block;
  font-size: 2rem;
  font-weight: 900;
  line-height: 1;
}

.badge-text {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Values */
.values-section {
  background: var(--light);
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.value-card {
  background: var(--white);
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid var(--border);
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
}

.value-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow);
}

.value-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.value-card h3 {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 0.5rem;
}

.value-card p {
  font-size: 0.88rem;
  color: var(--text-muted);
  line-height: 1.65;
}

/* Timeline */
.timeline {
  position: relative;
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--border);
  transform: translateX(-50%);
}

.timeline-item {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: calc(50% + 2rem);
  padding-bottom: 2rem;
  position: relative;
}

.timeline-item.right {
  justify-content: flex-start;
  padding-right: 0;
  padding-left: calc(50% + 2rem);
}

.timeline-content {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 1rem 1.25rem;
  max-width: 260px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.timeline-year {
  display: inline-block;
  font-size: 0.78rem;
  font-weight: 800;
  color: var(--accent);
  letter-spacing: 1px;
  margin-bottom: 0.35rem;
}

.timeline-content p {
  font-size: 0.9rem;
  color: var(--text-muted);
  margin: 0;
  line-height: 1.55;
}

.timeline-dot {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 14px;
  height: 14px;
  background: var(--accent);
  border: 3px solid var(--white);
  border-radius: 50%;
  box-shadow: 0 0 0 2px var(--accent);
  top: 1rem;
}

/* Team */
.team-section {
  background: var(--light);
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.team-card {
  background: var(--white);
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid var(--border);
  text-align: center;
  transition: transform 0.2s;
}

.team-card:hover {
  transform: translateY(-4px);
}

.team-avatar {
  width: 72px;
  height: 72px;
  background: var(--primary);
  color: var(--white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  font-weight: 700;
  margin: 0 auto 1rem;
}

.team-card h3 {
  font-size: 0.98rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 0.25rem;
}

.team-card span {
  font-size: 0.82rem;
  color: var(--text-muted);
}

/* CTA */
.cta-bar {
  background: var(--primary);
  padding: 3.5rem 1.5rem;
  color: var(--white);
}

.cta-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
}

.cta-bar h2 {
  font-size: 1.75rem;
  font-weight: 800;
  margin-bottom: 0.35rem;
}

.cta-bar p {
  color: rgba(255,255,255,0.7);
}

.btn-primary {
  display: inline-block;
  background: var(--accent);
  color: var(--primary-dark);
  font-weight: 700;
  font-size: 0.95rem;
  padding: 0.75rem 1.75rem;
  border-radius: 8px;
  text-decoration: none;
  transition: background 0.2s;
  white-space: nowrap;
}

.btn-primary:hover {
  background: var(--accent-hover);
}

@media (max-width: 900px) {
  .story-inner { grid-template-columns: 1fr; }
  .values-grid { grid-template-columns: repeat(2, 1fr); }
  .team-grid { grid-template-columns: repeat(2, 1fr); }
  .timeline-item { padding-right: 0; justify-content: center; }
  .timeline-item.right { padding-left: 0; justify-content: center; }
  .timeline::before { display: none; }
  .timeline-dot { display: none; }
}

@media (max-width: 560px) {
  .values-grid { grid-template-columns: 1fr; }
  .team-grid { grid-template-columns: 1fr; }
  .cta-inner { flex-direction: column; text-align: center; }
}
</style>
