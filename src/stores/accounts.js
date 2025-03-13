import { defineStore } from 'pinia';
    import { v4 as uuidv4 } from 'uuid';

    export const useAccountsStore = defineStore('accounts', {
      state: () => ({
        accounts: [
          {
            id: uuidv4(),
            kontoname: 'Sparkonto',
            bezeichnung: 'Savings',
            notiz: 'Mein Sparkonto',
            logo: 'https://placehold.co/400x400?text=Sparkonto',
            saldo: 12480.50,
            iban: 'DE12345678901234567890',
            type: 'savings',
          },
          {
            id: uuidv4(),
            kontoname: 'Girokonto',
            bezeichnung: 'Checking Account',
            notiz: 'Tägliches Konto',
            logo: 'https://placehold.co/400x400?text=Girokonto',
            saldo: -500.20,
            iban: 'DE09876543210987654321',
            type: 'checking',
          },
          {
            id: uuidv4(),
            kontoname: 'Kreditkarte',
            bezeichnung: 'Credit Card',
            notiz: 'Für unerwartete Ausgaben',
            logo: 'https://placehold.co/400x400?text=Kreditkarte',
            saldo: 250.75,
            iban: 'DE54321098765432109876',
            type: 'credit',
          },
        ],
      }),
      getters: {
        getAccounts: (state) => state.accounts,
      },
    });
