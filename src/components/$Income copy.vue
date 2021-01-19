<template>
  <div>
    <Modal ref="modalName">
      <template v-slot:body>
        <div class="amount">
          <input type="number" class="amount-input" />
        </div>
        <div>
          <h3>Choose category</h3>
          <select tabindex="-1" aria-hidden="true">
            <option
              v-for="category in categories"
              :value="category.name"
              :key="category.id"
              >{{ category.name }}</option
            >
          </select>
        </div>
        <div>
          <h3>Description</h3>
          <input />
        </div>
        <div class="buttons">
          <button>Cancel</button>
          <button>Save</button>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script>
import Modal from './Modal';

export default {
  name: 'Income',
  components: {
    Modal
  },
  data() {
    return {
      show: false,
      categories: [
        { name: 'Salary', id: 1 },
        { name: 'Credit', id: 2 },
        { name: 'Savings', id: 3 },
        { name: 'Gift', id: 4 }
      ]
    };
  },
  computed: {},
  methods: {
    closeModal() {
      this.show = false;
      document.querySelector('body').classList.remove('overflow-hidden');
    },
    openModal() {
      this.show = true;
      document.querySelector('body').classList.add('overflow-hidden');
    }
  }
};
</script>

<style lang="scss" scoped></style>
