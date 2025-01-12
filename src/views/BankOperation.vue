<template>
  <div class="bank-operation">
    <slot name="operation-title">
      <h2>Débit / Virement</h2>
    </slot>

    <div class="form-group">
      <label for="amount">Montant :</label>
      <input
          type="number"
          id="amount"
          v-model="amount"
          placeholder="Saisir le montant"
      />
    </div>

    <div class="form-group">
      <label>
        <input type="checkbox" v-model="hasRecipient" />
        Destinataire
      </label>
      <input
          v-if="hasRecipient"
          type="text"
          v-model="recipient"
          placeholder="N° de compte destinataire"
      />
    </div>

    <button @click="validateOperation">Valider</button>

    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { addTransaction } from "@/services/bankaccount.service";

export default {
  name: "BankOperation",
  data() {
    return {
      amount: null, // Montant saisi
      hasRecipient: false, // Si un destinataire est requis
      recipient: "", // N° de compte destinataire
      successMessage: "", // Message de succès
      errorMessage: "", // Message d'erreur
    };
  },
  methods: {
    async validateOperation() {
      // Vérification des champs obligatoires
      if (!this.amount || (this.hasRecipient && !this.recipient)) {
        this.errorMessage = "Veuillez saisir un montant valide et un destinataire si nécessaire.";
        setTimeout(() => (this.errorMessage = ""), 5000);
        return;
      }

      try {
        // Appel de la fonction de service pour ajouter la transaction
        const response = await addTransaction(
            this.recipient || "current-account",
            this.amount
        );

        if (response.error) {
          throw new Error(response.data);
        }

        // Affichage du message de succès avec l'UUID de la transaction
        this.successMessage = `L'opération est validée avec le n° : ${response.data.uuid}. Vous pouvez la retrouver dans l'historique.`;
        setTimeout(() => (this.successMessage = ""), 5000);
      } catch (error) {
        // Gestion des erreurs : afficher le message d'erreur
        this.errorMessage = `Erreur lors de l'opération : ${error.message}`;
        setTimeout(() => (this.errorMessage = ""), 5000);
      }

      // Réinitialisation des champs après validation
      this.amount = null;
      this.hasRecipient = false;
      this.recipient = "";
    },
  },
};
</script>

<style scoped>
.bank-operation {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 15px;
}

input[type="number"],
input[type="text"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.success-message {
  color: green;
  margin-top: 10px;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
