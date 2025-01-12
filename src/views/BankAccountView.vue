<template>
  <div class="account-container">
    <h1 class="account-header">Account</h1>
    <span class="account-label">Account Number</span><br>
    <input v-model="accountNumber" class="account-input" /><br>
    <p v-if="accountNumberError == -1" class="error-message">Numéro de compte erroné</p>
    <button @click="login" :disabled="!isValidFormat()" class="login-button">Login</button><br>
  </div>
</template>

<script>

import {mapState, mapActions, mapMutations} from 'vuex'
export default {
  name: 'BankAccountView',
  data: () => ({
    accountNumber: '',
    transactions: [],
  }),
  computed: {
    ...mapState('bank', ['currentAccount', "accountNumberError"])
  },
  methods: {
    ...mapActions("bank",['getAccount', "getAccountTransactionsByNumber"]),
    ...mapMutations("bank",['updateAccountNumberError']),
    transformation(dateString){
      let date = new Date(dateString);
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let year = date.getFullYear();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      let formattedDate = `${month}/${day}/${year} at ${hours}:${minutes}:${seconds}`;
      return formattedDate
    },
    isValidFormat(){
      let regex = /^[a-zA-Z0-9]{22}-[0-9]{7}$/
      return regex.test(this.accountNumber);
    },
    async login() {
      await this.getAccount(this.accountNumber)
      if (this.currentAccount) {
        await this.$router.push('/bank/amount');
      }
    },
  }
}


</script>

<style scoped>
.account-container {
  font-family: Arial, sans-serif;
  margin: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.account-header {
  font-size: 2rem;
  color: #333;
  text-align: center;
}

.account-label {
  font-size: 1rem;
  color: #555;
}

.account-input {
  width: 100%;
  padding: 8px;
  margin-top: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.account-input:focus {
  border-color: #007BFF;
  outline: none;
}

.error-message {
  color: #e74c3c;
  font-size: 0.9rem;
  text-align: center;
}

.login-button {
  width: 100%;
  padding: 10px;
  background-color: #007BFF;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-button:disabled {
  background-color: #d6d6d6;
}

.login-button:hover {
  background-color: #0056b3;
}
</style>