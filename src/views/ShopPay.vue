<template>
  <div class="shop-pay">
    <h1>Paiement</h1>

    <input v-model="currentOrderUUID" required placeholder="Order ID" />

    <div v-if="currentOrder">
      <p><strong>Total :</strong> {{ currentOrder.total }} €</p>
      <p><strong>Date :</strong> {{ new Date(currentOrder.date.$date).toLocaleDateString('fr-FR') }}</p>
    </div>

    <input v-model="transactionId" required placeholder="Transaction ID" />

    <button @click="payOrder">Payer</button>

    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<script>
import ShopService from "@/services/shop.service";
import { mapState } from "vuex";
import router from "@/router";

export default {
  name: 'ShopPay',
  props: {
    orderId: String,
  },
  data() {
    return {
      currentOrderUUID: this.orderId || '',
      transactionId: '',  // Ajout du champ transactionId
      error: '',
    };
  },
  computed: {
    ...mapState('shop', ['shopUser']),
    currentOrder() {
      // Trouve la commande correspondant à l'orderId actuel
      return this.shopUser?.orders?.find(order => order.uuid === this.currentOrderUUID) || null;
    },
  },
  methods: {
    async payOrder() {
      let data = {
        orderId: this.currentOrderUUID,
        userId: this.shopUser._id,
        transactionId: this.transactionId,
      };

      let result = await ShopService.payOrder(data);

      if (result.error) {
        this.error = result.data;
        return;
      }

      this.error = '';
      await router.push("/shop/orders");
    },
  },
  mounted() {
    this.currentOrderUUID = this.$route.params.orderId;
  },
};
</script>

<style scoped>
.shop-pay {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #eff1f3;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #223843;
}

input {
  display: block;
  width: 100%;
  padding: 0.8rem;
  margin: 1rem 0;
  border: 1px solid #dbd3d8;
  border-radius: 4px;
}

button {
  padding: 0.6rem 1.2rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.error-message {
  color: #d77a61;
  text-align: center;
  margin-top: 1rem;
}
</style>
