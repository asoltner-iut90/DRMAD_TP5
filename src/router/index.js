import Vue from 'vue';
import VueRouter from 'vue-router';
import ShopView from "@/views/ShopView.vue";
import ShopHome from "@/views/ShopHome.vue";
import ShopLogin from "@/views/ShopLogin.vue";
import ShopBuy from "@/views/ShopBuy.vue";
import ShopPay from "@/views/ShopPay.vue";
import ShopOrders from "@/views/ShopOrders.vue";
import BankView from "@/views/BankView.vue";
import BankHome from "@/views/BankHome.vue";
import BankAccount from "@/views/BankAccountView.vue";
import BankAmount from "@/views/BankAmount.vue";
import BankOperation from "@/views/BankOperation.vue";
// import BankHistory from "@/views/BankHistory.vue"; // Assurez-vous d'avoir ce composant si nécessaire
import BankLogout from "@/views/BankLogout.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: '/shop',
    name: 'shop',
    component: ShopView
  },
  {
    path: '/home/home',
    name: 'home',
    component: ShopHome,
    alias: '/shop'
  },
  {
    path: '/shop/login',
    name: 'login',
    component: ShopLogin
  },
  {
    path: '/shop/buy',
    name: 'buy',
    component: ShopBuy
  },
  {
    path: '/shop/pay/:orderId',
    name: 'pay_order_id',
    component: ShopPay,
  },
  {
    path: '/shop/pay',
    name: 'pay',
    component: ShopPay,
  },
  {
    path: '/shop/orders',
    name: 'orders',
    component: ShopOrders
  },
  {
    path: "/bank",
    component: BankView,
    children: [
      { path: "", component: BankHome, name: "BankHome" }, // La route par défaut
      { path: "account", component: BankAccount, name: "BankAccount" },
      { path: "amount", component: BankAmount, name: "BankAmount" },
      { path: "operation", component: BankOperation, name: "BankOperation" },
      //{ path: "history", component: BankHistory, name: "BankHistory" },
      { path: "logout", component: BankLogout, name: "BankLogout" },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
