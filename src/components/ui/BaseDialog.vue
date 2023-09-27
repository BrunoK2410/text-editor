<template>
  <teleport to="body">
    <div v-if="show" class="backdrop"></div>
    <dialog open v-if="show">
      <header>
        <h2>{{ title }}</h2>
      </header>
      <button @click="$emit('click-cancel')" class="close-button">X</button>
      <slot></slot>
      <base-buttons
        @click-cancel="$emit('click-cancel')"
        @click-submit="$emit('click-submit')"
        :isSubmitDisabled="isSubmitDisabled"
        :isDisabledClass="isDisabledClass"
        :buttonText="buttonText"
      ></base-buttons>
    </dialog>
  </teleport>
</template>

<script>
export default {
  props: ["show", "title", "isSubmitDisabled", "isDisabledClass", "buttonText"],
  emits: ["click-cancel", "click-submit"],
};
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 99;
}

dialog {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  border-radius: 12px 12px 0 0;
  height: fit-content;
  max-height: 90%;
  width: 50%;
  overflow: auto;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: auto;
  padding-right: 0;
  padding-left: 0;
  padding-bottom: 0;
  background-color: white;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

h2 {
  margin-left: 20px;
}
</style>
