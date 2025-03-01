import BankService from "@/services/bankaccount.service";

export default {
    namespaced: true,
    state: {
        accountTransactions: [],
        accountNumberError :0,
        currentAccount:null,
    },

    mutations:{
        /*
        updateAccountAmount(state, amount){
            state.accountAmount = amount
        },

         */
        updateAccountTransactions(state, transactions){
            state.accountTransactions = transactions
        },
        updateAccountAmount(state, amount){
            state.currentAccount.amount = amount;
        },
        updateAccountNumberError(state, error){
            state.accountNumberError = error
        },
        updateCurrentAccount(state, account){
            state.currentAccount = account
        },
        clearCurrentAccount(state){
            state.currentAccount = null;
            state.accountTransactions = []
            state.accountNumberError = 0
        }
    },

    // actions = fonctions asynchrone pour mettre à jour le state, en faisant appel aux mutations, via la fonction commit()
    actions: {
        async getAccountTransactions({commit}, id) {
            console.log('recupération des transactions du compte');
            let response = await BankService.getAccountTransactions({id})
            if (response.error === 0) {
                commit('updateAccountTransactions', response.data)
                commit('updateAccountNumberError', 1)
            }
            else {
                commit('updateAccountNumberError', -1)}
        },

        async getAccountTransactionsByNumber(number){
            console.log(number)
            let response = await BankService.getAccountTransactionsByNumber({number})
            if (response.error === 0) {
                return response.data
            }
            return null
        },


        async getAccount({commit}, data) {
            console.log('recupération de le compte');
            let response = await BankService.getAccount(data)
            if (response.error === 0) {
                commit('updateCurrentAccount', response.data)
                commit('updateAccountNumberError', 1)
            }
            else {
                commit('updateAccountNumberError', -1)
            }
        },

        async clearCurrentAccount({commit}){commit('clearCurrentAccount')},
        
        async createWithdraw({commit, dispatch}, data){
            let response = await BankService.createWithdraw(data);
            if(response.error === 0) {
                dispatch('getAccountTransactions', data.idAccount)
                let amount = response.data.amount;
                commit('updateAccountAmount', amount)
            }
            return response
        },

        async createPayment({commit, dispatch}, data){
            let response = await BankService.createPayement(data);
            if(response.error === 0) {
                dispatch('getAccountTransactions', data.idAccount)
                let amount = response.data.amount;
                commit('updateAccountAmount', amount)
            }
            return response
        },
    }
}