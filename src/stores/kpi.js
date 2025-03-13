import { defineStore } from 'pinia';

export const useKpiStore = defineStore('kpi', {
  state: () => ({
    kpis: [
      {
        id: 1,
        title: 'Kontostand',
        value: 10000.50,
        trendValue: 27.57,
      },
      {
        id: 2,
        title: 'Einkommen',
        value: 5000.25,
        trendValue: -2.0,
      },
      {
        id: 3,
        title: 'Ausgaben',
        value: 2000.75,
        trendValue: 0,
      },
    ],
  }),
  getters: {
    getKpis: (state) => state.kpis,
  },
});
