<template>
  <div id="app">
    <TodoList/>
  </div>
</template>

<script>
/* eslint-disable no-console */
import TodoList from './components/TodoList.vue';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

function addTodoInternal(text, done = false) {
  const {state} = store;
  const todo = {id: ++state.lastId, text: text, done};
  state.todos = state.todos.concat(todo);
  state.todoText = '';
}

const store = new Vuex.Store({
  state: {
    lastId: 0,
    todoText: '',
    todos: []
  },
  mutations: {
    addTodo(state) {
      addTodoInternal(state.todoText);
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
  }
});

addTodoInternal('learn Vue', true);
addTodoInternal('build a Vue app');

export default {
  name: 'app',
  components: {
    TodoList
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
