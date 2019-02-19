import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

let lastId = 0;
const createTodo = (text, done = false) => ({id: ++lastId, text, done});

const SERVER_URL = 'http://localhost:1919/todo/';

export default new Vuex.Store({
  strict: true,
  state: {
    todoText: '',
    //todos: [createTodo('learn Vue', true), createTodo('build a Vue app')]
    todos: []
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
    setTodos(state, todos) {
      state.todos = todos;
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
  },
  actions: {
    async addTodo(context) {
      const todo = createTodo(context.state.todoText);
      const res = await fetch(SERVER_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(todo)
      });
      if (res.ok) {
        context.commit('addTodo');
      } else {
        alert('Error adding todo');
      }
    },
    async deleteTodo(context, todoId) {
      const res = await fetch(SERVER_URL + todoId, {method: 'DELETE'});
      if (res.ok) {
        context.commit('deleteTodo');
      } else {
        alert('Error deleting todo');
      }
    }
  }
});
