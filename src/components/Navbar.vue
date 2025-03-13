<template>
  <div class="navbar bg-base-100 shadow-none border-b border-base-200">
    <div class="flex-1">
      <span class="text-xl font-bold text-base-200 mx-2 flex items-center">{{ routeName }}</span>
    </div>
    <div class="flex-none gap-2 items-center">
      <div class="stats border border-base-200 mx-1 relative">
        <div class="stat">
          <div class="stat-title text-sm text-base-300">Kontostand</div>
          <div class="stat-value text-xl">$10,000</div>
          <div class="stat-desc">
            <span class="text-success text-xs">
              +7,5% seit letztem Mt
            </span>
          </div>
        </div>
        <Icon icon="mynaui:arrow-up-right-circle" class="border-none w-8 h-8 absolute top-3 right-3 text-success" />
      </div>
      <div class="stats border border-base-200 mx-1 relative">
        <div class="stat">
          <div class="stat-title text-sm text-base-300">Einkommen</div>
          <div class="stat-value text-xl">$5,000</div>
          <div class="stat-desc">
            <span class="text-error">
              -2% seit letztem Mt.
            </span>
          </div>
        </div>
        <Icon icon="mynaui:arrow-down-right-circle" class="border-none w-8 h-8 absolute top-3 right-3 text-error" />
      </div>
      <div class="stats border border-base-200 mx-1 relative">
        <div class="stat">
          <div class="stat-title text-sm text-base-300">Ausgaben</div>
          <div class="stat-value text-xl">$2,000</div>
          <div class="stat-desc">
            <span class="text-success">
              +1% seit letztem Mt
            </span>
          </div>
        </div>
        <Icon icon="mynaui:arrow-up-right-circle" class="border-none w-8 h-8 absolute top-3 right-3 text-success" />
      </div>
      <ThemeSwitcher class="mx-4" />
    </div>
  </div>
</template>

<script setup>
import ThemeSwitcher from './ThemeSwitcher.vue';
import { Icon } from '@iconify/vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();

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
