import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var store = new Vuex.Store({
  state: {
    todo: [
      { name: 'zht1', value: '1' },
      { name: 'zht2', value: '2' }
    ],
    todos: [
      { name: 'zht0', value: 0 },
      { name: 'zht1', value: 1 }
    ],
    doneTodos_onevalue: 100,
    doneTodos_twovalue: 200,
    doneTodos_threevalue: 300
  },
  getters: {
    doneTodos: state => {
      console.log(state.todos.filter(todo => todo.value))
      return state.todos.filter(todo => todo.value)[0].value
    },
    doneTodos_one: state => {
      return state.doneTodos_onevalue
    },
    doneTodos_two: state => {
      return state.doneTodos_twovalue
    },
    doneTodos_three: state => {
      return state.doneTodos_threevalue
    }
  },
  mutations: {},
  actions: {},
  modules: {}
})

export default store
