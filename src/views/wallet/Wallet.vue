<template>
  <div class="space-y-8">
    <!-- Wallet Title -->
    <h1 class="text-3xl font-bold text-neutral-900 dark:text-white">Wallet</h1>

    <!-- Wallet Card -->
    <div class="card bg-primary-600 text-white">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-lg font-semibold text-white opacity-90">Your Balance</h2>
        <span class="text-sm text-white opacity-80">{{ new Date().toLocaleDateString() }}</span>
      </div>
      <div class="text-4xl font-bold tracking-wide">
        PKR {{ formattedBalance }}
      </div>
      <div class="flex justify-between text-sm text-white opacity-80 mt-4">
        <span class="italic">Active</span>
      </div>
    </div>

    <!-- Top Up Form with Stripe -->
    <div class="card backdrop-blur">
      <form @submit.prevent="handleTopUp" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Top Up Amount (USD)
          </label>
          <input
            v-model.number="amount"
            type="number"
            min="1"
            step="0.01"
            placeholder="Enter amount in USD"
            class="w-full px-4 py-3 text-base border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-sm"
            required
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Card Information
          </label>
          <div id="card-element" class="p-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800"></div>
        </div>
        <div id="card-errors" class="text-red-500 text-sm"></div>
        <button
          type="submit"
          :disabled="loading"
          class="btn-3d btn-3d-border w-full"
        >
          {{ loading ? 'Processing...' : 'Top Up Now' }}
        </button>
      </form>
    </div>

    <!-- Transaction History -->
    <div class="card backdrop-blur">
      <h2 class="text-xl font-semibold text-neutral-900 dark:text-white mb-4">Transaction History</h2>

      <div v-if="paginatedItems.length > 0" class="space-y-4">
        <div
          v-for="transaction in paginatedItems"
          :key="transaction.id"
          class="p-4 rounded-lg border border-neutral-200 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-700"
        >
          <div class="flex justify-between items-center">
            <span
              class="font-medium text-base"
              :class="transaction.type === 'top-up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'"
            >
              {{ transaction.type === 'top-up' ? 'Top-Up' : 'Deduction' }}
            </span>
            <span class="font-semibold text-base">
              PKR {{ transaction.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
            </span>
          </div>
          <div class="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            {{ new Date(transaction.created_at).toLocaleDateString() }}
            {{ new Date(transaction.created_at).toLocaleTimeString() }}
          </div>
          <div v-if="transaction.description" class="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            {{ transaction.description }}
          </div>
          <div class="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Balance After: PKR {{ transaction.balance_after.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
          </div>
        </div>
      </div>

      <div v-else class="text-center py-6 text-neutral-600 dark:text-neutral-400 text-base">
        No transactions yet.
      </div>

      <!-- Pagination Controls -->
      <div v-if="totalPages > 1" class="flex justify-center items-center mt-6 space-x-2">
        <button
          @click="prev"
          :disabled="currentPage === 1"
          class="px-3 py-1 rounded-md bg-neutral-100 dark:bg-neutral-600 text-neutral-900 dark:text-neutral-300 disabled:opacity-50"
        >
          Prev
        </button>
        <span class="px-3 py-1 font-medium text-neutral-900 dark:text-neutral-300 text-base">
          Page {{ currentPage }} of {{ totalPages }}
        </span>
        <button
          @click="next"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 rounded-md bg-neutral-100 dark:bg-neutral-600 text-neutral-900 dark:text-neutral-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import { useWalletStore } from '@/stores/wallet';
import { usePagination } from '@/composables/usePagination';
import { useToast } from 'vue-toastification';
import type { StripeCardElement } from '@stripe/stripe-js';

const toast = useToast();
const userStore = useUserStore();
const walletStore = useWalletStore();

const amount = ref(0);
const loading = ref(false);
const cardElement = ref<StripeCardElement | null>(null);

const balance = computed(() => userStore.dashboard?.balance ?? 0);
const formattedBalance = computed(() =>
  balance.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
);

const transactions = computed(() => walletStore.transactions);
const { currentPage, totalPages, paginatedItems, next, prev } = usePagination(transactions, 5);

const handleTopUp = async () => {
  if (amount.value <= 0 || !cardElement.value) return;
  try {
    loading.value = true;
    const clientSecret = await walletStore.createPaymentIntent(amount.value);
    const stripe = await walletStore.initStripe();

    if (!stripe) throw new Error('Stripe not initialized');

    const { error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: cardElement.value },
    });

    if (error) {
      document.getElementById('card-errors')!.textContent = error.message || 'Payment failed';
      toast.error(error.message || 'Payment failed');
    } else {
      // Payment succeeded; webhook will update balance
      await userStore.fetchBalance();
      await walletStore.fetchTransactions();
      amount.value = 0;
      cardElement.value.clear();
      toast.success('Top-up successful!');
    }
  } catch (error: any) {
    console.error('Top up failed:', error);
    document.getElementById('card-errors')!.textContent = 'Payment failed. Please try again.';
    toast.error('Payment failed. Please try again.');
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  try {
    await userStore.fetchDashboard();
    await walletStore.fetchTransactions();
    const stripe = await walletStore.initStripe();
    if (stripe) {
      const elements = stripe.elements();
      cardElement.value = elements.create('card', {
        style: {
          base: { fontSize: '16px', color: '#32325d' },
        },
      });
      cardElement.value.mount('#card-element');
    }
  } catch (error) {
    console.error('Failed to fetch wallet data or init Stripe:', error);
    //toast.error('Failed to initialize wallet.');
  }
});
</script>