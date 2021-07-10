<template>
  <div>
    <main-header></main-header>
    <main-todo></main-todo>
    <main-footer></main-footer>
    <!-- <test></test> -->
  </div>
</template>

<script>
  import './assets/styles/global.styl'

  import MainHeader from './components/MainHeader.vue' // component instance
  import MainTodo from './components/MainTodo/MainTodo.vue'
  import MainFooter from './components/MainFooter.vue'
  // import Test from './components/Test.vue'

  export default {
    name: 'App',
    components: {
      // component name : component instance
      MainHeader: MainHeader,
      MainTodo, //
      MainFooter
      // Test
    }
  }
</script>

<style lang="stylus" scoped></style>