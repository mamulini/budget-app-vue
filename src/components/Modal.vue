<template>
  <transition name="fade">
    <div class="modal">
      <div class="modal__backdrop" @click="closeModal()" />
      <div class="modal__dialog">
        <div class="amount">
          <h3>Amount</h3>
          <input
            v-model="transaction.amount"
            type="number"
            class="input"
            placeholder="Insert number"
          />
        </div>
        <div>
          <h3>Choose category</h3>
          <select
            class="input select"
            v-model="transaction.selectedCategory"
            tabindex="-1"
            aria-hidden="true"
            placeholder="transaction.selectedCategory"
          >
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
          <input
            class="input"
            type="text"
            v-model="transaction.desc"
            placeholder="Type note"
          />
        </div>
        <div>
          <h3>Choose Date</h3>
          <Date @pick-date="addDate" />
        </div>
        <div class="buttons">
          <button type="button" @click="closeModal()">Cancel</button>
          <button type="button" @click="addTrans(transaction)">Save</button>
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
    addTrans: Function
  },
  data() {
    return {
      transaction: {
        selectedCategory: 'Other',
        desc: '',
        amount: null,
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
    background-color: rgba(0, 0, 0, 0.3);
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
    @media screen and (max-width: 992px) {
      width: 90%;
    }
  }
}

div {
  padding: 10px;
}

.input {
  /* width: 100%; */
  height: 34px;
  padding: 6px;
  margin-top: 5px;
  font-size: 14px;
  line-height: 1.4;
  color: #555;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);

  &:hover,
  &:focus {
    border-color: #409aff;
  }

  &:focus {
    outline: none;
  }
}

.select {
  padding: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* {
  <div class="modal__header">
                    <slot name="header" />
                    <button
                        type="button"
                        class="modal__close"
                        @click="closeModal()"
                    >
                        x
                    </button>
                </div>

                <div class="modal__body">
                    <slot name="body" />
                </div>

                <div class="modal__footer">
                    <slot name="footer" />
                </div>} */
</style>
