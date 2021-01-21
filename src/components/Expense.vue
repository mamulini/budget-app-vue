<template>
  <Modal
    v-if="show"
    :categories="expenseCategories"
    :close-modal="closeModal"
    :add-transaction="addExpenseTransaction"
  />
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Modal from './Modal';
import { v1 } from 'uuid';

export default {
  name: 'Exspense',
  components: {
    Modal
  },
  data() {
    return {
      show: false,
      name: 'expense'
    };
  },
  computed: {
    ...mapGetters(['expenseCategories'])
  },
  methods: {
    ...mapActions(['addTransaction', 'reduceHryvnia', 'reduceBalance']),
    closeModal() {
      this.show = false;
    },
    openModal() {
      this.show = true;
    },
    addExpenseTransaction(data) {
      data.amount = +data.amount;
      if (data.amount <= 0) {
        alert('Please type the correct amount of transaction!');
        return;
      }
      data.id = v1();
      data.name = this.name;
      this.addTransaction(data);
      this.reduceBalance(data);
      this.closeModal();
    }
  }
};
</script>

<style lang="scss" scoped></style>
