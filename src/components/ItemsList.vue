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
        :checked="computedSelectedViruses()"
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
    selectedViruses: [],
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
      /*
      let filtered = [];
      for (let item of viruses) {
        let data = {
          _id:item._id,
          name: item.name,
          description: item.description,
          links: item.links,
          stock: item.stock,
          wait: item.wait,
          sold: item.sold,
          price: item.price,
          promotion: item.promotion,
          promotionText: ""
        }
        if(data.promotion.length > 0){
          let content = "";
          for (let p of data.promotion) {
            content += p.discount + "% pour " + p.amount+"|"
          }
          data.promotionText = content
        }
        filtered.push(data);
      }

       */

      this.filteredViruses = viruses;
      return viruses;
    },

    checkedChanged(index){
      console.log("test checked changed: ", index)
      let realIndex = this.viruses.indexOf(this.computedFilter()[index])
      if(this.selectedViruses.includes(realIndex)){
        this.selectedViruses = this.selectedViruses.filter(i => i !== realIndex)
      } else{
        this.selectedViruses.push(realIndex)
      }
    },

    computedSelectedViruses(){
      let filteredViruses = this.computedFilter()
      let selected = new Array(filteredViruses.length).fill(false)
      this.selectedViruses.forEach(index => {
        var newIndex = filteredViruses.indexOf(this.viruses[index])
        if(newIndex !== -1) selected[newIndex] = true
      })
      return selected
    },
  },



  mounted(){
    this.computedFilter()
  }
};
</script>
