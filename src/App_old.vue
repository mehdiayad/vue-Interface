<template>
  <div id="app" class="pb-5">
    <img alt="Vue logo" src="./assets/logo.png">
    <helloWorld msg="Bienvenue sur Vue.js"></helloWorld>
    <counter></counter>
    <counter></counter>
    <counter></counter>
    <search></search>

  </div>
</template>

<script>

import HelloWorld from './components/HelloWorld.vue'
import Counter from './components/Counter'
import Search from './components/Search'



export default {
  name: 'App',
  components: { 
    HelloWorld, Counter, Search
  }
}
</script>

<style src="./css/style.css"> </style>