import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

let lastId = 0;
const createTodo = (text, done = false) => ({id: ++lastId, text, done});

export default new Vuex.Store({
  strict: true,
  state: {
    todoText: '',
    todos: [createTodo('learn Vue', true), createTodo('build a Vue app')]
  },
  mutations: {
    addTodo(state) {
      const todo = createTodo(state.todoText);
      state.todos.push(todo);
      state.todoText = '';
    },
    archiveCompleted(state) {
      state.todos = state.todos.filter(t => !t.done);
    },
    deleteTodo(state, todoId) {
      state.todos = state.todos.filter(t => t.id !== todoId);
    },
    toggleDone(state, todo) {
      const todoToToggle = state.todos.find(t => t.id === todo.id);
      todoToToggle.done = !todoToToggle.done;
    },
    updateTodoText(state, todoText) {
      state.todoText = todoText;
    }
  },
  getters: {
    uncompletedCount: state => state.todos.filter(t => !t.done).length
  }
});
