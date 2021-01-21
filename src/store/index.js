import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    balance: {
      hryvnia: 0,
      dolar: 0,
      euro: 0,
    },
    transactions: {
      income: [],
      expense: []
    },
    categories: {
      income: [
        { name: 'Salary', id: 1 },
        { name: 'Credit', id: 2 },
        { name: 'Savings', id: 3 },
        { name: 'Gift', id: 4 },
        { name: 'Other', id: 5 }
      ],
      expense: [
        { name: 'Food', id: 1 },
        { name: 'Drinks', id: 2 },
        { name: 'Entertainment', id: 3 },
        { name: 'Cafe', id: 4 },
        { name: 'Restaurant', id: 5 },
        { name: 'Sport', id: 6 },
        { name: 'Shopping', id: 7 },
        { name: 'Music', id: 8 },
        { name: 'Car', id: 9 },
        { name: 'Other', id: 10 }
      ]
    },
  },
  plugins: [createPersistedState()],
  getters: {
    hryvnia: ({ balance }) => `${balance.hryvnia}  UAH`,
    dolar: ({ balance }) => `${balance.dolar}  USD`,
    euro: ({ balance }) => `${balance.euro}  EUR`,
    balance: ({ balance }) => balance,
    incomeTransactions: ({ transactions }) => transactions.income.reverse(),
    expenseTransactions: ({ transactions }) => transactions.expense.reverse(),
    incomeCategories: ({ categories }) => categories.income,
    expenseCategories: ({ categories }) => categories.expense,
  },
  mutations: {
    add_transaction({ transactions }, trans) {
      if (trans.name === "income" && trans.amount >= 0) {
        transactions.income.push(trans);
      } else if (trans.name === "expense" && trans.amount) {
        transactions.expense.push(trans);
      } else {
        alert('Please type the correct amount of transaction!');
      }
    },
    delete_transaction({ transactions, balance }, trans) {
      const confirmDelete = confirm("Are you sure?")
      if (!confirmDelete) return;

      if (trans.name === "income") {
        switch (trans.currency) {
          case 'uah':
            balance.hryvnia -= trans.amount;
            break;
          case 'usd':
            balance.dolar -= trans.amount;
            break;
          case 'euro':
            balance.euro -= trans.amount;
            break;
          default:
            return;
        }
        transactions.income = transactions.income.filter(item => item.id !== trans.id);

      } else if (trans.name === "expense") {
        switch (trans.currency) {
          case 'uah':
            balance.hryvnia += trans.amount;
            break;
          case 'usd':
            balance.dolar += trans.amount;
            break;
          case 'euro':
            balance.euro += trans.amount;
            break;
          default:
            return;
        }
        transactions.expense = transactions.expense.filter(item => item.id !== trans.id);
      } else {
        return;
      }
    },
    add_balance({ balance }, transaction) {
      switch (transaction.currency) {
        case 'uah':
          balance.hryvnia += transaction.amount;
          break;
        case 'usd':
          balance.dolar += transaction.amount;
          break;
        case 'euro':
          balance.euro += transaction.amount;
          break;
        default:
          return;
      }
    },
    reduce_balance({ balance }, transaction) {
      switch (transaction.currency) {
        case 'uah':
          balance.hryvnia -= transaction.amount;
          break;
        case 'usd':
          balance.dolar -= transaction.amount;
          break;
        case 'euro':
          balance.euro -= transaction.amount;
          break;
        default:
          return;
      }
    },
  },
  actions: {
    addTransaction({ commit }, transaction) {
      commit('add_transaction', transaction)
    },
    deleteTransaction({ commit }, transaction) {
      commit('delete_transaction', transaction);
    },
    addBalance({ commit }, transaction) {
      commit('add_balance', transaction);
    },
    reduceBalance({ commit }, transaction) {
      commit('reduce_balance', transaction);
    },
  },
  modules: {}
});
