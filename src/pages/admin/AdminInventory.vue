<script setup lang="ts">
import { ref, watch } from 'vue'
import { authToken } from '../../stores/auth'

// ── Types ──────────────────────────────────────────────────
interface HardwareItem {
  id: number
  name: string
  description: string
  price_per_day: string
  total_quantity: number
}

interface PaginatedResponse {
  count: number
  next: string | null
  previous: string | null
  results: HardwareItem[]
}

interface Category {
  id: number
  name: string
}

// ── Search state ───────────────────────────────────────────
const search   = ref('')
const ordering = ref('')
const page     = ref<number | ''>('')

const loading = ref(false)
const error   = ref('')
const data    = ref<PaginatedResponse | null>(null)

const orderingOptions = [
  { label: 'Default',                value: '' },
  { label: 'Name (A → Z)',           value: 'name' },
  { label: 'Name (Z → A)',           value: '-name' },
  { label: 'Price/Day (Low → High)', value: 'price_per_day' },
  { label: 'Price/Day (High → Low)', value: '-price_per_day' },
  { label: 'Quantity (Low → High)',  value: 'total_quantity' },
  { label: 'Quantity (High → Low)',  value: '-total_quantity' },
]

function authHeaders(): Record<string, string> {
  return authToken.value ? { Authorization: `Token ${authToken.value}` } : {}
}

async function fetchInventory() {
  loading.value = true
  error.value   = ''
  data.value    = null

  const params = new URLSearchParams()
  if (search.value.trim()) params.set('search', search.value.trim())
  if (ordering.value)      params.set('ordering', ordering.value)
  if (page.value !== '')   params.set('page', String(page.value))

  const url = `http://127.0.0.1:8000/api/v1/inventory/hardware/${params.toString() ? '?' + params : ''}`

  try {
    const res  = await fetch(url, { headers: authHeaders() })
    if (!res.ok) throw new Error(`Server returned ${res.status}`)
    const json = await res.json()
    data.value = Array.isArray(json)
      ? { count: json.length, next: null, previous: null, results: json }
      : json
  } catch (e: any) {
    error.value = e.message ?? 'Failed to fetch inventory.'
  } finally {
    loading.value = false
  }
}

function goToPage(url: string | null) {
  if (!url) return
  try {
    const p = new URL(url).searchParams.get('page')
    page.value = p ? Number(p) : ''
    fetchInventory()
  } catch { /* ignore */ }
}

function clearSearch() {
  search.value   = ''
  ordering.value = ''
  page.value     = ''
  data.value     = null
  error.value    = ''
}

// ── Add-item drawer ────────────────────────────────────────
const drawerOpen = ref(false)
const categories = ref<Category[]>([])
const catLoading = ref(false)

const conditionOptions = ['GOOD', 'EXCELLENT', 'FAIR', 'POOR', 'DAMAGED']

function emptyForm() {
  return {
    name:               '',
    category:           '' as number | '',
    price_per_day:      '',
    total_quantity:     '' as number | '',
    is_electric:        false,
    description:        '',
    condition:          'GOOD',
    power_rating_watts: '' as number | '',
  }
}

const form       = ref(emptyForm())
const submitting = ref(false)
const formError  = ref('')
const formSuccess= ref(false)

async function loadCategories() {
  if (categories.value.length) return
  catLoading.value = true
  try {
    const res  = await fetch('http://127.0.0.1:8000/api/v1/inventory/equipment-categories/', { headers: authHeaders() })
    if (!res.ok) throw new Error()
    const json = await res.json()
    categories.value = Array.isArray(json) ? json : (json.results ?? [])
  } catch {
    /* categories will remain empty; user can still type ID */
  } finally {
    catLoading.value = false
  }
}

function openDrawer() {
  form.value    = emptyForm()
  formError.value   = ''
  formSuccess.value = false
  drawerOpen.value  = true
  loadCategories()
}

function closeDrawer() {
  drawerOpen.value = false
}

// Clear power_rating_watts when is_electric is unchecked
watch(() => form.value.is_electric, (val) => {
  if (!val) form.value.power_rating_watts = ''
})

