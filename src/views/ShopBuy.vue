<template>
  <div class="shop-buy">
    <ItemsList class="items-list"/>
    <BasketList class="basket-list" />
  </div>
</template>

<script>
import ItemsList from "@/components/ItemsList.vue";
import BasketList from "@/components/BasketList.vue";

export default {
  name: 'ShopBuy',
  components: {
    ItemsList,
    BasketList,
  }
};
</script>

<style scoped>
.shop-buy {
  display: flex;
  justify-content: space-between;
  background-color: #EFF1F3; /* Fond clair pour l'ensemble de la page */
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.items-list, .basket-list {
  background-color: #ffffff; /* Fond blanc pour les deux sections */
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.items-list {
  flex: 1;
  margin-right: 1rem;
}

.basket-list {
  flex: 1;
  margin-left: 1rem;
}
</style>
