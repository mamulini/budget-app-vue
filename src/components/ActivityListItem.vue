<template>
  <div class="transaction">
    <div class="transaction__container">
      <div class="transaction__date-category-wrapper">
        <span class="transaction__category" v-if="!editing">{{
          transaction.selectedCategory
        }}</span>
        <select v-else class="transaction__input " v-model="editedCategory">
          <option
            v-for="category in categories"
            :value="category.name"
            :key="category.id"
            >{{ category.name }}</option
          >
        </select>
        <div class="transaction__date">
          <p v-if="!editing" class="date">{{ transaction.date }}</p>
          <Date
            v-else
            :transaction-date="transaction.date"
            @pick-date="editDate"
          />
        </div>
      </div>
      <div class="transaction__desc">
        <p v-if="!editing">{{ transaction.desc }}</p>
        <input
          type="text"
          v-else
          v-model="editedDesc"
          class="transaction__input transaction__input--desc"
          placeholder="Type note"
          maxlength="40"
        />
      </div>
      <div class="transaction__amount">
        <h3 v-if="!editing">
          {{ computedAmount }}
        </h3>
        <input
          v-else
          v-model="editedAmount"
          type="number"
          class="transaction__input transaction__input--amount"
        />
      </div>
    </div>
    <div class="transaction__button-wrapper">
      <button class="transaction__button" @click="editTransaction(transaction)">
        {{ editing ? 'Confirm' : 'Edit' }}
      </button>
      <button
        class="transaction__button transaction__button--danger"
        @click="deleteTransaction(transaction)"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script>
import Date from './Date';
import { mapActions } from 'vuex';

export default {
  name: 'ActivityListItem',
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
    transaction: {
      desc: String,
      amount: Number,
      date: String,
      selectedCategory: String,
      id: String,
      name: String,
      currency: String
    },
    categories: {
      name: String,
      id: Number
    }
  },
  computed: {
    computedAmount() {
      return this.transaction.amount
        ? `${this.transaction.amount} ${this.transaction.currency
            .slice(0, 3)
            .toUpperCase()}`
        : null;
    }
  },
  methods: {
    ...mapActions(['deleteTransaction', 'addBalance', 'reduceBalance']),
    editTransaction(transaction) {
      this.editing = !this.editing;
      if (this.editing) {
        this.editedDesc = transaction.desc;
        this.editedAmount = transaction.amount;
        this.editedCategory = transaction.selectedCategory;
        this.editedDate = transaction.date;
      } else {
        if (this.editedAmount <= 0) return;

        transaction.desc = this.editedDesc;
        transaction.selectedCategory = this.editedCategory;
        transaction.date = this.editedDate;
        const prevAmount = transaction.amount;
        transaction.amount = +this.editedAmount;
        this.editBalance(prevAmount, +this.editedAmount);
      }
    },
    editDate(date) {
      this.editedDate = date;
    },
    editBalance(prevAmount, nextAmount) {
      const transaction = { ...this.transaction };
      transaction.amount = prevAmount - nextAmount;
      this.transaction.name === 'income'
        ? this.reduceBalance(transaction)
        : this.addBalance(transaction);
    }
  }
};
</script>

<style lang="scss" scoped>
.transaction {
  background: var(--white-primary);
  color: var(--blue-primary);
  margin: 10px 20px;
  padding: 10px 20px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 720px) {
    flex-direction: column;
    margin: 10px 10px;
    padding: 10px 10px;
  }

  &__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 2;
    width: 100%;

    @media screen and (max-width: 720px) {
      align-items: start;
    }
  }

  &__date-category-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    width: 125px;
  }

  &__date {
    margin-top: 10px;

    @media screen and (max-width: 460px) {
      font-size: 14px;
      white-space: nowrap;
    }
  }

  &__desc {
    flex: 2 1 auto;
    display: flex;
    justify-content: start;
    margin-left: 20px;

    @media screen and (max-width: 520px) {
      margin-left: 5px;
    }
  }

  &__amount {
    padding-right: 10px;
    padding-left: 20px;

    h3 {
      white-space: nowrap;
    }
  }

  &__input {
    &--amount {
      max-width: 70px;
      font-size: 18px;

      @media screen and (max-width: 460px) {
        max-width: 40px;
      }
    }

    &--desc {
      @media screen and (max-width: 460px) {
        max-width: 80px;
      }
    }
  }

  &__button-wrapper {
    display: flex;
    justify-content: space-between;

    @media screen and (max-width: 820px) {
      flex-direction: column;

      button {
        margin: 5px;
      }
    }

    @media screen and (max-width: 720px) {
      flex-direction: row;
    }
  }

  &__button {
    padding: 5px;
    width: 80px;
    margin-left: 5px;
  }

  &__button--danger {
    background-color: rgb(194, 34, 34);
  }

  &__button--danger:hover {
    background-color: var(--lightGreen);
  }
}
</style>
