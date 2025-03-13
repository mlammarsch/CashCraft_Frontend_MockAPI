import { defineStore } from 'pinia';

export const useTenantsStore = defineStore('tenants', {
  state: () => ({
    tenants: [],
    selectedTenantId: null,
  }),
  actions: {
    setTenants(tenants) {
      this.tenants = tenants;
    },
    setSelectedTenantId(id) {
      this.selectedTenantId = id;
    },
  },
});
