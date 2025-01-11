<template>
  <div class="bank-amount">
    <slot name="account-amount" :balance="balance">
      <p :class="balanceClass">{{ balance }} €</p>
    </slot>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "BankAmount",
  methods: {
    ...mapState('bank', ['accountAmount']),
  },
  props: {
    balance: {
      type: Number,
      required: true,
    },
  },
  computed: {
    balanceClass() {
      return this.accountAmount >= 0 ? 'positive' : 'negative';
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
