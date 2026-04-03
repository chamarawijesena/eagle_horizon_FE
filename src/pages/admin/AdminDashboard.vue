<script setup lang="ts">
const today = new Date().toLocaleDateString('en-AU', {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
})

const kpiCards = [
  {
    label: 'Active Orders',
    value: '138',
    delta: '+12 this week',
    trend: 'up',
    color: '#2563EB',
    bg: '#EFF6FF',
    icon: '<path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/>',
  },
  {
    label: 'Inventory Items',
    value: '1,842',
    delta: '17 low stock',
    trend: 'warn',
    color: '#16A34A',
    bg: '#F0FDF4',
    icon: '<path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>',
  },
  {
    label: 'Pending Returns',
    value: '23',
    delta: '5 awaiting inspection',
    trend: 'warn',
    color: '#D97706',
    bg: '#FFFBEB',
    icon: '<polyline points="1 4 1 10 7 10"/><polyline points="23 20 23 14 17 14"/><path d="M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15"/>',
  },
  {
    label: 'Overdue / Delayed',
    value: '9',
    delta: '3 critical',
    trend: 'down',
    color: '#DC2626',
    bg: '#FEF2F2',
    icon: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',
  },
  {
    label: 'Active Customers',
    value: '392',
    delta: '+8 this month',
    trend: 'up',
    color: '#2563EB',
    bg: '#EFF6FF',
    icon: '<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>',
  },
  {
    label: 'Maintenance Tickets',
    value: '11',
    delta: '4 urgent',
    trend: 'warn',
    color: '#D97706',
    bg: '#FFFBEB',
    icon: '<path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>',
  },
]

const recentOrders = [
  { id: 'ORD-2041', customer: 'Meridian Corp', items: 14, value: '$12,400', status: 'processing', date: 'Today, 9:12am' },
  { id: 'ORD-2040', customer: 'Harlan Homes', items: 6, value: '$8,750', status: 'delivered', date: 'Today, 8:05am' },
  { id: 'ORD-2039', customer: 'Park & Lane Pty', items: 32, value: '$31,200', status: 'pending', date: 'Yesterday, 4:44pm' },
  { id: 'ORD-2038', customer: 'J. Thornton Group', items: 4, value: '$5,600', status: 'delivered', date: 'Yesterday, 1:20pm' },
  { id: 'ORD-2037', customer: 'Sunrise Builders', items: 21, value: '$18,900', status: 'overdue', date: '1 Apr, 10:00am' },
]

const statusMap: Record<string, { label: string; cls: string }> = {
  processing: { label: 'Processing', cls: 'status--blue' },
  delivered:  { label: 'Delivered',  cls: 'status--green' },
  pending:    { label: 'Pending',    cls: 'status--amber' },
  overdue:    { label: 'Overdue',    cls: 'status--red' },
}

const inventoryAlerts = [
  { name: 'Portland Cement 50kg', current: 12, threshold: 50, unit: 'bags', severity: 'critical' },
  { name: 'Rebar 12mm', current: 80, threshold: 200, unit: 'rods', severity: 'low' },
  { name: 'Plywood Sheets 18mm', current: 25, threshold: 60, unit: 'sheets', severity: 'low' },
  { name: 'Concrete Mix Bags', current: 5, threshold: 30, unit: 'bags', severity: 'critical' },
]

const maintenanceQueue = [
  { id: 'TKT-091', desc: 'Site A — Crane hydraulic check', priority: 'urgent', assignee: 'R. Patel', due: 'Overdue' },
  { id: 'TKT-090', desc: 'Warehouse — Forklift service', priority: 'medium', assignee: 'S. Nguyen', due: 'Apr 5' },
  { id: 'TKT-089', desc: 'Office — AC unit not cooling', priority: 'low', assignee: 'Unassigned', due: 'Apr 8' },
  { id: 'TKT-088', desc: 'Site B — Scaffolding inspection', priority: 'urgent', assignee: 'T. Walsh', due: 'Overdue' },
]

