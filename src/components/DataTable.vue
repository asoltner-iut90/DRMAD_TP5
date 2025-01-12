<template>
  <div class="data-table-container" >
    <table>
      <thead>
        <tr>
          <th v-if="itemCheck">
            Select
          </th>
          <th v-for="(header, index) in headers" :key="index">
            {{ header.label }}
          </th>
          <th v-if="itemButton">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" v-bind:key="index">
          <td v-if="itemCheck">
            <input type="checkbox" v-model="selectedItems" :value="item" />
          </td>
          <td v-for="(header, j) in headers" :key="j">
            {{item[header.name]}}
          </td>
          <td v-if="itemButton">
            <button @click="emitItemButton(item)">
              <slot name="item-button" :item="item">
                Action
              </slot>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <button v-if="tableButton" @click="emitTableButton">
      <slot name="table-button">
        Action
      </slot>
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

table{
  text-align: center;
}

</style>