<template>
  <div class="sidebar-container" :class="{'sidebar-collapsed': isCollapsed}">
    <div class="sidebar bg-base-200 min-h-screen transition-all duration-300 overflow-hidden">
      <!-- Logo-Bereich -->
      <div class="p-4 flex items-center justify-start">
        <div class="flex items-center gap-2">
          <div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <span class="text-primary-content font-bold text-lg">CC</span>
          </div>
          <h1 v-show="!isCollapsed" class="text-xl font-bold truncate">CashCraft</h1>
        </div>
      </div>
      
      <!-- Navigation Links -->
      <ul class="menu menu-sm bg-base-200 transition-all duration-300">
        <li v-for="(item, index) in menuItems" :key="index">
          <template v-if="item.children">
            <div class="menu-item-parent" @click="toggleExpand(index)">
              <Icon :icon="item.icon" class="text-2xl" />
              <span v-show="!isCollapsed" class="truncate">{{ item.label }}</span>
              <i v-show="!isCollapsed" :class="[expandedIndex === index ? 'fas fa-chevron-down' : 'fas fa-chevron-right']" class="ml-auto"></i>
            </div>
            <ul v-if="expandedIndex === index">
              <li v-for="(child, cIndex) in item.children" :key="cIndex">
                <router-link :to="child.path" :class="{'active': isActive(child.path)}" class="flex items-center gap-3 py-2 pl-8">
                  <span v-show="!isCollapsed" class="truncate">{{ child.label }}</span>
                </router-link>
              </li>
            </ul>
          </template>
          <template v-else>
            <router-link :to="item.path" :class="{'active': isActive(item.path)}" class="flex items-center gap-3 py-3">
              <Icon :icon="item.icon" class="text-2xl" />
              <span v-show="!isCollapsed" class="truncate">{{ item.label }}</span>
            </router-link>
          </template>
        </li>
      </ul>
      
      <!-- User Section -->
      <div class="absolute bottom-0 w-full p-4">
        <div class="flex items-center gap-2">
          <div class="avatar">
            <div class="w-10 h-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
              <span class="font-bold">{{ userInitials }}</span>
            </div>
          </div>
          <div v-show="!isCollapsed" class="overflow-hidden">
            <p class="font-medium truncate">{{ username }}</p>
            <p class="text-xs text-gray-500 truncate">Mandant: {{ currentTenantName }}</p>
            <button class="btn btn-ghost btn-xs text-base-content/70 px-0" @click="logout">
              Abmelden
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { useTenantsStore } from '../stores/tenants';
import { Icon } from '@iconify/vue';

const props = defineProps({
  collapsed: { type: Boolean, default: false }
});

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const tenantsStore = useTenantsStore();

const isCollapsed = computed(() => props.collapsed);

const username = computed(() => authStore.user ? authStore.user.username : 'Benutzer');
const userInitials = computed(() => authStore.user?.username ? authStore.user.username.charAt(0).toUpperCase() : 'U');
const currentTenantName = computed(() => {
  const tenant = tenantsStore.tenants.find(t => t.id === tenantsStore.selectedTenantId);
  return tenant ? tenant.name : 'Kein Mandant';
});

const menuItems = [
  { label: 'Dashboard', path: '/dashboard', icon: 'mdi-light:home' },
  { 
    label: 'Konten', 
    icon: 'mdi-light:bank',
    children: [
      { label: 'Übersicht', path: '/accounts' },
      { label: 'Kontotypen', path: '/account-types' },
      { label: 'Kontokategorien', path: '/account-categories' }
    ]
  },
  { label: 'Budgets', path: '/budgets', icon: 'mdi-light:chart-pie' },
  { label: 'Reporting', path: '/reporting', icon: 'mdi-light:chart-line' },
  { label: 'Tags', path: '/tags', icon: 'mdi-light:tag' },
  { label: 'Kategorien', path: '/categories', icon: 'mdi-light:folder' },
  { label: 'Einstellungen', path: '/settings', icon: 'mdi-light:settings' }
];

const expandedIndex = ref(null);
function toggleExpand(index) {
  expandedIndex.value = expandedIndex.value === index ? null : index;
}

const isActive = path => route.path === path;

const logout = async () => {
  authStore.logout();
  await router.push('/login');
};
</script>

<style scoped>
.sidebar-container {
  position: relative;
  height: 100%;
  z-index: 10;
}
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
}
.sidebar-collapsed .sidebar {
  width: 70px;
}
.menu-item-parent {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.75rem 1rem;
}
</style>
