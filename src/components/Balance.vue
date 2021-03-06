<template>
  <div class="balance">
    <div class="balance__amount-wrapper">
      <div class="balance__total">
        <button @click="getTotalSum()">
          {{ showTotal ? 'Hide Total' : 'Show Total' }}
        </button>
        <h4 v-if="showTotal">{{ totalSum }} UAH</h4>
      </div>
      <h2 v-if="amount === usd" class="balance__amount">{{ usd }}</h2>
      <h2 v-else-if="amount === eur" class="balance__amount">{{ eur }}</h2>
      <h2 v-else class="balance__amount">{{ uah }}</h2>
      <div class="balance__select-wrapper">
        <h3 class="balance__select-title">Select Currency</h3>
        <select class="balance__select" v-model="amount" placeholder="UAH">
          <option :value="uah" :key="uah">UAH</option>
          <option :value="usd" :key="usd">USD</option>
          <option :value="eur" :key="eur">EUR</option>
        </select>
      </div>
    </div>
    <div class="balance__buttons-wrapper">
      <button @click="$refs.IncomeModal.openModal()" class="balance__button">
        Add Income
      </button>
      <button @click="$refs.expenseModal.openModal()" class="balance__button">
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
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Balance',
  components: {
    Income,
    Expense
  },
  props: {
    uah: String,
    usd: String,
    eur: String
  },
  data() {
    return {
      amount: this.uah,
      showTotal: false
    };
  },
  computed: {
    ...mapGetters(['exchangeRates', 'totalSum', 'balance'])
  },
  methods: {
    ...mapActions(['addTotalSum']),
    getTotalSum() {
      let sum = this.balance.hryvnia;
      this.exchangeRates.forEach(item => {
        if (item.cc === 'USD') {
          sum += this.balance.dolar * item.rate;
        } else {
          sum += this.balance.euro * item.rate;
        }
      });
      this.showTotal = !this.showTotal;
      this.addTotalSum(sum.toFixed(2));
    }
  }
};
</script>

<style lang="scss" scoped>
.balance {
  background: var(--white-primary);
  color: var(--blue-primary);
  margin-bottom: 20px;

  &__amount-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    position: relative;
  }

  &__select-wrapper {
    position: absolute;
    right: 30px;
    margin-top: 20px;

    @media screen and (max-width: 720px) {
      margin-top: -10px;
      right: 10px;
    }
  }

  &__buttons-wrapper {
    margin-top: 15px;
  }

  &__select-title {
    @media screen and (max-width: 720px) {
      font-size: 16px;
    }
  }

  &__select {
    margin: 0;
  }

  &__button {
    font-size: 16px;
    margin: 10px;
  }

  &__total {
    position: absolute;
    left: 10px;
    margin-top: 20px;

    button {
      background-color: var(--lightGreen);
      margin-bottom: 5px;
      border: 1px solid transparent;

      &:hover {
        background-color: var(--white-primary);
        color: var(--blue-primary);
        border: 1px solid var(--blue-primary);
      }
    }

    @media screen and (max-width: 720px) {
      margin-top: -10px;
      left: 10px;
    }
  }
}
</style>
