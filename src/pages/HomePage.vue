<script setup lang="ts">
const services = [
  {
    icon: '🏗️',
    title: 'Residential Construction',
    desc: 'Custom homes built to your exact specifications with premium materials and expert craftsmanship.',
  },
  {
    icon: '🏢',
    title: 'Commercial Projects',
    desc: 'Large-scale commercial builds delivered on time and within budget, from offices to retail spaces.',
  },
  {
    icon: '🔨',
    title: 'Renovation & Remodeling',
    desc: 'Transform your existing spaces with our expert renovation team and innovative design solutions.',
  },
  {
    icon: '📐',
    title: 'Project Management',
    desc: 'End-to-end project management ensuring seamless coordination from blueprint to final handover.',
  },
  {
    icon: '🏗️',
    title: 'Civil Engineering',
    desc: 'Infrastructure and civil engineering works including roads, drainage, and structural foundations.',
  },
  {
    icon: '🌿',
    title: 'Sustainable Building',
    desc: 'Eco-friendly construction practices and green building solutions for a sustainable future.',
  },
]

const stats = [
  { value: '500+', label: 'Projects Completed' },
  { value: '20+', label: 'Years of Experience' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '150+', label: 'Expert Team Members' },
]

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Homeowner',
    quote: 'Eagle Constructions turned our dream home into reality. The team was professional, punctual, and the quality is outstanding.',
  },
  {
    name: 'James Thornton',
    role: 'CEO, Thornton Group',
    quote: 'We partnered with Eagle for our commercial headquarters. Delivered on time, under budget, and beyond expectations.',
  },
  {
    name: 'Priya Sharma',
    role: 'Property Developer',
    quote: 'Their attention to detail and commitment to quality is unmatched. Eagle is our go-to construction partner.',
  },
]
</script>

