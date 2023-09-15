<template>
  <div class="buttons-container">
    <button class="cancel" @click="$emit('click-cancel')">CANCEL</button>
    <button
      @click="$emit('click-insert')"
      :disabled="isConfirmDisabled"
      class="insert"
      :class="{ 'disable-button': isDisabledClass }"
    >
      INSERT
    </button>
  </div>
</template>

<script>
export default {
  props: ["clickApply", "isConfirmDisabled", "isDisabledClass"],
  emits: ["click-cancel", "click-insert"],
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
}

.cancel {
  background-color: #eb4b58;
}

.insert {
  background-color: #105219;
}

.disable-button {
  background-color: #62cc70;
}
</style>