const priorityMap: Record<string, { cls: string }> = {
  urgent: { cls: 'priority--red' },
  medium: { cls: 'priority--amber' },
  low:    { cls: 'priority--blue' },
}

const quickActions = [
  { label: 'New Order',      to: '/admin/orders',      icon: '<path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><line x1="12" y1="11" x2="12" y2="17"/><line x1="9" y1="14" x2="15" y2="14"/>' },
  { label: 'Add Customer',   to: '/admin/customers',   icon: '<path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/>' },
  { label: 'Create Invoice', to: '/admin/invoices',    icon: '<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="11" x2="12" y2="17"/><line x1="9" y1="14" x2="15" y2="14"/>' },
  { label: 'Log Return',     to: '/admin/returns',     icon: '<polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1014.85 3.36L23 14"/>' },
  { label: 'Add Inventory',  to: '/admin/inventory',   icon: '<path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><line x1="12" y1="12" x2="12" y2="22"/><line x1="12" y1="12" x2="20.73" y2="6.96"/>' },
  { label: 'New Ticket',     to: '/admin/maintenance', icon: '<path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>' },
]

function stockPct(current: number, threshold: number) {
  return Math.min(100, Math.round((current / threshold) * 100))
}
</script>

<template>
  <div class="dashboard">
    <!-- Header -->
    <div class="dash-header">
      <div>
        <h2>Good morning, Admin</h2>
        <p class="dash-date">{{ today }}</p>
      </div>
      <RouterLink to="/admin/orders" class="btn-primary">View All Orders</RouterLink>
    </div>

    <!-- KPI Cards -->
    <div class="kpi-grid">
      <div v-for="card in kpiCards" :key="card.label" class="kpi-card">
        <div class="kpi-icon" :style="{ background: card.bg }">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            :stroke="card.color" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"
            v-html="card.icon"></svg>
        </div>
        <div class="kpi-body">
          <span class="kpi-label">{{ card.label }}</span>
          <span class="kpi-value">{{ card.value }}</span>
          <span class="kpi-delta" :class="{
            'delta--up': card.trend === 'up',
            'delta--warn': card.trend === 'warn',
            'delta--down': card.trend === 'down',
          }">
            <svg v-if="card.trend === 'up'" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"/></svg>
            <svg v-else-if="card.trend === 'down'" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
            <svg v-else width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="1"/></svg>
            {{ card.delta }}
          </span>
        </div>
      </div>
    </div>

    <!-- Panels grid -->
    <div class="panels-grid">

      <!-- Recent Orders (full width) -->
      <div class="panel panel--full">
        <div class="panel-header">
          <h3>Recent Orders</h3>
          <RouterLink to="/admin/orders" class="panel-link">View all →</RouterLink>
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Value</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in recentOrders" :key="order.id">
                <td class="order-id">{{ order.id }}</td>
                <td>{{ order.customer }}</td>
                <td>{{ order.items }}</td>
                <td class="order-value">{{ order.value }}</td>
                <td class="order-date">{{ order.date }}</td>
                <td>
                  <span class="status-badge" :class="statusMap[order.status]?.cls">
                    {{ statusMap[order.status]?.label }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Inventory Alerts -->
      <div class="panel">
        <div class="panel-header">
          <h3>Inventory Alerts</h3>
          <RouterLink to="/admin/inventory" class="panel-link">Manage →</RouterLink>
        </div>
        <div class="alert-list">
          <div v-for="item in inventoryAlerts" :key="item.name" class="alert-item">
            <div class="alert-top">
              <span class="alert-name">{{ item.name }}</span>
              <span class="alert-severity" :class="item.severity === 'critical' ? 'sev--red' : 'sev--amber'">
                {{ item.severity }}
              </span>
            </div>
            <div class="stock-bar-wrap">
              <div class="stock-bar">
                <div
                  class="stock-fill"
                  :style="{ width: stockPct(item.current, item.threshold) + '%' }"
                  :class="item.severity === 'critical' ? 'fill--red' : 'fill--amber'"
                ></div>
              </div>
              <span class="stock-nums">{{ item.current }} / {{ item.threshold }} {{ item.unit }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Maintenance Queue -->
      <div class="panel">
        <div class="panel-header">
          <h3>Maintenance Queue</h3>
          <RouterLink to="/admin/maintenance" class="panel-link">View all →</RouterLink>
        </div>
        <div class="ticket-list">
          <div v-for="ticket in maintenanceQueue" :key="ticket.id" class="ticket-item">
            <div class="ticket-top">
              <span class="ticket-id">{{ ticket.id }}</span>
              <span class="priority-badge" :class="priorityMap[ticket.priority]?.cls">{{ ticket.priority }}</span>
            </div>
            <p class="ticket-desc">{{ ticket.desc }}</p>
            <div class="ticket-meta">
              <span>{{ ticket.assignee }}</span>
              <span :class="ticket.due === 'Overdue' ? 'due--red' : 'due--normal'">{{ ticket.due }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="panel panel--full">
        <div class="panel-header">
          <h3>Quick Actions</h3>
        </div>
        <div class="quick-grid">
          <RouterLink v-for="action in quickActions" :key="action.label" :to="action.to" class="quick-action">
            <div class="quick-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" v-html="action.icon"></svg>
            </div>
            <span>{{ action.label }}</span>
          </RouterLink>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.dashboard {
  max-width: 1400px;
}

/* Header */
.dash-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.75rem;
  gap: 1rem;
  flex-wrap: wrap;
}

.dash-header h2 {
  font-size: 1.3rem;
  font-weight: 800;
  color: #1B3A6B;
  margin: 0 0 0.2rem;
}

.dash-date {
  font-size: 0.82rem;
  color: #9aabb8;
  margin: 0;
}

.btn-primary {
  display: inline-block;
  background: #1B3A6B;
  color: #fff;
  font-weight: 700;
  font-size: 0.85rem;
  padding: 0.6rem 1.25rem;
  border-radius: 8px;
  text-decoration: none;
  transition: background 0.15s;
  white-space: nowrap;
}

.btn-primary:hover {
  background: #0D1F3C;
}

/* KPI Grid */
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.kpi-card {
  background: #fff;
  border-radius: 12px;
  padding: 1.25rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  box-shadow: 0 1px 4px rgba(27,58,107,0.07);
  border: 1px solid #eef1f6;
  transition: box-shadow 0.15s;
}

.kpi-card:hover {
  box-shadow: 0 4px 16px rgba(27,58,107,0.12);
}

.kpi-icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.kpi-body {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.kpi-label {
  font-size: 0.78rem;
  color: #9aabb8;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.kpi-value {
  font-size: 1.6rem;
  font-weight: 800;
  color: #1B3A6B;
  line-height: 1.1;
}

.kpi-delta {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.78rem;
  font-weight: 600;
}

.delta--up   { color: #16A34A; }
.delta--warn { color: #D97706; }
.delta--down { color: #DC2626; }

/* Panels */
.panels-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
}

.panel {
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 4px rgba(27,58,107,0.07);
  border: 1px solid #eef1f6;
}

.panel--full {
  grid-column: 1 / -1;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
}

.panel-header h3 {
  font-size: 0.95rem;
  font-weight: 700;
  color: #1B3A6B;
  margin: 0;
}

.panel-link {
  font-size: 0.8rem;
  color: #2563EB;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.15s;
}

.panel-link:hover { color: #1B3A6B; }

/* Table */
.table-wrap {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.data-table th {
  text-align: left;
  font-size: 0.75rem;
  font-weight: 700;
  color: #9aabb8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid #f0f2f5;
  white-space: nowrap;
}

.data-table td {
  padding: 0.75rem;
  border-bottom: 1px solid #f9fafb;
  color: #1a1a2e;
  white-space: nowrap;
}

.data-table tr:last-child td { border-bottom: none; }

.data-table tr:hover td { background: #fafbfc; }

.order-id { font-weight: 700; color: #1B3A6B; font-size: 0.82rem; }
.order-value { font-weight: 700; }
.order-date { color: #9aabb8; font-size: 0.82rem; }

/* Status badges */
.status-badge {
  display: inline-block;
  font-size: 0.73rem;
  font-weight: 700;
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
  text-transform: capitalize;
}

.status--blue  { background: #EFF6FF; color: #2563EB; }
.status--green { background: #F0FDF4; color: #16A34A; }
.status--amber { background: #FFFBEB; color: #D97706; }
.status--red   { background: #FEF2F2; color: #DC2626; }

/* Inventory alerts */
.alert-list { display: flex; flex-direction: column; gap: 1rem; }

.alert-item { display: flex; flex-direction: column; gap: 0.4rem; }

.alert-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.alert-name { font-size: 0.875rem; font-weight: 600; color: #1a1a2e; }

.alert-severity {
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.15rem 0.55rem;
  border-radius: 999px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.sev--red   { background: #FEF2F2; color: #DC2626; }
.sev--amber { background: #FFFBEB; color: #D97706; }

.stock-bar-wrap {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.stock-bar {
  flex: 1;
  height: 6px;
  background: #f0f2f5;
  border-radius: 999px;
  overflow: hidden;
}

.stock-fill {
  height: 100%;
  border-radius: 999px;
  transition: width 0.3s;
}

.fill--red   { background: #DC2626; }
.fill--amber { background: #D97706; }

.stock-nums {
  font-size: 0.75rem;
  color: #9aabb8;
  white-space: nowrap;
}

/* Tickets */
.ticket-list { display: flex; flex-direction: column; gap: 0.75rem; }

.ticket-item {
  padding: 0.85rem;
  border: 1px solid #f0f2f5;
  border-radius: 8px;
  background: #fafbfc;
  transition: border-color 0.15s;
}

.ticket-item:hover { border-color: #dce3ed; }

.ticket-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.3rem;
}

.ticket-id { font-size: 0.78rem; font-weight: 700; color: #1B3A6B; }

.priority-badge {
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.15rem 0.55rem;
  border-radius: 999px;
  text-transform: uppercase;
}

.priority--red   { background: #FEF2F2; color: #DC2626; }
.priority--amber { background: #FFFBEB; color: #D97706; }
.priority--blue  { background: #EFF6FF; color: #2563EB; }

.ticket-desc {
  font-size: 0.85rem;
  color: #1a1a2e;
  margin: 0 0 0.4rem;
}

.ticket-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.78rem;
  color: #9aabb8;
}

.due--red { color: #DC2626; font-weight: 700; }
.due--normal { color: #9aabb8; }

/* Quick actions */
.quick-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.75rem;
}

.quick-action {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  border: 1.5px solid #eef1f6;
  border-radius: 10px;
  text-decoration: none;
  color: #1a1a2e;
  font-size: 0.78rem;
  font-weight: 600;
  text-align: center;
  transition: border-color 0.15s, background 0.15s, color 0.15s;
}

.quick-action:hover {
  border-color: #1B3A6B;
  background: #EFF6FF;
  color: #1B3A6B;
}

.quick-icon {
  width: 40px;
  height: 40px;
  background: #F5F7FA;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1B3A6B;
  transition: background 0.15s;
}

.quick-action:hover .quick-icon {
  background: #dbeafe;
}

/* Responsive */
@media (max-width: 1200px) {
  .kpi-grid { grid-template-columns: repeat(3, 1fr); }
  .quick-grid { grid-template-columns: repeat(3, 1fr); }
}

@media (max-width: 900px) {
  .kpi-grid { grid-template-columns: repeat(2, 1fr); }
  .panels-grid { grid-template-columns: 1fr; }
  .panel--full { grid-column: auto; }
  .quick-grid { grid-template-columns: repeat(3, 1fr); }
}

@media (max-width: 560px) {
  .kpi-grid { grid-template-columns: 1fr; }
  .quick-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>
