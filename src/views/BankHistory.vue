
<template>
  <div class="bank-history">
    <h2><slot name="title">Operations passées</slot></h2>
    <input type="checkbox" name="filter-checkbox" v-model="filter" />
    <label for="filter-checkbox">Filtrer par période</label>
    <div v-if="filter" class="filter-date-container">
      <label for="filter-date-from">Du</label>
      <input type="date" name="filter-date-from" v-model="from" :max="to" class="filter-date"/>
      <label for="filter-date-to">Au</label>
      <input type="date" name="filter-date-to" v-model="to" :min="from" class="filter-date"/>
    </div>

    <DataTable :item-check="true" :headers="headers" :items="filtered" :item-button="true" :table-button="true" @itemClicked="showDetails" @tableClicked="showSelectedDetails">
      <template #item-button>
        Details
      </template>
      <template #table-button>
        Voir
      </template>
    </DataTable>

  </div>
</template>

<script>
  import DataTable from "@/components/DataTable.vue";
  import {mapActions, mapState} from "vuex";

  export default {
    name: "BankHistory",
    components: {DataTable},
    data() {
      return {
        filter: false,
        from:"",
        to:"",
        headers:[{"label":"Montant", "name":"amount"}, {"label":"date", "name":"formattedDate"}, {"label":"Source/Destinataire", "name":"direction"}],
      }
    },
    methods: {
      ...mapActions('bank', ['getAccountTransactions']),
      formattedDate(d) {
        const date = new Date(d);
        return date.toLocaleDateString("fr-FR", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        });
      },

      showSelectedDetails(transactions){
        let content = "";
        for(let transaction of transactions){
          content += transaction.uuid+"\n";
        }
        alert(content);
      },

      showDetails(transaction) {
        this.showSelectedDetails([transaction]);
      }

    },
    computed: {
      ...mapState('bank', ["accountTransactions", "currentAccount"]),
      balanceClass() {
        return this.currentAccount.amount >= 0 ? 'positive' : 'negative';
      },
      filtered(){
        let result = [];
        for(let transaction of this.accountTransactions){
          result.push({amount:transaction.amount,
            date:transaction.date.$date,
            direction:transaction.amount < 0 ? 'S' : 'D',
            formattedDate: this.formattedDate(transaction.date.$date),
            uuid: transaction.uuid,
          });
        }
        if(this.filter){
            result = result.filter(transaction => {
              return (!this.from || transaction.date >= this.from) &&
                  (!this.to || transaction.date <= this.to);
            });
        }
        result.sort((b,a) => new Date(a.date) - new Date(b.date));
        return result;
      },
    },
    async mounted() {
      await this.getAccountTransactions(this.currentAccount._id);
    }
  }
</script>

<style scoped>

.positive {
  color: #28a745;
}

.negative {
  color: #dc3545;
}

.bank-history {
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  margin: 20px auto;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #333;
}

.filter-date-container {
  margin-top: 20px;
  margin-bottom: 20px;
}

.filter-date-container label {
  font-size: 1rem;
  color: #555;
}

.filter-date {
  margin: 0 10px;
  padding: 5px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input[type="checkbox"] {
  margin-right: 10px;
}

input[type="checkbox"]:checked {
  accent-color: #007bff;
}

input[type="checkbox"] + label {
  font-size: 1rem;
  color: #555;
}

button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

button:hover {
  background-color: #0056b3;
}
</style>