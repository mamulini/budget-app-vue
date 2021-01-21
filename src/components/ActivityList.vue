<template>
  <div class="activity">
    <div class="activity__wrapper">
      <h3 class="activity__title">Income activities</h3>
      <p class="activity__subtitle" v-if="incomeTransactions.length === 0">
        There are no income transactions!
      </p>

      <ActivityItem
        v-for="trans in incomeTransactions"
        :key="trans.id"
        :transaction="trans"
        :categories="incomeCategories"
      />
    </div>
    <div class="activity__wrapper">
      <h3 class="activity__title">Expense activities</h3>
      <p class="activity__subtitle" v-if="expenseTransactions.length === 0">
        There are no expense transactions!
      </p>
      <ActivityItem
        v-for="trans in expenseTransactions"
        :key="trans.id"
        :transaction="trans"
        :categories="expenseCategories"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ActivityItem from './ActivityItem.vue';

export default {
  components: {
    ActivityItem
  },
  computed: {
    ...mapGetters([
      'incomeTransactions',
      'expenseTransactions',
      'expenseCategories',
      'incomeCategories'
    ])
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.activity {
  background: var(--lightGreen);
  color: var(--blue-primary);
  width: 900px;
  margin: 0 auto 180px auto;
  border-radius: 10px;

  @media screen and (max-width: 940px) {
    width: 90%;
    min-width: 320px;
  }

  @media screen and (max-width: 540px) {
    width: 98%;
  }

  &__wrapper {
    min-height: 100px;
    margin-bottom: 20px;
  }

  &__title {
    font-size: 20px;
    text-transform: uppercase;
    padding: 10px;
  }

  &__subtitle {
    padding-top: 10px;
  }
}
</style>
