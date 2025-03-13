<template>
  <div class="navbar bg-base-100 shadow-md">
    <div class="flex-1">
      <span class="text-xl">CashCraft</span>
    </div>
    <div class="flex-none gap-2">
      <div class="stats shadow">
        <div class="stat">
          <div class="stat-title">Balance</div>
          <div class="stat-value">$10,000</div>
        </div>
      </div>
      <div class="stats shadow">
        <div class="stat">
          <div class="stat-title">Income</div>
          <div class="stat-value">$5,000</div>
        </div>
      </div>
      <div class="stats shadow">
        <div class="stat">
          <div class="stat-title">Expenses</div>
          <div class="stat-value">$2,000</div>
        </div>
      </div>
      <ThemeSwitcher />
    </div>
  </div>
</template>

<script setup>
import ThemeSwitcher from './ThemeSwitcher.vue';
</script>
