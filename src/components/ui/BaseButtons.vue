<template>
  <div class="buttons-container">
    <button class="cancel" @click="$emit('click-cancel')">CANCEL</button>
    <button
      @click="$emit('click-submit')"
      :disabled="isConfirmDisabled"
      class="insert"
      :class="{
        'disable-button': isDisabledClass,
        apply: isApplyButton,
        insert: isInsertButton,
      }"
    >
      {{ buttonText.toUpperCase() }}
    </button>
  </div>
</template>

<script>
export default {
  props: ["isConfirmDisabled", "isDisabledClass", "buttonText"],
  emits: ["click-cancel", "submit"],
  computed: {
    isApplyButton() {
      return this.buttonText.trim().toUpperCase() === "APPLY";
    },
    isInsertButton() {
      return this.buttonText.trim().toUpperCase() === "INSERT";
    },
  },
};
</script>

<style scoped>
.buttons-container {
  display: flex;
  margin-top: 50px;
}
button {
  flex-basis: 50%;
  padding: 20px 0px;
  color: #fff;
  border: none;
  cursor: pointer;
}

.cancel {
  background-color: #eb4b58;
}

.insert {
  background-color: #105219;
}

.apply {
  background-color: #1a90ff;
}

.disable-button {
  background-color: #62cc70;
  cursor: default;
}
</style>
