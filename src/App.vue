<template>
  <text-editor></text-editor>
</template>

<script>
import TextEditor from "./components/TextEditor.vue";

export default {
  name: "App",
  components: {
    TextEditor,
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

a {
  color: blue;
}

a:visited {
  color: #551a8b;
}

/* CSS beneath this comment is so that dynamically added timer divs in contenteditable div have style applied */

.content {
  display: flex;
  justify-content: space-between;
  background-color: white;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
}

.pause {
  display: flex;
}

.pause > p {
  margin: 0 0 0 5px;
}

.timer-buttons > button {
  all: unset;
  cursor: pointer;
}

.timer-buttons > button:nth-child(1) {
  margin-right: 12px;
}

.new-editor:empty:before {
  content: attr(data-title);
  color: #f5f7f7;
}
</style>
