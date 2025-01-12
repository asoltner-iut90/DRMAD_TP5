<template>
  <div class="checked-list-container">
    <ul>
      <li v-for="(row, rowIndex) in data" :key="rowIndex" class="list-item">
        <input v-if="itemCheck" type="checkbox" :checked="checked[rowIndex]" @change="checkedChanged(rowIndex)" :id="rowIndex+'_checkbox'" class="checkbox" />
        <p v-for="(col, colIndex) in fields" :key="colIndex" class="inline-block list-text">
          {{row[col]}}
        </p>
        <input v-if="itemAmount" type="number" :id="rowIndex+'_amount'" class="amount-input" />
        <button v-if="itemButton.show" @click="itemButtonClicked(rowIndex)" class="item-button">
          {{itemButton.text}}
        </button>
      </li>
    </ul>
    <button v-if="listButton.show" @click="listButtonClicked" class="list-button">
      {{listButton.text}}
    </button>
  </div>
</template>

<script>

export default {
  name: 'CheckedList',
  props: {
    data: Array, // les données sources
    fields: Array, // le tableau contenant le nom des champs
    itemCheck: Boolean, // s'il y a des case à cocher
    checked: Array, // le tableau des cases cochées
    itemButton: Object, // l'objet pour les boutons d'items
    listButton: Object, // l'objet pour le bouton de liste
    itemAmount: Boolean,
  },
  data : () => {
    return {
    }
  },
  methods: {
    checkedChanged(index) {
      this.$emit('checked-changed', index)
    },

    itemButtonClicked(index) {
      let amount = document.getElementById(index+'_amount').value;
      if(this.itemAmount) {
        this.$emit('item-button-clicked', index, amount)
      }else{
        this.$emit('item-button-clicked', index)
      }
    },

    listButtonClicked() {
      if(!this.itemAmount) {
        this.$emit('list-button-clicked')
        return;
      }
      let tab = [];
      for(let i = 0; i < this.data.length; i++) {
        if(document.getElementById(i +'_checkbox').checked) {
          let amount = document.getElementById(i +'_amount').value;
          tab.push([i, amount]);
        }
      }
      this.$emit('list-button-clicked', tab)
    },
  }

}
</script>

<style scoped>
.checked-list-container {
  padding: 1rem;
  background-color: #EFF1F3; /* Fond clair */
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.list-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #FFFFFF;
  border: 1px solid #DBD3D8;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.list-item:hover {
  background-color: #F1F1F1;
}

.checkbox {
  margin-right: 10px;
}

.list-text {
  margin-right: 15px;
  color: #223843; /* Texte sombre */
  font-size: 14px;
}

.amount-input {
  width: 60px;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #DBD3D8;
  margin-right: 15px;
  text-align: center;
}

.item-button {
  padding: 8px 12px;
  background-color: #D77A61; /* Orange */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.item-button:hover {
  background-color: #D8B4A0; /* Fond plus clair au survol */
}

.list-button {
  padding: 10px 20px;
  background-color: #4CAF50; /* Vert pour le bouton principal */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 1rem;
}

.list-button:hover {
  background-color: #45a049; /* Fond plus foncé au survol */
}
</style>