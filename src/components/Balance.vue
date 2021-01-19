<template>
  <div class="balance">
    <h2 class="balance__title">Cash: {{ hryvnia }}</h2>
    <div class="balance__buttons-wrapper">
      <button @click="$refs.IncomeModal.openModal()" class="balance__btn">
        Add Income
      </button>
      <button @click="$refs.expenseModal.openModal()" class="balance__btn">
        Add Expense
      </button>
    </div>
    <div>
      <Income ref="IncomeModal" />
      <Expense ref="expenseModal" />
    </div>
  </div>
</template>

<script>
import Income from './Income';
import Expense from './Expense';
import { mapGetters } from 'vuex';

export default {
  name: 'balance',
  components: {
    Income,
    Expense
  },
  computed: {
    ...mapGetters(['hryvnia'])
  },
  methods: {
    cons() {
      console.log(this.hryvnia);
    }
    //   closeModal() {
    //     this.show = false;
    //     document.querySelector('body').classList.remove('overflow-hidden');
    //   },
    //   openModal() {
    //     this.show = true;
    //     document.querySelector('body').classList.add('overflow-hidden');
    //   }
  }
};
</script>

<style lang="scss" scoped>
.balance {
  background: #edf5e1;
  color: #05386b;
  margin-bottom: 50px;

  &__title {
    padding: 20px;
  }
  &__btn {
    box-shadow: inset 0px 1px 3px 0px #3dc21b;
    background: linear-gradient(to bottom, #44c767 5%, #5cbf2a 100%);
    background-color: #44c767;
    border-radius: 5px;
    border: 1px solid #18ab29;
    cursor: pointer;
    color: #ffffff;
    font-size: 16px;
    padding: 11px 23px;
    text-shadow: 0px -1px 0px #2f6627;
    margin: 10px;
  }

  &__btn:hover {
    background: linear-gradient(to bottom, #5cbf2a 5%, #44c767 100%);
    background-color: #5cbf2a;
  }

  &__btn:active {
    position: relative;
    top: 1px;
  }
}
</style>
