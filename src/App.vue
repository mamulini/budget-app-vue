<template>
  <div id="app">
    <Header />
    <Home />
  </div>
</template>

<script>
import Header from './components/Header';
import Home from './views/Home';

export default {
  name: 'App',
  components: {
    Header,
    Home
  }
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

button {
  background-color: #2c3e50;
  border-radius: 6px;
  cursor: pointer;
  color: #ffffff;
  font-size: 15px;
  padding: 6px 24px;
  outline: none;
  &:hover {
    background-color: #9b5d67;
  }
  &:active {
    position: relative;
    top: 1px;
  }
}
</style>
