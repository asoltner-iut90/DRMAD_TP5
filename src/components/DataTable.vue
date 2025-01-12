<template>
  <div class="data-table-container">
    <table class="data-table">
      <thead>
      <tr>
        <th v-if="itemCheck" class="select-header">
          Select
        </th>
        <th v-for="(header, index) in headers" :key="index" class="table-header">
          {{ header.label }}
        </th>
        <th v-if="itemButton" class="actions-header">
          Actions
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in items" :key="index" class="table-row">
        <td v-if="itemCheck" class="select-cell">
          <input type="checkbox" v-model="selectedItems" :value="item" class="checkbox" />
        </td>
        <td v-for="(header, j) in headers" :key="j" class="table-cell">
          {{ item[header.name] }}
        </td>
        <td v-if="itemButton" class="actions-cell">
          <button @click="emitItemButton(item)" class="item-button">
            <slot name="item-button" :item="item">Action</slot>
          </button>
        </td>
      </tr>
      </tbody>
    </table>
    <button v-if="tableButton" @click="emitTableButton" class="table-button">
      <slot name="table-button">Action</slot>
    </button>
  </div>
</template>

<script>
  export default {
    name: 'DataTable',
    props: {
      items:Array,
      headers:Array,
      itemCheck:Boolean,
      itemButton:Boolean,
      tableButton:Boolean,
      slots:Array,
    },
    data(){
      return {
        selectedItems:[]
      }
    },
    methods: {
      emitItemButton(item){
        this.$emit('itemClicked',item);
      },
      emitTableButton(){
        this.$emit("tableClicked", this.selectedItems);
      }
    }
  }
</script>


<style scoped>
.data-table-container {
  background-color: #EFF1F3; /* Fond clair */
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  color: black;
}

.table-header, .select-header, .actions-header {
  background-color: #223843; /* Fond sombre */
  color: #EFF1F3; /* Texte clair */
  padding: 10px;
  font-size: 16px;
  border: 1px solid #DBD3D8;
}

.table-cell, .select-cell, .actions-cell {
  padding: 10px;
  border: 1px solid #DBD3D8;
}

.table-row:hover {
  background-color: #F1F1F1;
}

.checkbox {
  margin: 0;
}

.item-button {
  padding: 6px 12px;
  background-color: #D77A61; /* Bouton orange */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.item-button:hover {
  background-color: #D8B4A0; /* Fond plus clair au survol */
}

.table-button {
  margin-top: 1rem;
  padding: 10px 20px;
  background-color: #4CAF50; /* Bouton vert */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.table-button:hover {
  background-color: #45a049; /* Fond plus foncé au survol */
}
</style>