<template>
  <div class="navbar bg-base-100 shadow-none border-b border-base-200">
    <div class="flex-1">
      <span class="text-xl font-bold text-base-200 mx-2 flex items-center">{{ routeName }}</span>
    </div>
    <div class="flex-none gap-2 items-center">
      <KpiCard
        v-for="kpi in kpis"
        :key="kpi.id"
        :title="kpi.title"
        :value="kpi.value"
        :trendValue="kpi.trendValue"
      />
      <ThemeSwitcher class="mx-4" />
    </div>
  </div>
</template>

<script setup>
import ThemeSwitcher from './ThemeSwitcher.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import KpiCard from './KpiCard.vue';
import { useKpiStore } from '../stores/kpi';

const route = useRoute();
const kpiStore = useKpiStore();
const kpis = kpiStore.getKpis;

const routeName = computed(() => {
  switch (route.name) {
    case 'Dashboard':
      return 'Dashboard';
    case 'Transactions':
      return 'Transaktionen';
    case 'Accounts':
      return 'Konten';
    case 'Reporting':
      return 'Reporting';
    case 'AccountTypes':
      return 'Kontotypen';
    case 'AccountCategories':
      return 'Kontokategorien';
    case 'Budgets':
      return 'Budgets';
    case 'Tags':
      return 'Schlagwörter';
    case 'Categories':
      return 'Kategorien';
    case 'Settings':
      return 'Einstellungen';
    default:
      return route.name;
  }
});
</script>
