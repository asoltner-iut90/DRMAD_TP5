<template>
  <div class="orders-container">
    <h2>Orders</h2>
    <ul v-if="shopUser && shopUser.orders.length > 0">
      <li v-for="(order, order_id) in shopUser.orders" :key="order_id" class="order-item">
        <p>OrderId: {{ order._id }}, Total: {{ order.total }}€, Etat: {{ order.status }}</p>
        <div v-if="order.status === 'waiting_payment'" class="order-actions">
          <button @click="$router.push('/shop/pay/'.concat(order._id))" class="pay-button">Payer</button>
          <button @click="cancel(order._id)" class="cancel-button">Annuler</button>
        </div>
      </li>
    </ul>
    <p v-else>No orders found.</p>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";


  export default {
    name: "ShopOrders",
    components: {},
    computed: {
      ...mapState('shop', ['shopUser']),
    },
    methods: {
      ...mapActions('shop', ["updateOrders","cancelOrder"]),
      cancel(id){
        this.cancelOrder(id)
      }
    },

    mounted() {
      if (this.shopUser) {
        this.updateOrders()
      }
    }
  }
</script>

<style scoped>
.orders-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #EFF1F3;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #223843;
}

.order-item {
  background-color: #DBD3D8;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 4px;
}

.order-actions {
  margin-top: 1rem;
}

button {
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 1rem;
}

.pay-button {
  background-color: #4CAF50;
  color: white;
  border: none;
}

.pay-button:hover {
  background-color: #45a049;
}

.cancel-button {
  background-color: #f44336;
  color: white;
  border: none;
}

.cancel-button:hover {
  background-color: #e53935;
}
</style>