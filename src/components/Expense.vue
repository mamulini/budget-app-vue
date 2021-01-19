<template>
  <Modal
    v-if="show"
    :categories="expenseCategories"
    :close-modal="closeModal"
    :add-trans="addTrans"
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
    ...mapActions(['addTransaction', 'reduceHryvnia']),
    closeModal() {
      this.show = false;
      // document.querySelector('body').classList.remove('overflow-hidden');
    },
    openModal() {
      this.show = true;
      // document.querySelector('body').classList.add('overflow-hidden');
    },
    addTrans(data) {
      data.amount = +data.amount;
      if (data.amount <= 0) {
        alert('Please type the correct amount of transaction!');
        return;
      }
      data.id = v1();
      data.name = this.name;
      this.addTransaction(data);
      this.reduceHryvnia(data.amount);
      this.closeModal();
    }
  }
};
</script>

<style lang="scss" scoped></style>
