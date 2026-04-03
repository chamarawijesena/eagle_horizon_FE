<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
})

const isSubmitting = ref(false)
const submitted = ref(false)
const error = ref('')

const subjects = [
  'General Enquiry',
  'Request a Quote',
  'Residential Project',
  'Commercial Project',
  'Renovation',
  'Partnership',
  'Other',
]

async function handleSubmit() {
  if (!form.value.name || !form.value.email || !form.value.message) {
    error.value = 'Please fill in all required fields.'
    return
  }
  error.value = ''
  isSubmitting.value = true
  // Placeholder: connect to backend contact endpoint
  await new Promise(resolve => setTimeout(resolve, 1000))
  isSubmitting.value = false
  submitted.value = true
}
</script>

<template>
  <!-- Page Hero -->
  <section class="page-hero">
    <div class="container">
      <span class="section-tag">Get in Touch</span>
      <h1>Contact Us</h1>
      <p>Ready to start your project? We'd love to hear from you. Reach out and we'll respond within 24 hours.</p>
    </div>
  </section>

  <section class="section">
    <div class="container contact-grid">
      <!-- Contact Info -->
      <div class="contact-info">
        <h2>We're Here to Help</h2>
        <p class="info-sub">Whether you have a question, want a quote, or just want to learn more — our team is ready to assist.</p>

        <div class="info-cards">
          <div class="info-card">
            <div class="info-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <div>
              <strong>Head Office</strong>
              <p>123 Builder Street<br />Melbourne VIC 3000<br />Australia</p>
            </div>
          </div>

          <div class="info-card">
            <div class="info-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.79-1.79a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </div>
            <div>
              <strong>Phone</strong>
              <p>+61 3 9000 1234<br /><span class="hours">Mon – Fri, 8am – 6pm AEST</span></p>
            </div>
          </div>

          <div class="info-card">
            <div class="info-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </div>
            <div>
              <strong>Email</strong>
              <p>info@eagleconstructions.com.au<br /><span class="hours">Response within 24 hours</span></p>
            </div>
          </div>

          <div class="info-card">
            <div class="info-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <div>
              <strong>Business Hours</strong>
              <p>Monday – Friday: 8:00am – 6:00pm<br />Saturday: 9:00am – 1:00pm<br /><span class="hours">Closed Sundays & Public Holidays</span></p>
            </div>
          </div>
        </div>

        <div class="branches">
          <h3>Other Offices</h3>
          <div class="branch-list">
            <div class="branch">
              <strong>Sydney</strong>
              <span>456 Commerce Ave, Sydney NSW 2000</span>
            </div>
            <div class="branch">
              <strong>Brisbane</strong>
              <span>78 Industry Rd, Brisbane QLD 4000</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Form -->
      <div class="form-container">
        <div v-if="submitted" class="success-state">
          <div class="success-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
          <h3>Message Sent!</h3>
          <p>Thank you for reaching out. Our team will get back to you within 24 hours.</p>
          <button class="btn-primary" @click="submitted = false; form = { name: '', email: '', phone: '', subject: '', message: '' }">
            Send Another Message
          </button>
        </div>

        <form v-else @submit.prevent="handleSubmit" class="contact-form" novalidate>
          <h2>Send Us a Message</h2>
          <p class="form-sub">Fill in the form and we'll get back to you as soon as possible.</p>

          <div v-if="error" class="error-msg">{{ error }}</div>

          <div class="form-row">
            <div class="form-group">
              <label for="name">Full Name <span class="req">*</span></label>
              <input id="name" v-model="form.name" type="text" placeholder="John Smith" required />
            </div>
            <div class="form-group">
              <label for="email">Email Address <span class="req">*</span></label>
              <input id="email" v-model="form.email" type="email" placeholder="john@example.com" required />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="phone">Phone Number</label>
              <input id="phone" v-model="form.phone" type="tel" placeholder="+61 4XX XXX XXX" />
            </div>
            <div class="form-group">
              <label for="subject">Subject</label>
              <select id="subject" v-model="form.subject">
                <option value="">Select a subject…</option>
                <option v-for="s in subjects" :key="s" :value="s">{{ s }}</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label for="message">Message <span class="req">*</span></label>
            <textarea id="message" v-model="form.message" rows="5" placeholder="Tell us about your project or enquiry…" required></textarea>
          </div>

          <button type="submit" class="submit-btn" :disabled="isSubmitting">
            <span v-if="isSubmitting" class="spinner"></span>
            <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            {{ isSubmitting ? 'Sending…' : 'Send Message' }}
          </button>
        </form>
      </div>
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
  max-width: 540px;
  margin: 0 auto;
  font-size: 1rem;
}

