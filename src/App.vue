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

html {
  font-family: "Roboto", sans-serif;
}

body {
  margin: 0;
}
</style>
