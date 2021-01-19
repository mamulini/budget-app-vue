<template>
  <div class="home">
    <Balance />
    <ActivityList />
  </div>
</template>

<script>
import Balance from '../components/Balance';
import ActivityList from '../components/ActivityList';

export default {
  name: 'home',
  components: {
    Balance,
    ActivityList
  },
  computed: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.home {
  background: #edf5e1;
  color: #05386b;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
