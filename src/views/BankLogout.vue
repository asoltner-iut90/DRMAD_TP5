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
      await this.$router.push('/bank');
    }, 1000);
  },
};
</script>

<style scoped>
.bank-logout {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: #721c24;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
}

p {
  margin: 0;
}
</style>
