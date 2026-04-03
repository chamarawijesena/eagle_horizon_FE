<template>
  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="footer-logo">
            <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
              <polygon points="18,2 34,32 2,32" fill="#E8A020" opacity="0.9"/>
              <polygon points="18,8 28,28 8,28" fill="#1B3A6B"/>
              <rect x="15" y="16" width="6" height="12" fill="#E8A020"/>
            </svg>
            <span class="footer-brand-name">Eagle Constructions</span>
          </div>
          <p class="footer-desc">
            Building excellence and trust since 2005. Your vision, our craftsmanship.
          </p>
        </div>

        <div class="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><RouterLink to="/">Home</RouterLink></li>
            <li><RouterLink to="/about">About Us</RouterLink></li>
            <li><RouterLink to="/faq">FAQ</RouterLink></li>
            <li><RouterLink to="/contact">Contact Us</RouterLink></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Services</h4>
          <ul>
            <li><a href="#">Residential Construction</a></li>
            <li><a href="#">Commercial Projects</a></li>
            <li><a href="#">Renovation & Remodeling</a></li>
            <li><a href="#">Project Management</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Contact</h4>
          <ul class="contact-list">
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              123 Builder Street, Melbourne VIC 3000
            </li>
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.79-1.79a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              +61 3 9000 1234
            </li>
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              info@eagleconstructions.com.au
            </li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; {{ new Date().getFullYear() }} Eagle Constructions. All rights reserved.</p>
        <p class="footer-tagline">Built with integrity. Delivered with pride.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--primary-dark);
  color: rgba(255,255,255,0.8);
  padding: 3rem 0 0;
  margin-top: auto;
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 2.5rem;
  padding-bottom: 2.5rem;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1rem;
}

.footer-brand-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--accent);
}

.footer-desc {
  font-size: 0.88rem;
  line-height: 1.7;
  color: rgba(255,255,255,0.6);
}

.footer-col h4 {
  color: var(--accent);
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.footer-col ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-col ul li a,
.footer-col ul li {
  font-size: 0.9rem;
  color: rgba(255,255,255,0.65);
  text-decoration: none;
  transition: color 0.2s;
}

.footer-col ul li a:hover {
  color: var(--accent);
}

.contact-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.88rem;
}

.contact-list svg {
  flex-shrink: 0;
  margin-top: 3px;
  color: var(--accent);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 0;
  font-size: 0.82rem;
  color: rgba(255,255,255,0.4);
}

.footer-tagline {
  font-style: italic;
  color: rgba(232, 160, 32, 0.6);
}

@media (max-width: 900px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 560px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }
  .footer-bottom {
    flex-direction: column;
    gap: 0.25rem;
    text-align: center;
  }
}
</style>
