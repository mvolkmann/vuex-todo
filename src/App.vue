<template>
  <div id="app">
    <TodoList/>

    <!--Test :name="name"/-->
    <button @click="changeName">Change</button>

    <div v-for="color in colors" :key="color">
      <input :id="color" type="checkbox" v-model="selectedColors" :value="color">
      <label :for="color">{{color}}</label>
    </div>

    <span v-show="display">not always visible</span>
    <button @click="display = !display">Toggle</button>

    <MyJsx/>
  </div>
</template>

<script>
/* eslint-disable no-console */
//import Test from './components/Test.vue';
import MyJsx from './components/MyJsx';
import TodoList from './components/TodoList';
import store from './store';

export default {
  name: 'app',
  components: {
    MyJsx,
    TodoList
    //Test
  },
  data: () => {
    return {
      display: true,
      colors: ['red', 'green', 'blue'],
      selectedColors: [],
      name: 'start',
      time: 0
    };
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
