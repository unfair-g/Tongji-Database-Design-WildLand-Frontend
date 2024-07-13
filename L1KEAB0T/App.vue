<template>
  <div id="app">
    <your-component />
  </div>
</template>

<script>
import YourComponent from './components/YourComponent.vue';

export default {
  name: 'App',
  components: {
    YourComponent
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  width: 1920px;
  height: 1080px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
