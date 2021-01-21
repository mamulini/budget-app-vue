<template>
  <div class="header">
    <h2 class="header__title">Manage your finances</h2>
  </div>
</template>

<script>
export default {
  name: 'Header'
};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #05386b;

  &__title {
    font-size: 25px;
    color: #ffffff;
  }
}
</style>
