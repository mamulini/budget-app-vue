<template>
  <div class="homepage">
    <Balance :uah="hryvnia" :usd="dolar" :eur="euro" />
    <ActivityList />
  </div>
</template>

<script>
import Balance from '../components/Balance';
import ActivityList from '../components/ActivityList';
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  components: {
    Balance,
    ActivityList
  },
  computed: {
    ...mapGetters(['hryvnia', 'dolar', 'euro'])
  }
};
</script>

<style lang="scss" scoped>
.homepage {
  background: var(--white-primary);
  color: var(--blue-primary);
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
