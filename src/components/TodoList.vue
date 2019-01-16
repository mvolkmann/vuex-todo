<template>
  <div>
    <h2>To Do List</h2>
    <div>
      {{uncompletedCount}} of {{todos.length}} remaining
      <button
        @click="onArchiveCompleted"
      >Archive Completed</button>
    </div>
    <br>
    <form @submit.prevent>
      <input
        type="text"
        size="30"
        autofocus
        placeholder="enter new todo here"
        :value="todoText"
        @input="updateTodoText"
      >
      <button :disabled="!todoText" @click="onAddTodo">Add</button>
    </form>
    <ul class="unstyled">
      <li :key="todo.id" v-for="todo in todos">
        <Todo
          :todo="todo"
          :onDeleteTodo="() => onDeleteTodo(todo.id)"
          :onToggleDone="() => onToggleDone(todo)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
/* eslint-disable no-console */
import {mapState} from 'vuex';
import Todo from './Todo.vue';

export default {
  name: 'TodoList',
  components: {Todo},
  computed: {
    ...mapState({
      todos: state => state.todos,
      todoText: state => state.todoText
    }),
    uncompletedCount() {
      //const {todos} = this.$store.state;
      return this.todos.filter(t => !t.done).length;
    }
  },
  //todos: [createTodo('learn Vue', true), createTodo('build a Vue app')],
  methods: {
    onAddTodo() {
      this.$store.commit('addTodo');
    },

    onArchiveCompleted() {
      this.$store.commit('archiveCompleted');
    },

    onDeleteTodo(todoId) {
      this.$store.commit('deleteTodo', todoId);
    },

    onToggleDone(todo) {
      this.$store.commit('toggleDone', todo);
    },

    updateTodoText(e) {
      this.$store.commit('updateTodoText', e.target.value);
    }
  }
};
</script>

<style scoped>
button:disabled {
  background-color: gray;
  color: white;
}

ul.unstyled {
  list-style: none;
  margin-left: 0;
  padding-left: 0;
}
</style>
