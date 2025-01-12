<template>
  <div>
    <h1>ItemList</h1>


    <span>Filtres :</span>
    <br><input type="checkbox" v-model="filterPriceActive" id="filterpriceactive" @change="computedFilter" class="filter-checkbox"><label for="filterpriceactive">par prix</label>
    <br><input type="checkbox" v-model="filterNameActive" id="filternameactive" @change="computedFilter" class="filter-checkbox"><label for="filternameactive">par nom</label>
    <br><input type="checkbox" v-model="filterStockActive" id="filterstockactive" @change="computedFilter" class="filter-checkbox"><label for="filterstockeactive">par stock</label>
    <hr class="divider"/>

    <div v-if="filterPriceActive" class="filter-group">
      <label for="filterprice">Prix inférieur à : </label><input v-model="priceFilter" id="filterprice" @input="computedFilter" class="filter-input">
    </div>
    <div v-if="filterNameActive" class="filter-group">
      <label for="filtername">Nom contenant : </label><input type="text" v-model="nameFilter" id="filtername" @input="computedFilter" class="filter-input">
    </div>
    <div v-if="filterStockActive" class="filter-group">
      <label for="filterstock">En stock :</label>
      <input type="radio" v-model="stockFilter" name="filterstock" id="filterstockyes" :value="true" class="filter-radio">
      <label for="filterstockyes">Oui</label>
      <input type="radio" v-model="stockFilter" name="filterstock" id="filterstockno" :value="false" class="filter-radio">
      <label for="filterstockno">Non</label>
    </div>

    <checked-list
        :data="computedFilter()"
        :fields="[ 'name', 'price', 'promotion' ]"
        :itemCheck="true"
        :itemButton="{ 'show': true, 'text': 'Ajouter au panier' }"
        :listButton="{ 'show': true, 'text': 'Ajouter sélection au panier' }"
        :checked="Array.from({ length: viruses.length }, () => false)"
        :itemAmount="true"
        @item-button-clicked="itemButtonClicked"
        @list-button-clicked="listButtonChecked"
        @checked-changed="checkedChanged"
    />
    <ul>
      <li v-for="(basketItem, index) in basket" :key="index">
        {{ basketItem.item.name }} - {{ basketItem.amount }} pièces - {{ basketItem.item.price }}€
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import CheckedList from "@/components/checkedList.vue";

export default {
  components: { CheckedList },
  data: () => ({
    priceFilter:0,
    nameFilter:"",
    stockFilter: false,
    filterPriceActive: false,
    filterNameActive: false,
    filterStockActive: false,
    filteredViruses: [],
  }),
  computed: {
    ...mapState("shop", ['viruses', 'basket']), // Ajout de 'basket' pour afficher le contenu du panier
  },
  methods: {
    ...mapActions("shop", ['addItemToBasket']),

    async itemButtonClicked(index, amount) {
      const selectedItem = this.filteredViruses[index];
      if (amount > 0) {
        const newItem = {
          item: selectedItem,
          amount: parseInt(amount)
        };
        await this.addItemToBasket(newItem);
        console.log(`Ajout de l'article ${selectedItem.name} au panier, quantité : ${amount}`);
      } else {
        console.log("Quantité invalide pour l'ajout au panier.");
      }
    },

    async listButtonChecked(tab) {
      for (let item of tab) {
        await this.itemButtonClicked(item[0], item[1])
      }
    },

    computedFilter(){
      let viruses = this.viruses
      if(this.filterNameActive){
        if (this.nameFilter.length > 0 ) viruses = viruses.filter(v => v.name.includes(this.nameFilter))
      }
      if(this.filterStockActive){
        if(this.stockFilter) {
          viruses = viruses.filter(v => v.stock > 0)
        } else{
          viruses = viruses.filter(v => v.stock === 0)
        }
      }
      if(this.filterPriceActive){
        if (this.priceFilter >0 ) viruses = viruses.filter(v => v.price < this.priceFilter)
      }
      this.filteredViruses = viruses;
      return viruses
    },

    checkedChanged(index) {
      console.log("Changement de l'état de sélection pour l'élément :", index);
    }
  },
  mounted(){
    this.computedFilter()
  }
};
</script>
