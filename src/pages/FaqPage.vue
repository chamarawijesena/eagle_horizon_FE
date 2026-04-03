<script setup lang="ts">
import { ref } from 'vue'

const activeIndex = ref<number | null>(null)

function toggle(i: number) {
  activeIndex.value = activeIndex.value === i ? null : i
}

const categories = [
  {
    category: 'Getting Started',
    items: [
      {
        q: 'How do I get a quote for my construction project?',
        a: 'Simply fill out our Contact Us form or call us on +61 3 9000 1234. Provide details about your project type, size, and location and we\'ll arrange a free consultation and site visit to provide a detailed quote within 5 business days.',
      },
      {
        q: 'What types of projects does Eagle Constructions handle?',
        a: 'We handle residential construction (new homes, extensions), commercial projects (offices, retail, warehouses), civil engineering, renovations and remodeling, and sustainable green builds. No project is too large or too small.',
      },
      {
        q: 'Do you work across all of Australia?',
        a: 'Yes. We have offices in Melbourne, Sydney, and Brisbane and take on projects nationally. For regional and remote projects, please contact us and we\'ll assess feasibility and logistics.',
      },
    ],
  },
  {
    category: 'Project Process',
    items: [
      {
        q: 'What is the typical construction process from start to finish?',
        a: 'Our process has six stages: (1) Initial Consultation & Quote, (2) Design & Planning, (3) Permits & Approvals, (4) Construction, (5) Quality Inspection & Sign-off, and (6) Final Handover. We keep you informed at every stage.',
      },
      {
        q: 'How long does a typical residential build take?',
        a: 'A standard single-storey home typically takes 6–10 months from slab to handover. A double-storey home takes 10–14 months. Commercial projects vary significantly by scope. We provide a detailed project timeline with your quote.',
      },
      {
        q: 'Who will be my main point of contact during the project?',
        a: 'Every project is assigned a dedicated Project Manager who will be your primary contact throughout the build. They handle scheduling, subcontractor coordination, and provide weekly progress updates.',
      },
      {
        q: 'Can I visit the construction site during the build?',
        a: 'Absolutely. We encourage client site visits and provide scheduled walkthrough times to ensure your safety on site. Just coordinate with your Project Manager in advance to arrange a visit.',
      },
    ],
  },
  {
    category: 'Pricing & Contracts',
    items: [
      {
        q: 'Are your quotes fixed-price or variable?',
        a: 'We offer fixed-price contracts for most residential projects, giving you certainty on costs. For complex commercial projects, we may use a cost-plus model. All contract types are clearly explained before signing.',
      },
      {
        q: 'What payment structure do you use?',
        a: 'Payments are milestone-based, aligned to construction stages such as slab, frame, lock-up, fixing, and practical completion. This structure ensures you only pay for work that has been completed and inspected.',
      },
      {
        q: 'Are there any hidden fees I should be aware of?',
        a: 'No hidden fees. Our quotes are comprehensive and include materials, labour, and project management. Variations only occur if you change the scope of work, and these are always documented and agreed upon in writing before proceeding.',
      },
    ],
  },
  {
    category: 'Warranties & Standards',
    items: [
      {
        q: 'What warranty do you provide on your work?',
        a: 'Eagle Constructions provides a 10-year structural warranty and a 2-year defects warranty on all new builds, in line with Australian consumer law. Additionally, all materials carry manufacturer warranties which we pass on to you.',
      },
      {
        q: 'Are you a licensed and insured builder?',
        a: 'Yes. Eagle Constructions holds a full builder\'s licence in Victoria, New South Wales, and Queensland. We carry comprehensive public liability insurance ($20 million), workers\' compensation, and home warranty insurance on all residential projects.',
      },
      {
        q: 'Do you comply with Australian building standards and codes?',
        a: 'Absolutely. All our projects are built in strict compliance with the National Construction Code (NCC), Australian Standards, and relevant state and local council regulations. We manage all permits and inspections on your behalf.',
      },
    ],
  },
]

// Flatten with global index for accordion logic
const allItems = categories.flatMap((cat, ci) =>
  cat.items.map((item, ii) => ({ ...item, globalIndex: ci * 100 + ii }))
)

let globalCounter = 0
const enrichedCategories = categories.map(cat => ({
  ...cat,
  items: cat.items.map(item => ({ ...item, gIndex: globalCounter++ })),
}))
</script>

