<template>
  <transition name="fade">
    <div class="modal" v-if="show">
      <div class="modal__backdrop" @click="closeModal()" />

      <div class="modal__dialog">
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
      </div>
      <button type="button" class="modal__close" @click="closeModal()">
        x
      </button>
    </div>
  </transition>
</template>

<script>
// import { v1 } from "uuid";

export default {
  name: 'Modal',
  data() {
    return {
      show: false,
      date: new Date().toLocaleString(),
      categories: [
        { name: 'Salary', id: 1 },
        { name: 'Credit', id: 2 },
        { name: 'Savings', id: 3 },
        { name: 'Gift', id: 4 }
      ]
    };
  },
  computed: {
    localeDate() {
      return this.date;
    }
  },
  methods: {
    closeModal() {
      this.show = false;
      document.querySelector('body').classList.remove('overflow-hidden');
    },
    openModal() {
      this.show = true;
      document.querySelector('body').classList.add('overflow-hidden');
    }
  },
  created() {
    this.intervalId = setInterval(
      () => (this.date = new Date().toLocaleString()),
      1000
    );
  },
  beforeDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
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
  &__close {
    width: 30px;
    height: 30px;
  }
  &__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 20px 20px 10px;
  }
  &__body {
    padding: 10px 20px 10px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
  &__footer {
    padding: 10px 20px 20px;
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
