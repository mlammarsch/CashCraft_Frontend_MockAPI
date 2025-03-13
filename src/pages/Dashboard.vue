<template>
  <div>
    <h1>Übersicht</h1>
    <p>Willkommen zu deiner persönlichen Finanzübersicht!</p>
    <div class="kpi-container">
    </div>
  </div>
</template>

<script setup>
import { useKpiStore } from '../stores/kpi';
import KpiCard from '../components/KpiCard.vue';
import { computed } from 'vue';

const kpiStore = useKpiStore();
const kpis = computed(() => kpiStore.getKpis);
</script>

<style scoped>
.kpi-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
