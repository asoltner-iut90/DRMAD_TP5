import LocalSource from "@/datasource/controller";

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

async function getAccountTransactionsFromLocalSource(id){
    return LocalSource.getAccountTransactions(id)
}

async function getAccountTransactions(id) {
    return getAccountTransactionsFromLocalSource(id)
}

async function getAccountTransactionsByNumberFromLocalSource(data){
    return LocalSource.getAccountTransactionsByNumber(data)

}

async function getAccountTransactionsByNumber(data){
    return getAccountTransactionsByNumberFromLocalSource(data)
}

async function createWithdrawFromLocalSource(data){
    return LocalSource.createWithdraw(data);
}

async function createWithdraw(data) {
    let response = null;

    try {
        response = await createWithdrawFromLocalSource(data);
    }catch (err) {
        response = {error: 1, status: 404, data: 'erreur réseau'}
    }
    return response
}

async function createPayementFromLocalSource(data){
    return await LocalSource.createPayment(data)
}

async function createPayement(data){
    let response = null;
    try {
        response = await createPayementFromLocalSource(data);
    }catch (err) {
        console.log(err)
        response = {error: 1, status: 404, data: 'erreur réseau'}
    }

    return response;
}




export default{
    getAccountTransactions,
    createWithdraw,
    getAccount,
    getAccountTransactionsByNumber,
    createPayement,
}