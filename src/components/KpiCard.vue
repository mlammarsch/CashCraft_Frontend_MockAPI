<template>
      <div class="stats border border-base-200 mx-1 relative">
        <div class="stat">
          <div class="stat-title text-sm text-base-300">{{ title }}</div>
          <div class="stat-value text-xl mr-2">{{ formattedValue }}</div>
          <div class="stat-desc">
            <span :class="trendClass">
              {{ formattedTrend }}
            </span>
          </div>
        </div>
        <Icon :icon="trendIcon" class="border-none w-8 h-8 absolute top-3 right-3" :class="iconClass" />
      </div>
    </template>

    <script setup>
    import { defineProps, computed } from 'vue';
    import { Icon } from '@iconify/vue';

    const props = defineProps({
      title: {
        type: String,
        required: true,
      },
      value: {
        type: Number,
        required: true,
      },
      trendValue: {
        type: Number,
        required: true,
      },
    });

    const formattedValue = computed(() => {
      return props.value ? props.value.toLocaleString('de-DE', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }) : 'N/A';
    });

    const formattedTrend = computed(() => {
      if (props.trendValue === 0 || props.trendValue === null || props.trendValue === undefined) {
        return '0,0% seit letztem Mt.';
      }

      const formattedTrendValue = props.trendValue.toLocaleString('de-DE', {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      });

      const sign = props.trendValue > 0 ? '+' : '';
      return `${sign}${formattedTrendValue.replace('.', ',')}% seit letztem Mt.`;
    });

    const trendClass = computed(() => {
      if (props.trendValue > 0) {
        return 'text-success text-xs';
      } else if (props.trendValue < 0) {
        return 'text-error text-xs';
      } else {
        return 'text-secondary text-xs';
      }
    });

    const trendIcon = computed(() => {
      if (props.trendValue >= 25) {
        return 'mynaui:arrow-up-circle';
      } else if (props.trendValue <= -25) {
        return 'mynaui:arrow-down-circle';
      } else if (props.trendValue === 0) {
        return 'mynaui:minus-circle';
      } else if (props.trendValue > 0) {
        return 'mynaui:arrow-up-right-circle';
      } else {
        return 'mynaui:arrow-down-right-circle';
      }
    });

    const iconClass = computed(() => {
      if (props.trendValue > 0) {
        return 'text-success';
      } else if (props.trendValue < 0) {
        return 'text-error';
      } else {
        return 'text-secondary';
      }
    });
    </script>
