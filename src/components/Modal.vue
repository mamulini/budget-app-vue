<template>
  <transition name="fade">
    <div class="modal">
      <div class="modal__backdrop" @click="closeModal()" />
      <div class="modal__dialog">
        <div class="modal__currency">
          <h3>Currency</h3>
          <select v-model="transaction.currency">
            <option value="uah">UAH</option>
            <option value="usd">USD</option>
            <option value="euro">EUR</option>
          </select>
        </div>
        <div class="modal__amount">
          <div>
            <h3>Amount</h3>
            <input
              v-model="transaction.amount"
              type="number"
              class="input"
              placeholder="Insert number"
            />
          </div>
        </div>
        <div class="modal__category">
          <h3>Choose category</h3>
          <select v-model="transaction.selectedCategory">
            <option
              v-for="category in categories"
              :value="category.name"
              :key="category.id"
              >{{ category.name }}</option
            >
          </select>
        </div>
        <div class="modal__desc">
          <h3>Description</h3>
          <input
            type="text"
            v-model="transaction.desc"
            placeholder="Type note"
            maxlength="40"
          />
        </div>
        <div class="modal__date">
          <h3>Choose Date</h3>
          <Date @pick-date="addDate" />
        </div>
        <div class="modal__button-wrapper">
          <button class="modal__button" type="button" @click="closeModal()">
            Cancel
          </button>
          <button
            class="modal__button"
            type="button"
            @click="addTransaction(transaction)"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Date from './Date';

export default {
  name: 'Modal',
  components: {
    Date
  },
  props: {
    categories: Array,
    closeModal: Function,
    addTransaction: Function
  },
  data() {
    return {
      transaction: {
        selectedCategory: 'Other',
        desc: '',
        amount: null,
        currency: 'uah',
        date: null
      }
    };
  },
  methods: {
    addDate(date) {
      this.transaction.date = date;
    }
  }
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9;
  overflow-x: hidden;
  overflow-y: auto;
  &__backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }
  &__dialog {
    position: relative;
    width: 600px;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 5px;
    margin: 50px auto;
    display: flex;
    flex-direction: column;
    z-index: 2;
    @media screen and (max-width: 540px) {
      width: 90%;
    }
  }

  &__button-wrapper {
    display: flex;
    justify-content: center;
  }

  &__button {
    margin: 0 10px;
  }

  &__date {
    position: relative;
    div {
      position: relative;
      left: 40px;
    }
  }

  div {
    padding-top: 10px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
