import { defineStore } from 'pinia';
import api from '@/services/api';
import { loadStripe } from '@stripe/stripe-js';
export const useWalletStore = defineStore('wallet', {
    state: () => ({
        transactions: [],
        stripe: null,
        publishableKey: '',
    }),
    actions: {
        async initStripe() {
            if (!this.publishableKey) {
                await this.fetchPublishableKey();
            }
            if (!this.stripe) {
                this.stripe = await loadStripe(this.publishableKey);
            }
            return this.stripe;
        },
        async fetchPublishableKey() {
            try {
                const { data } = await api.get('/wallet/publishable-key');
                this.publishableKey = data.data.publishable_key;
            }
            catch (error) {
                console.error('[Wallet Store] Fetch publishable key failed:', error);
                throw error;
            }
        },
        async createPaymentIntent(amount) {
            try {
                const { data } = await api.post('/wallet/create-payment-intent', { amount });
                return data.data.client_secret;
            }
            catch (error) {
                console.error('[Wallet Store] Create payment intent failed:', error);
                throw error;
            }
        },
        async fetchTransactions() {
            try {
                const { data } = await api.get('/wallet/transactions');
                this.transactions = data.data;
                return data.data;
            }
            catch (error) {
                console.error('[Wallet Store] Fetch transactions failed:', error);
                throw error;
            }
        },
    },
});
