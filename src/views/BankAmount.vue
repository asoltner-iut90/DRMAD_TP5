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
.positive {
  color: green;
}
.negative {
  color: red;
}
</style>
