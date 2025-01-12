import LocalSource from "@/datasource/controller";


function getAccountAmountFromLocalSource(number){
    return LocalSource.getAccountAmount(number)
}

async function getAccountAmount(number) {
    let response = null;
    try {
        // changer la méthode appelée quand cette fonctionnalité l'API est prête
        response = await  getAccountAmountFromLocalSource(number)
    }
        // NB: le catch n'aura lieu que pour des requête vers l'API, s'il y a une erreur réseau
    catch (err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de récupérer la valeur du compte'}
    }
    return response
}

async function getAccountFromLocalSource(number){
    return LocalSource.getAccount(number);
}

async function getAccount(number){
    let response = null;
    try {
        response = await  getAccountFromLocalSource(number)
    }
    catch (err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de récupérer le compte'}
    }
    return response
}



async function updateAccountAmount(data) {
    let response = null;
    try{
        response = await  updateAccountAmount(data)
    }
    catch (err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de modifier la valeur du compte'}
    }
    return response
}

function getAccountTransactionsFromLocalSource(number){
    return LocalSource.getAccountTransactions(number)
}

async function getAccountTransactions(number) {
    return getAccountTransactionsFromLocalSource(number)
}

async function addTransactionFromLocalSource(data){
    return LocalSource.addTransaction(data);
}

async function addTransaction(AccountNumber, amount) {
    let data = {number:AccountNumber, amount:amount};
    let response = null;
    try {
        response = await addTransactionFromLocalSource(data);
    }catch (err) {
        response = {error: 1, status: 404, data: 'erreur réseau'}
    }
    return response
}





export default{
    getAccountAmount,
    getAccountTransactions,
    updateAccountAmount,
    addTransaction,
    getAccount,
}