<template>
  <!-- Page Hero -->
  <section class="page-hero">
    <div class="container">
      <span class="section-tag">Support</span>
      <h1>Frequently Asked Questions</h1>
      <p>Find answers to the most common questions about our services, processes, and policies.</p>
    </div>
  </section>

  <section class="section">
    <div class="container faq-layout">
      <!-- Sidebar nav -->
      <aside class="faq-nav">
        <h3>Categories</h3>
        <ul>
          <li v-for="cat in enrichedCategories" :key="cat.category">
            <a :href="`#${cat.category.replace(/\s+/g, '-').toLowerCase()}`">{{ cat.category }}</a>
          </li>
        </ul>
        <div class="faq-cta">
          <p>Can't find what you're looking for?</p>
          <RouterLink to="/contact" class="btn-cta">Ask Us Directly</RouterLink>
        </div>
      </aside>

      <!-- FAQ Accordions -->
      <div class="faq-content">
        <div
          v-for="cat in enrichedCategories"
          :key="cat.category"
          class="faq-category"
          :id="cat.category.replace(/\s+/g, '-').toLowerCase()"
        >
          <h2 class="cat-title">{{ cat.category }}</h2>

          <div
            v-for="item in cat.items"
            :key="item.gIndex"
            class="faq-item"
            :class="{ active: activeIndex === item.gIndex }"
          >
            <button class="faq-question" @click="toggle(item.gIndex)">
              <span>{{ item.q }}</span>
              <svg
                class="faq-chevron"
                :class="{ rotated: activeIndex === item.gIndex }"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
            <div class="faq-answer" :class="{ open: activeIndex === item.gIndex }">
              <div class="answer-inner">
                <p>{{ item.a }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom CTA -->
        <div class="bottom-cta">
          <div class="cta-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </div>
          <div>
            <strong>Still have questions?</strong>
            <p>Our team is happy to help. Contact us for personalised assistance.</p>
          </div>
          <RouterLink to="/contact" class="btn-primary">Contact Us</RouterLink>
        </div>
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

.faq-layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 3.5rem;
  align-items: start;
}

/* Sidebar */
.faq-nav {
  position: sticky;
  top: 90px;
}

.faq-nav h3 {
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 0.75rem;
}

.faq-nav ul {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.faq-nav ul li a {
  display: block;
  font-size: 0.9rem;
  color: var(--text-muted);
  text-decoration: none;
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  border-left: 3px solid transparent;
  transition: all 0.2s;
}

.faq-nav ul li a:hover {
  color: var(--primary);
  background: var(--light);
  border-left-color: var(--accent);
}

.faq-cta {
  background: var(--light);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 1.25rem;
}

.faq-cta p {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 0.75rem;
  line-height: 1.5;
}

.btn-cta {
  display: block;
  background: var(--primary);
  color: var(--white);
  font-weight: 700;
  font-size: 0.85rem;
  padding: 0.6rem 1rem;
  border-radius: 7px;
  text-decoration: none;
  text-align: center;
  transition: background 0.2s;
}

.btn-cta:hover {
  background: var(--accent);
  color: var(--primary-dark);
}

/* FAQ Content */
.faq-category {
  margin-bottom: 3rem;
}

.cat-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--primary);
  padding-bottom: 0.75rem;
  border-bottom: 2px solid var(--accent);
  margin-bottom: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.faq-item {
  border: 1px solid var(--border);
  border-radius: 10px;
  margin-bottom: 0.75rem;
  overflow: hidden;
  transition: border-color 0.2s;
}

.faq-item.active {
  border-color: var(--primary);
}

.faq-question {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.1rem 1.25rem;
  background: var(--white);
  border: none;
  cursor: pointer;
  text-align: left;
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text);
  transition: background 0.2s;
}

.faq-question:hover {
  background: var(--light);
}

.faq-item.active .faq-question {
  color: var(--primary);
  background: rgba(27, 58, 107, 0.04);
}

.faq-chevron {
  flex-shrink: 0;
  color: var(--text-muted);
  transition: transform 0.3s;
}

.faq-chevron.rotated {
  transform: rotate(180deg);
  color: var(--primary);
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.35s ease;
}

.faq-answer.open {
  max-height: 400px;
}

.answer-inner {
  padding: 0 1.25rem 1.25rem;
  border-top: 1px solid var(--border);
}

.answer-inner p {
  margin: 1rem 0 0;
  font-size: 0.92rem;
  color: var(--text-muted);
  line-height: 1.75;
}

/* Bottom CTA */
.bottom-cta {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  background: var(--light);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 1rem;
  flex-wrap: wrap;
}

.cta-icon {
  width: 52px;
  height: 52px;
  background: var(--primary);
  color: var(--white);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.bottom-cta > div {
  flex: 1;
}

.bottom-cta strong {
  display: block;
  font-size: 0.95rem;
  color: var(--primary);
  margin-bottom: 0.2rem;
}

.bottom-cta p {
  font-size: 0.87rem;
  color: var(--text-muted);
  margin: 0;
}

.btn-primary {
  display: inline-block;
  background: var(--accent);
  color: var(--primary-dark);
  font-weight: 700;
  font-size: 0.9rem;
  padding: 0.65rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  transition: background 0.2s;
  white-space: nowrap;
}

.btn-primary:hover {
  background: var(--accent-hover);
}

@media (max-width: 900px) {
  .faq-layout {
    grid-template-columns: 1fr;
  }
  .faq-nav {
    position: static;
  }
}
</style>
