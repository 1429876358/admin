<template>
  <div class="home">
    <el-button @click="addcount">count++</el-button>
    <el-button @click="tologinpage">跳转login页</el-button>
    <el-button @click="getterFiter">getterFilter</el-button>
    <div>{{ count }}</div>
    <div>{{ doneTodos_one }}</div>
    <div>{{ doneTodos_two }}</div>
    <div>{{ doneTodos_three }}</div>
    <div>{{ newdoneTodos_three }}</div>

  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'Home',
  components: {
    // HelloWorld
  },
  data() {
    return {
      user: 'zht1',
      password: '123',
      name: 'zht',
      number: 0
    }
  },
  computed: {
    numbers: function() {
      console.log(this.number)
      return 1
    },
    count() {
      return this.$store.state.todo[0].value
    },
    ...mapGetters([
      'doneTodos_one',
      'doneTodos_two',
      'doneTodos_three'
    ]),
    ...mapGetters({
      // 把 `this.newdoneTodos_three` 映射为 `this.$store.getters.doneTodos_three`
      newdoneTodos_three: 'doneTodos_three'
    })
  },
  mounted() {
    // var that = this
    setInterval(function() {
      this.number += 1
      console.log(this.number)
    }, 2000)
  },
  methods: {
    addcount() {
      this.$store.state.todo[0].value++
    },
    tologinpage() {
      this.$router.push({ path: '/login' })
    },
    getterFiter() {
      this.$store.getters.doneTodos
      // console.log(this.$store.getters.doneTodos)
    }
  }
}
</script>
