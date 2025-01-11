<template>
  <div class="bank-logout">
    <p>Déconnexion en cours...</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'BankLogout',
  methods: {
    ...mapActions('bank', ['clearCurrentAccount']),
  },
  mounted() {
    setTimeout(async () => {
      await this.clearCurrentAccount();
      this.$router.push('/bank/home');
    }, 1000);
  },
};
</script>

<style scoped>
.bank-logout {
  text-align: center;
  margin-top: 50px;
  font-size: 20px;
}
</style>