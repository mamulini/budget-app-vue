<template>
  <div class="transaction">
    <div class="desc-wrapper">
      <p v-if="!editing" class="desc">{{ transaction.desc }}</p>
      <input type="text" v-else v-model="editedDesc" class="input" />
      <p v-if="!editing" class="date">{{ transaction.date }}</p>
      <Date v-else @pick-date="editDate" />
    </div>
    <div>
      <span v-if="!editing">{{ transaction.selectedCategory }}</span>
      <select
        v-else
        class="input select"
        v-model="editedCategory"
        tabindex="-1"
        aria-hidden="true"
        placeholder="editedCategory"
      >
        <option
          v-for="category in categories"
          :value="category.name"
          :key="category.id"
          >{{ category.name }}</option
        >
      </select>
    </div>
    <h3 v-if="!editing" class="transaction__amount">
      {{ transaction.amount }}
    </h3>
    <input v-else v-model="editedAmount" type="number" />
    <div class="transaction__buttons">
      <button class="btn" @click="editTrans(transaction)">
        {{ editing ? 'Confirm' : 'Edit' }}
      </button>
      <button class="btn" @click="deleteTransaction(transaction)">
        Delete
      </button>
    </div>
  </div>
</template>

<script>
import Date from './Date';
import { mapActions } from 'vuex';

export default {
  components: {
    Date
  },
  data() {
    return {
      editing: false,
      editedDesc: '',
      editedAmount: null,
      editedCategory: '',
      editedDate: null
    };
  },
  props: {
    transaction: {},
    categories: null
  },
  methods: {
    ...mapActions(['deleteTransaction', 'addHryvnia', 'reduceHryvnia']),
    editTrans(trans) {
      this.editing = !this.editing;
      if (this.editing) {
        this.editedDesc = trans.desc;
        this.editedAmount = trans.amount;
        this.editedCategory = trans.selectedCategory;
        this.editedDate = trans.date;
      } else {
        if (this.editedAmount <= 0) return;
        trans.desc = this.editedDesc;
        trans.selectedCategory = this.editedCategory;
        trans.date = this.editedDate;
        const prevAmount = trans.amount;
        trans.amount = +this.editedAmount;
        this.editBalance(prevAmount, +this.editedAmount);
      }
    },
    editDate(date) {
      this.editedDate = date;
    },
    editBalance(prevAmount, nextAmount) {
      const amount = prevAmount - nextAmount;
      this.transaction.name === 'income'
        ? this.reduceHryvnia(amount)
        : this.addHryvnia(amount);
    }
  }
};
</script>

<style lang="scss" scoped>
.transaction {
  display: flex;
  justify-content: space-between;
  margin: 10px;
}
</style>
