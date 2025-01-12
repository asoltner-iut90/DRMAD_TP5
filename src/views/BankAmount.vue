<template>
  <div class="bank-amount">
    <slot name="account-amount">
      <p :class="balanceClass">{{ currentAccount.amount }} €</p>
    </slot>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "BankAmount",
  computed: {
    ...mapState('bank', ['currentAccount']),
    balanceClass() {
      return this.currentAccount.amount >= 0 ? 'positive' : 'negative';
    },
  },
};
</script>

<style scoped>
.bank-amount {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 300px;
  margin: 20px auto;
}

p {
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
}
.positive {
  color: #28a745;
}

.negative {
  color: #dc3545;
}
</style>
