<template>
  <div class="viruses-view">
    <h1 class="page-title">Les virus</h1>
    <p class="table-description">Le tableau dans le store : {{ viruses }}</p>
    <p class="filter-description">Sous forme de liste avec certains champs</p>

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

    <table class="virus-table">
      <thead>
      <tr>
        <th>Nom</th>
        <th>Prix</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(virus, index) in computedFilter" :key="index">
        <td>{{virus.name}}</td>
        <td>{{virus.price}}</td>
      </tr>
      </tbody>
    </table>

    <checked-list :data="computedFilter()" :fields="[ 'name', 'price' ]" :itemCheck="true" :itemButton="{'show':true, 'text':'buttonItem'}" :listButton="{'show':true, 'text':'buttonList'}" :checked="computedSelectedViruses()"
                  @item-button-clicked="itemButtonClicked" @list-button-clicked="listButtonChecked" @checked-changed="checkedChanged" class="checked-list">
    </checked-list>
  </div>
</template>

<script>

import {mapState} from 'vuex'
import CheckedList from "@/components/checkedList.vue";
export default {
  name: 'VirusesView',
  components: {CheckedList},
  data: () => ({
    priceFilter:0,
    nameFilter:"",
    stockFilter: false,
    filterPriceActive: false,
    filterNameActive: false,
    filterStockActive: false,
    selectedViruses: [],
  }),
  computed: {
    ...mapState("shop",['viruses']),
  },
  methods:{
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
      return viruses
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

    itemButtonClicked(index){
      let virus = this.filteredViruses[index]
      console.log("test item button: ", virus.name, virus.price, virus.stock)
    },

    listButtonChecked(){
      let tab = []
      let filteredViruses = this.computedFilter()
      this.selectedViruses.forEach(index => {
        if(filteredViruses.includes(this.viruses[index])) tab.push(this.viruses[index])
      })
      console.log("test list button ", tab)
    },
    checkedChanged(index){
      console.log("test checked changed: ", index)
      let realIndex = this.viruses.indexOf(this.computedFilter()[index])
      if(this.selectedViruses.includes(realIndex)){
        this.selectedViruses = this.selectedViruses.filter(i => i !== realIndex)
      } else{
        this.selectedViruses.push(realIndex)
      }
    }


  },
  mounted(){
    this.computedFilter()
  }

}
</script>

<style scoped>
.viruses-view {
  font-family: 'Arial', sans-serif;
  background-color: #f9fafb;
  color: #3b4a63;
  padding: 20px;
}

.page-title {
  color: #D77A61;
  font-size: 2rem;
  text-align: center;
}

.filter-description,
.table-description {
  color: #5f6368;
  font-size: 1rem;
  margin-bottom: 10px;
}

.filter-checkbox,
.filter-radio,
.filter-input {
  margin: 10px 0;
}

.filter-group {
  margin-bottom: 20px;
}

.virus-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.virus-table th,
.virus-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.virus-table th {
  background-color: #f0f0f0;
  color: #3b4a63;
  font-weight: bold;
}

.checked-list {
  margin-top: 30px;
}

hr.divider {
  border: 0;
  border-top: 1px solid #e0e0e0;
  margin: 20px 0;
}
</style>