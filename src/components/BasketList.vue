<template>
  <div class="basket-container">
    <h2>Panier</h2>

    <CheckedList
        :data="Array.isArray(basket) ? basket.map(b => ({
            display: `${b.item.name} - ${b.item.price}€ - Quantité: ${b.amount}`,
            _id: b.item._id,
            amount: b.amount
        })) : []"
    :fields="['display']"
    :itemCheck="false"
    :itemButton="{ show: true, text: 'Supprimer' }"
    :listButton="{ show: true, text: 'Vider le panier' }"
    @item-button-clicked="handleRemoveItem"
    @list-button-clicked="handleClearBasket"
    />

    <button
        class="buy-button"
        :disabled="!Array.isArray(basket) || basket.length === 0"
    @click="createOrder"
    >
    Acheter
    </button>
  </div>
</template>

<script>
import CheckedList from './checkedList.vue';
import ShopService from '../services/shop.service';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'BasketList',
  components: {
    CheckedList
  },
  computed: {
    ...mapState('shop', ['basket', 'shopUser', "loginError"]),
  },
  methods: {
    ...mapActions('shop', ['getBasket', 'removeItemFromBasket', 'clearBasket','updateOrders']),

    async createOrder() {
      if (!this.shopUser || !Array.isArray(this.basket) || !this.basket.length) return;  // Vérification de la validité du panier

      const orderData = { items: this.basket };

      const response = await ShopService.CreateOrder(this.shopUser._id, orderData);
      console.log(response);

      if (response.error === 0 && response.data && response.data.uuid) {
        await this.updateOrders();
        await this.clearBasket();
        await this.$router.push(`/shop/pay/${response.data.uuid}`);
      } else {
        console.error('Erreur lors de la création de la commande:', response.message || response.data);
      }
    },

    async handleRemoveItem(index) {
      console.log('Suppression de l\'article avec ID:', this.basket[index].item._id);
      const itemId = this.basket[index].item._id;
      await this.removeItemFromBasket(itemId);
    },

    async handleClearBasket() {
      await this.clearBasket();
    },


  },
  created() {
    this.getBasket();
  }
}
</script>

<style scoped>
.basket-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
  background-color: #EFF1F3;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.basket-container h2 {
  color: #223843;
}

.buy-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #D77A61;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.buy-button:disabled {
  background-color: #DBD3D8;
  cursor: not-allowed;
}

.buy-button:hover {
  background-color: #D8B4A0;
}

.quantity-buttons {
  margin-top: 1rem;
}

.item-quantity {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.quantity-button, .remove-button {
  padding: 0.5rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 5px;
}

.remove-button {
  background-color: #f44336;
}

.remove-button:hover {
  background-color: #e53935;
}

.quantity-button:hover {
  background-color: #45a049;
}

.buy-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.buy-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>
