/* eslint-disable no-console */
export default {
  name: 'MyJsx',
  data() {
    return {on: false};
  },
  methods: {
    toggleOn() {
      this.on = !this.on;
    }
  },
  render() {
    return (
      <div>
        <div>on? {String(this.on)}</div>
        <button onclick={this.toggleOn}>Toggle all lower</button>
        <button onClick={this.toggleOn}>Toggle camelcase</button>
        <button ONCLICK={this.toggleOn}>Toggle all upper</button>
      </div>
    );
  }
};
