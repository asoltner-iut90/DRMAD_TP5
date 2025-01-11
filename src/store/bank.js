import BankService from "@/services/bankaccount.service";

export default {
    namespaced: true,
    state: {
        accountAmount: 0,
        accountTransactions: [],
        accountNumberError :0,
    },

    mutations:{
        updateAccountAmount(state, amount){
            state.accountAmount = amount
        },
        updateAccountTransactions(state, transactions){
            state.accountTransactions = transactions
        },
        updateAccountNumberError(state, error){
            state.accountNumberError = error
        },
        clearCurrentAccount(state){
            state.accountAmount = 0
            state.accountTransactions = []
            state.accountNumberError = 0
        }
    },

    // actions = fonctions asynchrone pour mettre à jour le state, en faisant appel aux mutations, via la fonction commit()
    actions: {
        async getAccountTransactions({commit}, data) {
            console.log('recupération des transactions du compte');
            let response = await BankService.getAccountTransactions(data)
            if (response.error === 0) {
                commit('updateAccountTransactions', response.data)
                commit('updateAccountNumberError', 1)
            }
            else {
                commit('updateAccountNumberError', -1)}
        },

        async getAccountAmount({commit}, data) {
            console.log('recupération de la valeur du compte');
            let response = await BankService.getAccountAmount(data)
            if (response.error === 0) {
                commit('updateAccountAmount', response.data)
                commit('updateAccountNumberError', 1)
            }
            else {
                commit('updateAccountNumberError', -1)
            }
        },
        async clearCurrentAccount({commit}){commit('clearCurrentAccount')},
        
        async createTransaction({commit}, accountNumber, amount){
            let response = await BankService.addTransaction(accountNumber, amount);
            if(response.error === 0) {
                await this.getAccountTransactions({commit}, accountNumber);
            }
        },
        async updateAccountAmount({commit}, accountNumber, amount){
            let response = await BankService.updateAccountAmount(accountNumber, amount);
            if(response.error === 0) {
                await this.getAccountTransactions({commit}, accountNumber);
            }
        }

    }
}