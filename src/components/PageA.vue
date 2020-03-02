<template>
  <div>
  <ol>
    <li v-for="todo in todos" v-bind:key="todo.id">
      {{ todo.text }}
    </li>
  </ol>
  
  <button v-on:click="reverseMessage">Reverse Message</button>
</div>
</template>

<script>
  export default {
  data() {
    return {
      todos: [
            { id: 1, text: 'Learn JavaScript' },
            { id: 2, text: 'Learn Vue' },
            { id: 3, text: 'Build something awesome' }
      ]
    }
  }
}
</script>


<style></style>

