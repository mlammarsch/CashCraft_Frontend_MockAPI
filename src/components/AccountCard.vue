<template>
      <div class="card border border-base-200 shadow-none" style="max-width: 600px; width: 100%;">
        <div class="card-body py-2">
          <div class="grid grid-cols-[64px_1fr] gap-2 items-center">
            <div class="flex justify-center items-center">
              <img :src="logo" alt="Account Logo" class="w-16 h-16 rounded-full" />
            </div>
            <div class="grid grid-rows-[auto_auto_auto] m-1 pl-2 py-1">
              <h2 class="card-title m-0 p-0 text-lg">{{ kontoname }}</h2>
              <div class="text-sm m-0 p-0">{{ bezeichnung }}</div>
              <div class="text-sm opacity-50  m-0 pt-1">{{ formattedIban }}</div>
            </div>
            <div class="absolute top-1/2 right-4 transform -translate-y-1/2">
              <div :class="saldoClass" class="text-right font-bold">{{ formattedSaldo }}</div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <script setup>
    import { defineProps, computed } from 'vue';

    const props = defineProps({
      kontoname: {
        type: String,
        required: true,
      },
      bezeichnung: {
        type: String,
        required: true,
      },
      notiz: {
        type: String,
        default: '',
      },
      logo: {
        type: String,
        default: 'https://placehold.co/400x400?text=Logo',
      },
      saldo: {
        type: Number,
        required: true,
      },
      iban: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        default: '',
      },
      id: {
        type: String,
        required: true,
      },
    });

    const formattedSaldo = computed(() => {
      const roundedSaldo = Math.round(props.saldo);
      return roundedSaldo.toLocaleString('de-DE', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    });

    const saldoClass = computed(() => {
      if (props.saldo > 0) {
        return 'text-success';
      } else if (props.saldo < 0) {
        return 'text-error';
      } else {
        return 'text-base-100';
      }
    });

    const formattedIban = computed(() => {
      const iban = props.iban.replace(/\s/g, ''); // Remove existing spaces
      return iban.match(/.{1,4}/g)?.join(' ') || iban; // Insert space every 4 characters
    });
    </script>
