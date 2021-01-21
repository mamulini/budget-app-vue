<template>
  <Modal
    v-if="show"
    :categories="incomeCategories"
    :close-modal="closeModal"
    :add-transaction="addIncomeTransaction"
  />
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Modal from './Modal';
import { v1 } from 'uuid';

export default {
  name: 'Income',
  components: {
    Modal
  },
  data() {
    return {
      show: false,
      name: 'income'
    };
  },
  computed: {
    ...mapGetters(['incomeCategories'])
  },
  methods: {
    ...mapActions(['addTransaction', 'addHryvnia', 'addBalance']),
    closeModal() {
      this.show = false;
    },
    openModal() {
      this.show = true;
    },
    addIncomeTransaction(data) {
      data.amount = +data.amount;
      if (data.amount <= 0) {
        alert('Please type the correct amount of transaction!');
        return;
      }
      data.id = v1();
      data.name = this.name;
      this.addTransaction(data);
      this.addBalance(data);
      this.closeModal();
    }
  }
};
</script>

<style lang="scss" scoped></style>
