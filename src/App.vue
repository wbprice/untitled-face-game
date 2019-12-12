<template>
  <div id="app">
    <Alert />
    <router-view/>
  </div>
</template>

<script>
import Alert from './components/Alert';

export default {
    name: 'app',
    components: {
        Alert
    }
};
</script>

<style>

* {
  box-sizing: border-box;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 1em;
}

</style>