.section {
  padding: 5rem 1.5rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-tag {
  display: inline-block;
  background: rgba(232, 160, 32, 0.2);
  color: var(--accent);
  padding: 0.3rem 0.9rem;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 4rem;
  align-items: start;
}

/* Info Side */
.contact-info h2 {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--primary);
  margin-bottom: 0.5rem;
}

.info-sub {
  color: var(--text-muted);
  font-size: 0.92rem;
  line-height: 1.65;
  margin-bottom: 2rem;
}

.info-cards {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 2rem;
}

.info-card {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding: 1.25rem;
  background: var(--light);
  border-radius: 10px;
  border: 1px solid var(--border);
}

.info-icon {
  width: 44px;
  height: 44px;
  background: var(--primary);
  color: var(--white);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.info-card strong {
  display: block;
  font-size: 0.9rem;
  color: var(--primary);
  margin-bottom: 0.25rem;
}

.info-card p {
  font-size: 0.87rem;
  color: var(--text-muted);
  margin: 0;
  line-height: 1.6;
}

.hours {
  color: var(--accent);
  font-size: 0.8rem;
  font-weight: 600;
}

.branches h3 {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.branch-list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.branch {
  display: flex;
  flex-direction: column;
  font-size: 0.87rem;
}

.branch strong {
  color: var(--primary);
  margin-bottom: 0.1rem;
}

.branch span {
  color: var(--text-muted);
}

/* Form Side */
.form-container {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: var(--shadow);
}

.contact-form h2 {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--primary);
  margin-bottom: 0.35rem;
}

.form-sub {
  font-size: 0.88rem;
  color: var(--text-muted);
  margin-bottom: 1.75rem;
}

.error-msg {
  background: #fff0f0;
  border: 1px solid #fca5a5;
  color: #b91c1c;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.88rem;
  margin-bottom: 1.25rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 1rem;
}

.form-group label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text);
}

.req {
  color: #e53e3e;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 0.7rem 0.9rem;
  border: 1.5px solid var(--border);
  border-radius: 8px;
  font-size: 0.92rem;
  color: var(--text);
  background: var(--light);
  font-family: inherit;
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: var(--primary);
  background: var(--white);
  box-shadow: 0 0 0 3px rgba(27,58,107,0.1);
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  background: var(--primary);
  color: var(--white);
  font-size: 0.95rem;
  font-weight: 700;
  padding: 0.85rem 2rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
  font-family: inherit;
  width: 100%;
  margin-top: 0.5rem;
}

.submit-btn:hover:not(:disabled) {
  background: var(--accent);
  color: var(--primary-dark);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: var(--white);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Success */
.success-state {
  text-align: center;
  padding: 2rem;
}

.success-icon {
  width: 80px;
  height: 80px;
  background: rgba(34, 197, 94, 0.12);
  color: #16a34a;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.25rem;
}

.success-state h3 {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--primary);
  margin-bottom: 0.5rem;
}

.success-state p {
  color: var(--text-muted);
  margin-bottom: 1.5rem;
}

.btn-primary {
  background: var(--accent);
  color: var(--primary-dark);
  font-weight: 700;
  padding: 0.75rem 1.75rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.95rem;
  transition: background 0.2s;
}

.btn-primary:hover {
  background: var(--accent-hover);
}

@media (max-width: 900px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
  .form-row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .form-container {
    padding: 1.5rem;
  }
}
</style>
