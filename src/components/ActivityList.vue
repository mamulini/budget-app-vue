<template>
  <div class="activity">
    <div class="activity__income">
      <h3>Income activities</h3>
      <div v-if="incomeTransactions.length === 0">
        There are no income transactions!
      </div>

      <ActivityItem
        v-for="trans in incomeTransactions"
        :key="trans.id"
        :transaction="trans"
        :categories="incomeCategories"
      />
    </div>
    <div class="activity__expense">
      <h3>Expense activities</h3>
      <div v-if="expenseTransactions.length === 0">
        There are no expense transactions!
      </div>
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
  background: #5cd895;
  color: #ffffff;
  width: 80%;
  margin: 0 auto;
  border-radius: 10px;

  &__expense,
  &__income {
    min-height: 100px;
  }
}
</style>
