import {items, shopusers, bankaccounts, transactions} from './data'
import * as bcrypt from 'bcryptjs'
const { v4: uuidv4 } = require('uuid');

/* controllers: les fonctions ci-dessous doivent mimer ce que renvoie l'API en fonction des requêtes possibles.

  Dans certains cas, ces fonctions vont avoir des paramètres afin de filtrer les données qui se trouvent dans data.js
  Ces paramètres sont généralement les mêmes qu'ils faudrait envoyer à l'API, mais pas forcément.

  Exemple 1 : se loguer auprès de la boutique
 */

function getBasket(data) {
  let id = data.id;
  let user = shopusers.find(e => e._id === id)
  if (!user) return {error: 1, status: 404, data: 'user id invalid'}
  return {error: 0, status: 200, data: user.basket}

}

function updateBasket(data) {
  let id = data.id;
  let basket = data.basket;
  let user = shopusers.find(e => e._id === id)
  if (!user) return {error: 1, status: 404, data: 'user id invalid'}
  user['basket']=basket;
  return {error: 0, status: 200, data: user.basket}
}

function shopLogin(data) {
  if ((!data.login) || (!data.password)) return {error: 1, status: 404, data: 'aucun login/pass fourni'}
  // pour simplifier : test uniquement le login
  let user = shopusers.find(e => e.login === data.login && bcrypt.compareSync(data.password, e.password))
  if (!user) return {error: 1, status: 404, data: 'login/pass incorrect'}
  // retourne uniquement les champs nécessaires
  let u = {
    _id: user._id,
    name: user.name,
    login: user.login,
    email: user.email,
    session: user.session,
  }
  return {error: 0, status: 200, data: u}
}

function getAllViruses() {
  return {error: 0, data: items}
}

function getAccountAmount(number){
  if(!number) return {error:1, status: 404,data:"aucun nombre fourni"}
  let account = bankaccounts.find(e => e.number === number)
  if (!account) return {error: 1, status: 404, data: 'account number invalid'}
  return {error: 0, status: 404, data:account.amount};
}

function getAccountTransactions(number){
  if(!number) return {error:1, status: 404,data:"aucun nombre fourni"}
  let account = bankaccounts.find(e => e.number === number)
  if (!account) return {error: 1, status: 404, data: 'account number invalid'}
  let id = account._id;
  let list = transactions.filter(e => e.account === id)
  if (!list) return {error: 1, status: 404, data: 'account number invalid'}
  return {error: 0, status: 404, data:list};
}

function payOrder(data) {
  let orderId = data.orderId;
  let userId = data.userId;
  let transactionId = data.transactionId;  // Transaction ID fourni par l'utilisateur

  if (!orderId) return { error: 1, status: 404, data: 'orderId invalid' };
  if (!userId) return { error: 1, status: 404, data: 'userId invalid' };
  if (!transactionId) return { error: 1, status: 404, data: 'transactionId invalid' };

  let user = shopusers.find(e => e._id === userId);
  if (!user) return { error: 1, status: 404, data: 'User not found' };

  let order = user.orders.find(e => e._id === orderId);
  if (!order) return { error: 1, status: 404, data: 'Order not found' };

  let orderTotal = order.total;

  let transaction = transactions.find(t => t.transactionId === transactionId);  // Liste des transactions bancaires
  if (!transaction) return { error: 1, status: 404, data: 'Transaction not found' };

  if (transaction.amount !== -orderTotal) {
    return { error: 1, status: 400, data: 'Transaction amount mismatch' };
  }

  const shopAccountId = "65d721c44399ae9c8321832c";  // L'ID du compte de la boutique
  if (transaction.destination !== shopAccountId) {
    return { error: 1, status: 400, data: 'Transaction destination mismatch' };
  }

  order.status = 'finalized';

  return { error: 0, status: 200, data: order };
}
async function createOrder(userId, orderData) {
  const user = shopusers.find(u => u._id === userId);
  if (!user) {
    return { error: 1, message: "Utilisateur non trouvé" };
  }

  let total = 0;
  orderData.items.forEach(({ item, amount }) => {
    if (!item || !item.price) {
      console.error("Item ou prix manquant:", item);
      return;
    }

    let itemTotal = item.price * amount;
    if (item.promotion && item.promotion.length > 0) {
      item.promotion.forEach(promo => {
        itemTotal -= promo.discount * promo.amount;
      });
    }
    total += itemTotal;
  });

  const newOrder = {
    items: orderData.items,
    date: new Date(),
    total,
    status: 'waiting_payment',
    uuid: uuidv4()
  };

  user.orders.push(newOrder);

  return { error: 0, data: { uuid: newOrder.uuid } };
}
function cancelOrder(data) {
  let orderId = data.orderId;
  let userId = data.userId;
  if(!orderId) return {error: 1, status: 404, data: 'orderId invalid'}
  if(!userId) return {error: 1, status: 404, data: 'user id invalid'}
  let user = shopusers.find(e => e._id === userId);
  if (!user) return {error: 1, status: 404, data: 'user id invalid'}
  let order = user.orders.find(e => e._id === orderId);
  order.status = 'cancelled'
  return {error: 0, status: 200, data: order}
}

function getOrders(data) {
  let userId = data.userId;
  if(!userId) return {error: 1, status: 404, data: 'user id invalid'}
  let user = shopusers.find(e => e._id === userId);
  let orders = user.orders;
  return {error: 0, status: 200, data: orders || []}
}

function updateAccountAmount(data) {
  let number = data.number;
  let amount = data.amount;
  let account = bankaccounts.find(e => e._id === number);
  if (!account) return {error: 1, status: 404, data: 'account number invalid'}
  account.amount = amount;
}

function addTransaction(data) {
  let amount = data.amount;
  let account = data.account;
  let id = uuidv4()
  let transaction = {
    '_id': id,
    'amount': -amount,
    'account': account,
    'date': { $date: new Date() },
    'uuid': id
  }
  transactions.push(transaction)
}


export default{
  shopLogin,
  getAllViruses,
  getAccountAmount,
  getAccountTransactions,
  updateBasket,
  getBasket,
  payOrder,
  createOrder,
  cancelOrder,
  getOrders,
  updateAccountAmount,
  addTransaction,
}

