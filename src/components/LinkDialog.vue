<template>
  <base-dialog
    :show="show"
    @click-submit="insertLink"
    @click-cancel="$emit('close-dialog')"
    :buttonText="'insert'"
    title="Insert link"
    :isSubmitDisabled="!validUrl"
    :isDisabledClass="!validUrl"
  >
    <div class="main-content">
      <div class="form-control">
        <label for="link-text">Label (optional)</label>
        <input
          type="text"
          id="link-text"
          placeholder="Link text"
          v-model.trim="linkText"
        />
      </div>
      <div class="form-control">
        <label for="link-url">URL</label>
        <input
          type="url"
          id="link-url"
          pattern="https://.*"
          placeholder="https://example.com"
          v-model.trim="linkUrl"
          @paste="validateUrl"
          @input="validateUrl"
        />
      </div>
    </div>
  </base-dialog>
</template>

<script>
export default {
  props: ["show", "getSelection"],
  emits: ["close-dialog", "click-submit"],
  data() {
    return {
      linkText: "",
      linkUrl: "https://",
      validUrl: false,
    };
  },
  methods: {
    insertLink() {
      const link = document.createElement("a");
      if (this.linkText.length === 0) {
        link.textContent = this.linkUrl;
      } else {
        link.textContent = this.linkText;
      }
      link.href = this.linkUrl;
      link.target = "_blank";
      link.setAttribute("contenteditable", "false");
      if (this.getSelection) {
        this.getSelection.deleteContents();
        this.getSelection.insertNode(link);
      } else {
        const editor = document.getElementById("editorId");
        editor.appendChild(link);
      }
      this.$emit("close-dialog");
      this.resetInput();
      this.validUrl = false;
    },
    resetInput() {
      this.linkText = "";
      this.linkUrl = "";
    },
    validateUrl() {
      try {
        new URL(this.linkUrl);
        this.validUrl = true;
      } catch (error) {
        this.validUrl = false;
      }
    },
  },
};
</script>

<style scoped>
.main-content {
  margin: 20px;
}

.form-control {
  margin: 10px 0;
}

input,
label {
  display: block;
  font: inherit;
}

label {
  color: #555353;
  margin-bottom: 6px;
  font-size: 16px;
}

input[type="text"],
input[type="url"] {
  width: 100%;
  padding: 8px 10px;
  font-size: 16px;
  border-bottom: 1px solid #ccc;
  background-color: #f5f7f7;
}
</style>
