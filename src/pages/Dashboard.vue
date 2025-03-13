<template>
      <div>
        <h1>Übersicht</h1>
        <p>Willkommen zu deiner persönlichen Finanzübersicht!</p>
        <div class="kpi-container">
        </div>
        <div class="account-container mt-4">
          <h2>Konten</h2>
          <div class="flex flex-wrap gap-4 mt-2">
            <AccountCard
              v-for="account in accounts"
              :key="account.id"
              :kontoname="account.kontoname"
              :bezeichnung="account.bezeichnung"
              :logo="account.logo"
              :saldo="account.saldo"
              :iban="account.iban"
              :type="account.type"
              :id="account.id"
            />
          </div>
        </div>
      </div>
    </template>

    <script setup>
    import { useKpiStore } from '../stores/kpi';
    import KpiCard from '../components/KpiCard.vue';
    import { computed } from 'vue';
    import AccountCard from '../components/AccountCard.vue';
    import { useAccountsStore } from '../stores/accounts';

    const kpiStore = useKpiStore();
    const kpis = computed(() => kpiStore.getKpis);

    const accountsStore = useAccountsStore();
    const accounts = computed(() => accountsStore.getAccounts);
    </script>

    <style scoped>
    .kpi-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
    }

    .account-container {
      display: block;
    }
    </style>
