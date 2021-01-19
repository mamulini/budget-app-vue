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
    }
  },
  plugins: [createPersistedState()],
  getters: {
    hryvnia: ({ balance }) => `${balance.hryvnia}  UAH`,
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
      const realy = confirm("Are you sure?")
      if (!realy) return;

      if (trans.name === "income") {
        balance.hryvnia -= trans.amount;
        transactions.income = transactions.income.filter(item => item.id !== trans.id);

      } else if (trans.name === "expense") {
        balance.hryvnia += trans.amount;
        transactions.expense = transactions.expense.filter(item => item.id !== trans.id);
      } else {
        return;
      }
    },
    add_hryvnia({ balance }, amount) {
      balance.hryvnia += amount;
    },
    reduce_hryvnia({ balance }, amount) {
      balance.hryvnia -= amount;
    },
  },
  actions: {
    addTransaction({ commit }, trans) {
      commit('add_transaction', trans)
    },
    deleteTransaction({ commit }, trans) {
      commit('delete_transaction', trans);
    },
    addHryvnia({ commit }, amount) {
      commit("add_hryvnia", amount);
    },
    reduceHryvnia({ commit }, amount) {
      commit('reduce_hryvnia', amount);
    }
  },
  modules: {}
});
