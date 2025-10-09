import { defineStore } from 'pinia';
import api from '@/services/api';
import { loadStripe, type Stripe } from '@stripe/stripe-js';

export interface Transaction {
  id: number;
  user_id: number;
  type: 'top-up' | 'deduct';
  amount: number;
  description?: string;
  created_at: string;
  balance_after: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const useWalletStore = defineStore('wallet', {
  state: () => ({
    transactions: [] as Transaction[],
    stripe: null as Stripe | null,
    publishableKey: '' as string,
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
        const { data } = await api.get<ApiResponse<{ publishable_key: string }>>('/wallet/publishable-key');
        this.publishableKey = data.data.publishable_key;
      } catch (error) {
        console.error('[Wallet Store] Fetch publishable key failed:', error);
        throw error;
      }
    },
    async createPaymentIntent(amount: number): Promise<string> {
      try {
        const { data } = await api.post<ApiResponse<{ client_secret: string }>>(
          '/wallet/create-payment-intent',
          { amount }
        );
        return data.data.client_secret;
      } catch (error) {
        console.error('[Wallet Store] Create payment intent failed:', error);
        throw error;
      }
    },
    async fetchTransactions() {
      try {
        const { data } = await api.get<ApiResponse<Transaction[]>>(
          '/wallet/transactions'
        );
        this.transactions = data.data;
        return data.data;
      } catch (error) {
        console.error('[Wallet Store] Fetch transactions failed:', error);
        throw error;
      }
    },
  },
});