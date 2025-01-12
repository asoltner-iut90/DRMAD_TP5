import Vue from 'vue';
import VueRouter from 'vue-router';
import ShopView from "@/views/ShopView.vue";
import ShopHome from "@/views/ShopHome.vue";
import ShopLogin from "@/views/ShopLogin.vue";
import ShopBuy from "@/views/ShopBuy.vue";
import ShopPay from "@/views/ShopPay.vue";
import ShopOrders from "@/views/ShopOrders.vue";
import ShopItems from "@/views/VirusesView.vue";
import BankView from "@/views/BankView.vue";
import BankHome from "@/views/BankHome.vue";
import BankAccount from "@/views/BankAccountView.vue";
import BankAmount from "@/views/BankAmount.vue";
import BankOperation from "@/views/BankOperation.vue";
import BankLogout from "@/views/BankLogout.vue";
import BankHistory from "@/views/BankHistory.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: '/shop',
    component: ShopView,
    children: [
      { path: '', component: ShopHome, name: 'ShopHome', alias: '/shop' }, // Route par défaut (alias vers /shop)
      { path: 'items', component: ShopItems, name: 'ShopItems' },
      { path: 'login', component: ShopLogin, name: 'ShopLogin' },
      { path: 'buy', component: ShopBuy, name: 'ShopBuy' },
      { path: 'pay/:orderId', component: ShopPay, name: 'ShopPayOrder' },
      { path: 'pay', component: ShopPay, name: 'ShopPay' },
      { path: 'orders', component: ShopOrders, name: 'ShopOrders' },
    ],
  },
  {
    path: '/bank',
    component: BankView,
    children: [
      { path: "", component: BankHome, name: "BankHome" }, // Route par défaut
      { path: "account", component: BankAccount, name: "BankAccount" },
      { path: "amount", component: BankAmount, name: "BankAmount" },
      { path: "operation", component: BankOperation, name: "BankOperation" },
      { path: "history", component: BankHistory, name: "BankHistory" },
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
