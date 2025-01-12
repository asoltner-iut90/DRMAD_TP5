<template>
  <div>
    <h1>Account</h1>
    <span>Account Number</span><br><input v-model="accountNumber"><br>
    <p v-if="accountNumberError == -1">Numéro de compte erroné</p>
    <button @click="getAccount(accountNumber)" :disabled="!isValidFormat()">Login</button><br>
    <p v-if="accountNumberError==1">{{currentAccount.amount}}</p><br>
    <button @click="getTransactions" :disabled="!isValidFormat">Transactions</button>
    <ul v-if="accountNumberError==1">
      <li v-for="(transaction, index) in transactions" :key="index"> {{transformation(transaction.date.$date)}} : {{transaction.amount}}</li>
    </ul>
    <button @click="reset">Reset</button>
  </div>
</template>

<script>
import BankService from "@/services/bankaccount.service";

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
    reset(){
      this.updateAccountNumberError(0)
      this.accountNumber = ""
    },
    async getTransactions(){
      let response = BankService.getAccountTransactionsByNumber({number: this.accountNumber})
      if (response.error === 0) {
        this.transactions = response.data
      }
    }
  }
}


</script>
