<template>
  <div class="login">
    <div>{{ count }}</div>
    <div>{{ counts }}</div>
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Login',
  data() {
    return {
      count: '',
      counts: ''
    }
  },
  mounted() {
    this.count = this.$store.state.todo[0].value
    this.counts = this.$store.getters.doneTodos
  },
  methods: {

  }
}
</script>
