import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../pages/Dashboard.vue';
import Transactions from '../pages/Transactions.vue';
import Accounts from '../pages/Accounts.vue';
import Reporting from '../pages/Reporting.vue';

const routes = [
  { path: '/', redirect: '/uebersicht' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/transactions', name: 'Transactions', component: Transactions },
  { path: '/konten', name: 'Accounts', component: Accounts },
  { path: '/reporting', name: 'Reporting', component: Reporting },
  { path: '/kontoarten', name: 'AccountTypes', component: Reporting },
  { path: '/kontokategorien', name: 'AccountCategories', component: Reporting },
  { path: '/budgets', name: 'Budgets', component: Reporting },
  { path: '/schlagwoerter', name: 'Tags', component: Reporting },
  { path: '/kategorien', name: 'Categories', component: Reporting },
  { path: '/einstellungen', name: 'Settings', component: Reporting },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
