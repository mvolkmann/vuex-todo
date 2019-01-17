<template>
  <div id="app">
    <TodoList/>
    <Test :name="name"/>
    <button @click="changeName">Change</button>
  </div>
</template>

<script>
/* eslint-disable no-console */
import Test from './components/Test.vue';
import TodoList from './components/TodoList.vue';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

let lastId = 0;
const createTodo = (text, done = false) => ({id: ++lastId, text: text, done});

const store = new Vuex.Store({
  strict: true,
  state: {
    todoText: '',
    todos: [createTodo('learn Vue', true), createTodo('build a Vue app')]
  },
  mutations: {
    addTodo(state) {
      const todo = createTodo(state.todoText);
      state.todos = state.todos.concat(todo);
      state.todoText = '';
    },
    archiveCompleted(state) {
      state.todos = state.todos.filter(t => !t.done);
    },
    deleteTodo(state, todoId) {
      state.todos = state.todos.filter(t => t.id !== todoId);
    },
    toggleDone(state, todo) {
      const {id} = todo;
      state.todos = state.todos.map(t =>
        t.id === id ? {...t, done: !t.done} : t
      );
    },
    updateTodoText(state, todoText) {
      state.todoText = todoText;
    }
  },
  getters: {
    uncompletedCount: state => state.todos.filter(t => !t.done).length
  }
});

export default {
  name: 'app',
  components: {
    TodoList,
    Test
  },
  data: () => {
    return {name: 'start'};
  },
  methods: {
    changeName() {
      this.name = 'T' + Date.now();
    }
  },
  store
};
</script>

<style>
#app {
  font-family: sans-serif;
  padding-left: 10px;
}
</style>
