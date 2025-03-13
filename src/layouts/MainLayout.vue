<template>
  <div class="layout-container">
    <!-- Sidebar -->
    <Sidebar :collapsed="sidebarCollapsed"></Sidebar>

    <!-- Main Content -->
    <div
      class="main-content transition-all duration-300"
      :class="{'sidebar-expanded': !sidebarCollapsed}"
    >
      <!-- Navbar: Wird hier einheitlich eingebunden -->
      <Navbar
        :title="pageTitle"
        :sidebarCollapsed="sidebarCollapsed"
        @toggle-sidebar="toggleSidebar"
      ></Navbar>

      <!-- Page Content: Suspense fängt asynchrone Setup-Promises ab -->
      <div class="page-content">
        <Suspense>
          <template #default>
            <router-view />
          </template>
          <template #fallback>
            <div class="loading">Lade Inhalte...</div>
          </template>
        </Suspense>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import Sidebar from '../components/Sidebar.vue';
import Navbar from '../components/Navbar.vue';

const route = useRoute();
const sidebarCollapsed = ref(localStorage.getItem('sidebarCollapsed') === 'true');

const pageTitle = computed(() => {
  switch (route.name) {
    case 'Dashboard': return 'Dashboard';
    case 'Accounts': return 'Konten';
    case 'AccountTypes': return 'Kontotypen';
    case 'AccountCategories': return 'Kontokategorien';
    case 'Budgets': return 'Budgets';
    case 'Reporting': return 'Berichte';
    case 'Tags': return 'Tags';
    case 'Categories': return 'Kategorien';
    case 'Settings': return 'Einstellungen';
    default: return 'CashCraft';
  }
});

const toggleSidebar = (value) => {
  sidebarCollapsed.value = value !== undefined ? value : !sidebarCollapsed.value;
  localStorage.setItem('sidebarCollapsed', sidebarCollapsed.value.toString());
};

watch(route, () => {
  document.title = `CashCraft - ${pageTitle.value}`;
});
</script>

<style scoped>
.layout-container {
  display: flex;
  height: 100vh;
  overflow: hidden;
}
.main-content {
  flex: 1;
  margin-left: 70px;
  width: calc(100% - 70px);
  display: flex;
  flex-direction: column;
}
.main-content.sidebar-expanded {
  margin-left: 250px;
  width: calc(100% - 250px);
}
.page-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  background-color: var(--base-200);
}
@media (max-width: 768px) {
  .main-content,
  .main-content.sidebar-expanded {
    margin-left: 0;
    width: 100%;
  }
}
.loading {
  padding: 1rem;
  text-align: center;
}
</style>