<template>
  <!-- Hero Section -->
  <section class="hero">
    <div class="hero-bg"></div>
    <div class="hero-content">
      <div class="hero-badge">
        <span class="badge-dot"></span> Trusted Construction Experts Since 2005
      </div>
      <h1>
        Building Your Vision,<br />
        <span class="hero-accent">With Eagle Precision</span>
      </h1>
      <p class="hero-sub">
        Eagle Constructions delivers world-class residential and commercial projects
        across Australia. Quality craftsmanship, transparent process, and exceptional results.
      </p>
      <div class="hero-actions">
        <RouterLink to="/contact" class="btn-primary">Get a Free Quote</RouterLink>
        <RouterLink to="/about" class="btn-outline">Learn More</RouterLink>
      </div>
    </div>
    <div class="hero-stats">
      <div v-for="stat in stats" :key="stat.label" class="stat-card">
        <span class="stat-value">{{ stat.value }}</span>
        <span class="stat-label">{{ stat.label }}</span>
      </div>
    </div>
  </section>

  <!-- Services Section -->
  <section class="section services-section">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">What We Do</span>
        <h2>Comprehensive Construction Services</h2>
        <p>From concept to completion, we deliver excellence across every project type.</p>
      </div>
      <div class="services-grid">
        <div v-for="service in services" :key="service.title" class="service-card">
          <div class="service-icon">{{ service.icon }}</div>
          <h3>{{ service.title }}</h3>
          <p>{{ service.desc }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Why Choose Us -->
  <section class="section why-section">
    <div class="container why-inner">
      <div class="why-image">
        <div class="why-image-placeholder">
          <svg viewBox="0 0 400 320" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="320" fill="#1B3A6B" rx="12"/>
            <rect x="40" y="180" width="60" height="120" fill="#E8A020"/>
            <rect x="120" y="130" width="60" height="170" fill="#2d5a9e"/>
            <rect x="200" y="100" width="60" height="200" fill="#E8A020" opacity="0.8"/>
            <rect x="280" y="150" width="60" height="150" fill="#2d5a9e" opacity="0.9"/>
            <polygon points="40,180 100,180 70,120" fill="#E8A020" opacity="0.6"/>
            <polygon points="200,100 260,100 230,40" fill="#E8A020"/>
            <rect x="0" y="290" width="400" height="30" fill="#0D1F3C"/>
          </svg>
        </div>
      </div>
      <div class="why-content">
        <span class="section-tag">Why Eagle?</span>
        <h2>Built on Trust,<br />Delivered with Pride</h2>
        <ul class="why-list">
          <li>
            <div class="why-check">✓</div>
            <div>
              <strong>Licensed & Insured</strong>
              <p>Fully licensed builders with comprehensive insurance for your peace of mind.</p>
            </div>
          </li>
          <li>
            <div class="why-check">✓</div>
            <div>
              <strong>On-Time Delivery</strong>
              <p>We respect your timeline and have a 95% on-time project completion rate.</p>
            </div>
          </li>
          <li>
            <div class="why-check">✓</div>
            <div>
              <strong>Transparent Pricing</strong>
              <p>No hidden costs. Detailed quotes and regular budget updates throughout your project.</p>
            </div>
          </li>
          <li>
            <div class="why-check">✓</div>
            <div>
              <strong>Quality Guarantee</strong>
              <p>All work backed by our 10-year workmanship warranty and quality assurance program.</p>
            </div>
          </li>
        </ul>
        <RouterLink to="/about" class="btn-primary">Our Story</RouterLink>
      </div>
    </div>
  </section>

  <!-- Testimonials -->
  <section class="section testimonials-section">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">Client Stories</span>
        <h2>What Our Clients Say</h2>
      </div>
      <div class="testimonials-grid">
        <div v-for="t in testimonials" :key="t.name" class="testimonial-card">
          <div class="quote-icon">"</div>
          <p class="quote-text">{{ t.quote }}</p>
          <div class="quote-author">
            <div class="author-avatar">{{ t.name[0] }}</div>
            <div>
              <strong>{{ t.name }}</strong>
              <span>{{ t.role }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="cta-section">
    <div class="container cta-inner">
      <div>
        <h2>Ready to Start Your Project?</h2>
        <p>Get in touch with our team today for a free consultation and quote.</p>
      </div>
      <div class="cta-actions">
        <RouterLink to="/contact" class="btn-primary">Contact Us Today</RouterLink>
        <a href="tel:+61390001234" class="btn-outline-light">+61 3 9000 1234</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Hero */
.hero {
  background: var(--primary-dark);
  color: var(--white);
  padding: 5rem 1.5rem 0;
  position: relative;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 70% 50%, rgba(232, 160, 32, 0.08) 0%, transparent 70%),
              radial-gradient(ellipse at 20% 80%, rgba(45, 90, 158, 0.3) 0%, transparent 60%);
  pointer-events: none;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(232, 160, 32, 0.15);
  border: 1px solid rgba(232, 160, 32, 0.3);
  color: var(--accent);
  padding: 0.35rem 1rem;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  margin-bottom: 1.5rem;
}

.badge-dot {
  width: 8px;
  height: 8px;
  background: var(--accent);
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.hero h1 {
  font-size: clamp(2.2rem, 5vw, 3.8rem);
  font-weight: 800;
  line-height: 1.15;
  margin-bottom: 1.25rem;
  color: var(--white);
}

.hero-accent {
  color: var(--accent);
}

.hero-sub {
  font-size: 1.05rem;
  color: rgba(255,255,255,0.72);
  max-width: 560px;
  line-height: 1.7;
  margin-bottom: 2rem;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 4rem;
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  background: rgba(255,255,255,0.05);
  border-top: 1px solid rgba(255,255,255,0.1);
  margin: 0 -1.5rem;
  max-width: calc(100% + 3rem);
}

.stat-card {
  padding: 1.5rem;
  text-align: center;
  border-right: 1px solid rgba(255,255,255,0.08);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-card:last-child {
  border-right: none;
}

.stat-value {
  font-size: 2rem;
  font-weight: 800;
  color: var(--accent);
}

.stat-label {
  font-size: 0.82rem;
  color: rgba(255,255,255,0.55);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Sections */
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
  font-size: 1rem;
  max-width: 540px;
  margin: 0 auto;
}

/* Services */
.services-section {
  background: var(--light);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.service-card {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 2rem;
  transition: transform 0.2s, box-shadow 0.2s;
}

.service-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow);
  border-color: var(--accent);
}

.service-icon {
  font-size: 2.2rem;
  margin-bottom: 1rem;
}

.service-card h3 {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 0.5rem;
}

.service-card p {
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.65;
}

/* Why Us */
.why-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.why-image-placeholder {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--shadow);
}

.why-content .section-tag {
  display: inline-block;
  margin-bottom: 0.75rem;
}

.why-content h2 {
  font-size: clamp(1.7rem, 3vw, 2.2rem);
  font-weight: 800;
  color: var(--primary);
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.why-list {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.why-list li {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.why-check {
  width: 28px;
  height: 28px;
  background: var(--accent);
  color: var(--primary-dark);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 900;
  flex-shrink: 0;
  margin-top: 2px;
}

.why-list strong {
  display: block;
  color: var(--primary);
  font-size: 0.95rem;
  margin-bottom: 0.2rem;
}

.why-list p {
  font-size: 0.88rem;
  color: var(--text-muted);
  margin: 0;
}

/* Testimonials */
.testimonials-section {
  background: var(--light);
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.testimonial-card {
  background: var(--white);
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid var(--border);
  position: relative;
}

.quote-icon {
  font-size: 4rem;
  color: var(--accent);
  line-height: 1;
  font-family: Georgia, serif;
  margin-bottom: -0.5rem;
  opacity: 0.5;
}

.quote-text {
  font-size: 0.92rem;
  color: var(--text-muted);
  line-height: 1.7;
  margin-bottom: 1.25rem;
  font-style: italic;
}

.quote-author {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.author-avatar {
  width: 40px;
  height: 40px;
  background: var(--primary);
  color: var(--white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1rem;
  flex-shrink: 0;
}

.quote-author strong {
  display: block;
  font-size: 0.9rem;
  color: var(--primary);
}

.quote-author span {
  font-size: 0.8rem;
  color: var(--text-muted);
}

/* CTA */
.cta-section {
  background: var(--primary);
  padding: 4rem 1.5rem;
  color: var(--white);
}

.cta-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
}

.cta-section h2 {
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 800;
  margin-bottom: 0.4rem;
}

.cta-section p {
  color: rgba(255,255,255,0.7);
  font-size: 0.95rem;
}

.cta-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  flex-shrink: 0;
}

/* Buttons */
.btn-primary {
  display: inline-block;
  background: var(--accent);
  color: var(--primary-dark);
  font-weight: 700;
  font-size: 0.95rem;
  padding: 0.75rem 1.75rem;
  border-radius: 8px;
  text-decoration: none;
  transition: background 0.2s, transform 0.1s;
}

.btn-primary:hover {
  background: var(--accent-hover);
  transform: translateY(-1px);
}

.btn-outline {
  display: inline-block;
  background: transparent;
  color: var(--white);
  font-weight: 600;
  font-size: 0.95rem;
  padding: 0.75rem 1.75rem;
  border-radius: 8px;
  border: 2px solid rgba(255,255,255,0.4);
  text-decoration: none;
  transition: border-color 0.2s, color 0.2s;
}

.btn-outline:hover {
  border-color: var(--white);
  color: var(--white);
}

.btn-outline-light {
  display: inline-block;
  background: transparent;
  color: var(--white);
  font-weight: 600;
  font-size: 0.95rem;
  padding: 0.75rem 1.75rem;
  border-radius: 8px;
  border: 2px solid rgba(255,255,255,0.5);
  text-decoration: none;
  transition: border-color 0.2s;
}

.btn-outline-light:hover {
  border-color: var(--white);
}

/* Responsive */
@media (max-width: 900px) {
  .hero-stats {
    grid-template-columns: repeat(2, 1fr);
  }
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .why-inner {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .testimonials-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .hero {
    padding: 3rem 1.5rem 0;
  }
  .hero-stats {
    grid-template-columns: repeat(2, 1fr);
  }
  .services-grid {
    grid-template-columns: 1fr;
  }
  .cta-inner {
    flex-direction: column;
    text-align: center;
  }
}
</style>