async function submitForm() {
  formError.value = ''

  // Client-side required validation
  if (!form.value.name.trim())          { formError.value = 'Name is required.'; return }
  if (form.value.category === '')       { formError.value = 'Category is required.'; return }
  if (!form.value.price_per_day)        { formError.value = 'Price per day is required.'; return }
  if (form.value.total_quantity === '' || Number(form.value.total_quantity) < 1) {
    formError.value = 'Total quantity must be at least 1.'; return
  }
  if (form.value.is_electric && form.value.power_rating_watts === '') {
    formError.value = 'Power rating (watts) is required for electric equipment.'; return
  }

  const payload: Record<string, unknown> = {
    name:           form.value.name.trim(),
    category:       Number(form.value.category),
    price_per_day:  form.value.price_per_day,
    total_quantity: Number(form.value.total_quantity),
    is_electric:    form.value.is_electric,
    description:    form.value.description.trim(),
    condition:      form.value.condition,
  }
  if (form.value.is_electric) {
    payload.power_rating_watts = Number(form.value.power_rating_watts)
  }

  submitting.value = true
  try {
    const res = await fetch('http://127.0.0.1:8000/api/v1/inventory/equipment/', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body:    JSON.stringify(payload),
    })

    const json = await res.json()

    if (!res.ok) {
      // Surface first error from any field
      const first = Object.values(json)[0]
      formError.value = Array.isArray(first) ? first[0] : (json.detail ?? 'Submission failed.')
      return
    }

    formSuccess.value = true
    // Refresh search results if a search is already showing
    if (data.value) fetchInventory()

  } catch (e: any) {
    formError.value = 'Unable to reach the server.'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="inventory-page">

    <!-- Drawer overlay -->
    <Teleport to="body">
      <transition name="drawer">
        <div v-if="drawerOpen" class="drawer-overlay" @click.self="closeDrawer">
          <div class="drawer">
            <div class="drawer-header">
              <h3>Add New Inventory Item</h3>
              <button class="drawer-close" @click="closeDrawer" aria-label="Close">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            <!-- Success state -->
            <div v-if="formSuccess" class="drawer-success">
              <div class="success-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
              <h4>Item Added Successfully</h4>
              <p>The inventory item has been created.</p>
              <div class="success-actions">
                <button class="btn-primary" @click="form = emptyForm(); formSuccess = false">Add Another</button>
                <button class="btn-outline" @click="closeDrawer">Close</button>
              </div>
            </div>

            <!-- Form -->
            <form v-else @submit.prevent="submitForm" class="drawer-form" novalidate>
              <div v-if="formError" class="form-error">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                {{ formError }}
              </div>

              <!-- Name -->
              <div class="form-group">
                <label for="f-name">Name <span class="req">*</span></label>
                <input id="f-name" v-model="form.name" type="text" placeholder="e.g. Ladder 10 Feet" />
              </div>

              <!-- Category -->
              <div class="form-group">
                <label for="f-category">
                  Category <span class="req">*</span>
                  <span v-if="catLoading" class="cat-loading">Loading…</span>
                </label>
                <select id="f-category" v-model="form.category">
                  <option value="" disabled>Select a category…</option>
                  <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                    {{ cat.name }}
                  </option>
                </select>
              </div>

              <!-- Price & Quantity row -->
              <div class="form-row">
                <div class="form-group">
                  <label for="f-price">Price / Day (LKR) <span class="req">*</span></label>
                  <input id="f-price" v-model="form.price_per_day" type="number" min="0" step="0.01" placeholder="0.00" />
                </div>
                <div class="form-group">
                  <label for="f-qty">Total Quantity <span class="req">*</span></label>
                  <input id="f-qty" v-model.number="form.total_quantity" type="number" min="1" placeholder="1" />
                </div>
              </div>

              <!-- Condition -->
              <div class="form-group">
                <label for="f-condition">Condition</label>
                <select id="f-condition" v-model="form.condition">
                  <option v-for="c in conditionOptions" :key="c" :value="c">{{ c }}</option>
                </select>
              </div>

              <!-- Is Electric toggle -->
              <div class="form-group form-group--toggle">
                <label class="toggle-label">
                  <div class="toggle-switch" :class="{ active: form.is_electric }" @click="form.is_electric = !form.is_electric">
                    <div class="toggle-thumb"></div>
                  </div>
                  <div>
                    <span>Electric Equipment</span>
                    <small>Toggle on if this item requires electrical power</small>
                  </div>
                </label>
              </div>

              <!-- Power rating — conditional -->
              <transition name="slide-down">
                <div v-if="form.is_electric" class="form-group form-group--electric">
                  <label for="f-watts">Power Rating (Watts) <span class="req">*</span></label>
                  <input id="f-watts" v-model.number="form.power_rating_watts" type="number" min="0" step="1" placeholder="e.g. 1500" />
                </div>
              </transition>

              <!-- Description -->
              <div class="form-group">
                <label for="f-desc">Description</label>
                <textarea id="f-desc" v-model="form.description" rows="3" placeholder="Optional description…"></textarea>
              </div>

              <div class="drawer-footer">
                <button type="submit" class="btn-primary" :disabled="submitting">
                  <span v-if="submitting" class="spinner"></span>
                  {{ submitting ? 'Saving…' : 'Add Item' }}
                </button>
                <button type="button" class="btn-outline" @click="closeDrawer">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </transition>
    </Teleport>

    <!-- Page heading -->
    <div class="page-heading">
      <div>
        <h2>Hardware Inventory</h2>
        <p class="page-sub">Search and browse all hardware items available for rental.</p>
      </div>
      <button class="btn-add" @click="openDrawer">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Add Item
      </button>
    </div>

    <!-- Search panel -->
    <div class="search-panel">
      <div class="search-fields">
        <div class="field-wrap">
          <label for="inv-search">Search</label>
          <div class="input-icon-wrap">
            <svg class="field-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input id="inv-search" v-model="search" type="text" placeholder="Search by name or description…" @keydown.enter="fetchInventory" />
            <button v-if="search" class="clear-btn" @click="search = ''" aria-label="Clear">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>

        <div class="field-wrap">
          <label for="inv-ordering">Ordering</label>
          <div class="input-icon-wrap">
            <svg class="field-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
            <select id="inv-ordering" v-model="ordering">
              <option v-for="opt in orderingOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
            </select>
          </div>
        </div>

        <div class="field-wrap field-wrap--sm">
          <label for="inv-page">Page</label>
          <div class="input-icon-wrap">
            <svg class="field-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
            <input id="inv-page" v-model.number="page" type="number" placeholder="1" min="1" />
          </div>
        </div>
      </div>

      <div class="search-actions">
        <button class="btn-search" @click="fetchInventory" :disabled="loading">
          <svg v-if="!loading" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <span v-if="loading" class="spinner"></span>
          {{ loading ? 'Searching…' : 'Search' }}
        </button>
        <button v-if="data || error" class="btn-clear" @click="clearSearch">Clear</button>
      </div>
    </div>

    <!-- Error -->
    <div v-if="error" class="error-bar">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      {{ error }}
    </div>

    <!-- Results meta -->
    <div v-if="data" class="results-meta">
      <span>{{ data.count }} item{{ data.count !== 1 ? 's' : '' }} found</span>
      <div class="pagination-btns">
        <button class="page-btn" :disabled="!data.previous" @click="goToPage(data!.previous)">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg>
          Prev
        </button>
        <button class="page-btn" :disabled="!data.next" @click="goToPage(data!.next)">
          Next
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
    </div>

    <!-- Empty state -->
    <div v-if="data && data.results.length === 0" class="empty-state">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>
      <p>No hardware items matched your search.</p>
    </div>

    <!-- Results grid -->
    <div v-if="data && data.results.length > 0" class="results-grid">
      <div v-for="item in data.results" :key="item.id" class="item-card">
        <div class="card-header">
          <div class="item-id">#{{ item.id }}</div>
          <div class="item-price">
            <span class="price-value">LKR {{ item.price_per_day }}</span>
            <span class="price-label">/ day</span>
          </div>
        </div>
        <h3 class="item-name">{{ item.name }}</h3>
        <p class="item-desc">{{ item.description }}</p>
        <div class="card-footer">
          <div class="qty-badge" :class="{
            'qty--green': item.total_quantity >= 5,
            'qty--amber': item.total_quantity > 0 && item.total_quantity < 5,
            'qty--red':   item.total_quantity === 0,
          }">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>
            {{ item.total_quantity === 0 ? 'Out of stock' : `${item.total_quantity} in stock` }}
          </div>
        </div>
      </div>
    </div>

    <!-- Initial state -->
    <div v-if="!data && !error && !loading" class="initial-state">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      <p>Enter your search criteria above and click <strong>Search</strong> to browse inventory.</p>
    </div>

  </div>
