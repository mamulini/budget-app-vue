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

:root {
  --white-primary: #edf5e1;
  --blue-primary: #05386b;
  --lightGreen: #5cd895;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

button {
  background-color: var(--blue-primary);
  border-radius: 5px;
  cursor: pointer;
  color: #ffffff;
  font-size: 15px;
  padding: 5px 15px;
  border: none;
  outline: none;
  &:hover {
    background-color: var(--lightGreen);
  }
  &:active {
    position: relative;
    top: 1px;
  }
}

input,
select {
  height: 28px;
  padding: 6px;
  font-size: 14px;
  color: #555555;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  border-radius: 4px;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);

  &:hover,
  &:focus {
    border-color: #409aff;
  }

  &:focus {
    outline: none;
  }
}
</style>