</template>

<style scoped>
.inventory-page { max-width: 1400px; }

/* ── Heading ── */
.page-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  gap: 1rem;
}
.page-heading h2 { font-size: 1.3rem; font-weight: 800; color: #1B3A6B; margin: 0 0 0.2rem; }
.page-sub { font-size: 0.82rem; color: #9aabb8; margin: 0; }

.btn-add {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  background: #E8A020;
  color: #0D1F3C;
  border: none;
  border-radius: 8px;
  padding: 0.65rem 1.25rem;
  font-size: 0.88rem;
  font-weight: 700;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.15s;
  white-space: nowrap;
}
.btn-add:hover { background: #c9881a; }

/* ── Search panel ── */
.search-panel {
  background: #fff;
  border: 1px solid #eef1f6;
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
  display: flex;
  align-items: flex-end;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.25rem;
  box-shadow: 0 1px 4px rgba(27,58,107,0.06);
}
.search-fields { display: flex; gap: 1rem; flex: 1; flex-wrap: wrap; align-items: flex-end; }
.field-wrap { display: flex; flex-direction: column; gap: 0.35rem; flex: 1; min-width: 180px; }
.field-wrap--sm { flex: 0 0 110px; min-width: 110px; }
.field-wrap label { font-size: 0.78rem; font-weight: 700; color: #5a6a80; text-transform: uppercase; letter-spacing: 0.5px; }
.input-icon-wrap { position: relative; display: flex; align-items: center; }
.field-icon { position: absolute; left: 0.7rem; color: #9aabb8; pointer-events: none; }
.input-icon-wrap input,
.input-icon-wrap select {
  width: 100%;
  padding: 0.6rem 0.75rem 0.6rem 2.2rem;
  border: 1.5px solid #dce3ed;
  border-radius: 8px;
  font-size: 0.88rem;
  color: #1a1a2e;
  background: #F5F7FA;
  font-family: inherit;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
  appearance: none;
}
.input-icon-wrap input:focus,
.input-icon-wrap select:focus {
  border-color: #1B3A6B;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(27,58,107,0.08);
}
.clear-btn {
  position: absolute; right: 0.6rem;
  background: none; border: none; color: #9aabb8; cursor: pointer; padding: 2px;
  display: flex; align-items: center; border-radius: 4px; transition: color 0.15s;
}
.clear-btn:hover { color: #DC2626; }

.search-actions { display: flex; gap: 0.6rem; align-items: center; flex-shrink: 0; }
.btn-search {
  display: flex; align-items: center; gap: 0.5rem;
  background: #1B3A6B; color: #fff; border: none; border-radius: 8px;
  padding: 0.65rem 1.4rem; font-size: 0.88rem; font-weight: 700;
  cursor: pointer; font-family: inherit; transition: background 0.15s; white-space: nowrap;
}
.btn-search:hover:not(:disabled) { background: #0D1F3C; }
.btn-search:disabled { opacity: 0.6; cursor: not-allowed; }
.btn-clear {
  background: none; border: 1.5px solid #dce3ed; border-radius: 8px;
  padding: 0.63rem 1rem; font-size: 0.85rem; font-weight: 600; color: #5a6a80;
  cursor: pointer; font-family: inherit; transition: border-color 0.15s, color 0.15s;
}
.btn-clear:hover { border-color: #DC2626; color: #DC2626; }

/* ── Spinner ── */
.spinner {
  width: 15px; height: 15px;
  border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff;
  border-radius: 50%; animation: spin 0.7s linear infinite; flex-shrink: 0;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ── Error / meta / states ── */
.error-bar {
  display: flex; align-items: center; gap: 0.6rem;
  background: #FEF2F2; border: 1px solid #fca5a5; color: #DC2626;
  padding: 0.8rem 1.1rem; border-radius: 10px; font-size: 0.88rem; margin-bottom: 1.25rem;
}
.results-meta {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 1rem; font-size: 0.85rem; color: #5a6a80; font-weight: 600;
}
.pagination-btns { display: flex; gap: 0.5rem; }
.page-btn {
  display: flex; align-items: center; gap: 0.3rem;
  background: #fff; border: 1.5px solid #dce3ed; border-radius: 7px;
  padding: 0.4rem 0.85rem; font-size: 0.82rem; font-weight: 600; color: #1B3A6B;
  cursor: pointer; font-family: inherit; transition: border-color 0.15s, background 0.15s;
}
.page-btn:hover:not(:disabled) { border-color: #1B3A6B; background: #EFF6FF; }
.page-btn:disabled { opacity: 0.4; cursor: not-allowed; }

/* ── Results grid ── */
.results-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.1rem; }
.item-card {
  background: #fff; border: 1px solid #eef1f6; border-radius: 12px;
  padding: 1.25rem; display: flex; flex-direction: column; gap: 0.5rem;
  box-shadow: 0 1px 4px rgba(27,58,107,0.06); transition: box-shadow 0.15s, border-color 0.15s, transform 0.15s;
}
.item-card:hover { box-shadow: 0 6px 20px rgba(27,58,107,0.11); border-color: #c7d4e8; transform: translateY(-2px); }
.card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.25rem; }
.item-id { font-size: 0.72rem; font-weight: 700; color: #9aabb8; letter-spacing: 0.5px; }
.item-price { display: flex; align-items: baseline; gap: 0.2rem; }
.price-value { font-size: 1.05rem; font-weight: 800; color: #1B3A6B; }
.price-label { font-size: 0.72rem; color: #9aabb8; font-weight: 600; }
.item-name { font-size: 0.95rem; font-weight: 700; color: #1a1a2e; margin: 0; line-height: 1.3; }
.item-desc {
  font-size: 0.82rem; color: #5a6a80; line-height: 1.6; margin: 0; flex: 1;
  display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
}
.card-footer { margin-top: 0.5rem; padding-top: 0.75rem; border-top: 1px solid #f5f7fa; }
.qty-badge {
  display: inline-flex; align-items: center; gap: 0.35rem;
  font-size: 0.78rem; font-weight: 700; padding: 0.3rem 0.7rem; border-radius: 999px;
}
.qty--green { background: #F0FDF4; color: #16A34A; }
.qty--amber { background: #FFFBEB; color: #D97706; }
.qty--red   { background: #FEF2F2; color: #DC2626; }

.empty-state, .initial-state {
  display: flex; flex-direction: column; align-items: center; gap: 0.75rem;
  padding: 4rem 1rem; text-align: center; color: #9aabb8;
}
.empty-state p, .initial-state p { font-size: 0.92rem; max-width: 360px; line-height: 1.6; margin: 0; }
.initial-state strong { color: #1B3A6B; }

/* ── Drawer ── */
.drawer-overlay {
  position: fixed; inset: 0;
  background: rgba(13, 31, 60, 0.45);
  z-index: 500;
  display: flex; justify-content: flex-end;
}

.drawer {
  width: 480px;
  max-width: 100vw;
  height: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
  box-shadow: -8px 0 40px rgba(27,58,107,0.18);
  overflow: hidden;
}

.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #eef1f6;
  flex-shrink: 0;
}
.drawer-header h3 { font-size: 1rem; font-weight: 800; color: #1B3A6B; margin: 0; }
.drawer-close {
  background: none; border: none; cursor: pointer; color: #9aabb8;
  padding: 4px; border-radius: 6px; display: flex; align-items: center; transition: color 0.15s;
}
.drawer-close:hover { color: #DC2626; }

/* Form inside drawer */
.drawer-form {
  flex: 1; overflow-y: auto; padding: 1.5rem; display: flex; flex-direction: column; gap: 1.1rem;
}

.form-error {
  display: flex; align-items: flex-start; gap: 0.5rem;
  background: #FEF2F2; border: 1px solid #fca5a5; color: #DC2626;
  padding: 0.75rem 1rem; border-radius: 8px; font-size: 0.85rem; line-height: 1.4;
}

.form-group { display: flex; flex-direction: column; gap: 0.4rem; }
.form-group label {
  font-size: 0.82rem; font-weight: 700; color: #1a1a2e;
  display: flex; align-items: center; gap: 0.4rem;
}
.req { color: #DC2626; }
.cat-loading { font-size: 0.75rem; font-weight: 500; color: #9aabb8; }

.form-group input,
.form-group select,
.form-group textarea {
  padding: 0.65rem 0.85rem;
  border: 1.5px solid #dce3ed;
  border-radius: 8px;
  font-size: 0.9rem;
  color: #1a1a2e;
  background: #F5F7FA;
  font-family: inherit;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
  appearance: none;
}
.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #1B3A6B; background: #fff; box-shadow: 0 0 0 3px rgba(27,58,107,0.08);
}
.form-group textarea { resize: vertical; min-height: 80px; }

.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }

/* Toggle switch */
.form-group--toggle {
  background: #F5F7FA; border: 1px solid #eef1f6; border-radius: 10px; padding: 1rem;
}
.toggle-label {
  display: flex; align-items: center; gap: 1rem; cursor: pointer; user-select: none;
  font-size: 0.88rem; font-weight: 600; color: #1a1a2e;
}
.toggle-label small { display: block; font-size: 0.75rem; font-weight: 400; color: #9aabb8; margin-top: 0.15rem; }

.toggle-switch {
  width: 44px; height: 24px; background: #dce3ed; border-radius: 999px;
  position: relative; transition: background 0.2s; flex-shrink: 0; cursor: pointer;
}
.toggle-switch.active { background: #1B3A6B; }
.toggle-thumb {
  position: absolute; top: 3px; left: 3px;
  width: 18px; height: 18px; background: #fff; border-radius: 50%;
  transition: transform 0.2s; box-shadow: 0 1px 4px rgba(0,0,0,0.2);
}
.toggle-switch.active .toggle-thumb { transform: translateX(20px); }

/* Electric field highlight */
.form-group--electric {
  background: #FFFBEB; border: 1px solid #fde68a; border-radius: 10px; padding: 1rem;
}
.form-group--electric label { color: #D97706; }
.form-group--electric input:focus { border-color: #D97706; box-shadow: 0 0 0 3px rgba(217,119,6,0.1); }

/* Slide-down transition */
.slide-down-enter-active, .slide-down-leave-active { transition: all 0.25s ease; overflow: hidden; }
.slide-down-enter-from, .slide-down-leave-to { opacity: 0; transform: translateY(-8px); max-height: 0; }
.slide-down-enter-to, .slide-down-leave-from { opacity: 1; transform: translateY(0); max-height: 200px; }

/* Drawer footer */
.drawer-footer {
  display: flex; gap: 0.75rem; padding: 1.25rem 1.5rem;
  border-top: 1px solid #eef1f6; flex-shrink: 0;
}
.btn-primary {
  flex: 1; display: flex; align-items: center; justify-content: center; gap: 0.5rem;
  background: #1B3A6B; color: #fff; border: none; border-radius: 8px;
  padding: 0.7rem; font-size: 0.9rem; font-weight: 700; cursor: pointer;
  font-family: inherit; transition: background 0.15s;
}
.btn-primary:hover:not(:disabled) { background: #0D1F3C; }
.btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
.btn-outline {
  flex: 0 0 auto; background: none; border: 1.5px solid #dce3ed; border-radius: 8px;
  padding: 0.7rem 1.25rem; font-size: 0.9rem; font-weight: 600; color: #5a6a80;
  cursor: pointer; font-family: inherit; transition: border-color 0.15s, color 0.15s;
}
.btn-outline:hover { border-color: #1B3A6B; color: #1B3A6B; }

/* Drawer success */
.drawer-success {
  flex: 1; display: flex; flex-direction: column; align-items: center;
  justify-content: center; gap: 0.75rem; padding: 2rem; text-align: center;
}
.success-icon {
  width: 72px; height: 72px; background: #F0FDF4; color: #16A34A;
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
}
.drawer-success h4 { font-size: 1.15rem; font-weight: 800; color: #1B3A6B; margin: 0; }
.drawer-success p { font-size: 0.88rem; color: #5a6a80; margin: 0; }
.success-actions { display: flex; gap: 0.75rem; margin-top: 0.5rem; }

/* Drawer open/close transition */
.drawer-enter-active, .drawer-leave-active { transition: opacity 0.2s ease; }
.drawer-enter-active .drawer, .drawer-leave-active .drawer { transition: transform 0.25s ease; }
.drawer-enter-from, .drawer-leave-to { opacity: 0; }
.drawer-enter-from .drawer, .drawer-leave-to .drawer { transform: translateX(100%); }

/* Responsive */
@media (max-width: 1100px) { .results-grid { grid-template-columns: repeat(2,1fr); } }
@media (max-width: 640px) {
  .search-panel { flex-direction: column; align-items: stretch; }
  .results-grid { grid-template-columns: 1fr; }
  .field-wrap--sm { flex: 1; }
  .form-row { grid-template-columns: 1fr; }
  .drawer { width: 100vw; }
}
</style>
