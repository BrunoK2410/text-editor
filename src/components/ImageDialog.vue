<template>
  <base-dialog
    :show="show"
    title="Insert image"
    @click-submit="insertImage"
    @click-cancel="$emit('close-dialog')"
    :isConfirmDisabled="isImageNull"
    :isDisabledClass="isImageNull"
    :dialogSize="'big'"
    :buttonText="'insert'"
  >
    <div class="main-content">
      <section class="form-section">
        <form>
          <div class="form-control">
            <label for="source-url">Source URL</label>
            <input
              type="url"
              id="source-url"
              placeholder="Add image URL"
              v-model.trim="imageUrl"
              :disabled="file"
            />
          </div>
          <div class="form-control">
            <div class="counter-label">
              <label for="alt-text">Alt text (recommended)</label>
              <span>{{ altCounter }}</span>
            </div>
            <input
              type="text"
              id="alt-text"
              placeholder="Alternate text for an image"
              maxlength="60"
              ref="altText"
              v-model.trim="altText"
            />
          </div>
          <div class="form-control">
            <div class="counter-label">
              <label for="title-text">Title (Optional)</label>
              <span>{{ titleCounter }}</span>
            </div>
            <input
              type="text"
              id="title-text"
              placeholder="Tooltip text for image"
              maxlength="60"
              v-model.trim="imageTitle"
            />
          </div>
          <div class="form-control">
            <button class="apply" @click.prevent="applyChanges">Apply</button>
          </div>
          <h3>--OR--</h3>
          <h2>Upload Image</h2>
          <div class="form-control">
            <input
              type="file"
              accept="image/*"
              @change="onFileChange"
              v-if="fileButtonReady"
              :disabled="!isImageUrlEmpty"
            />
            <input
              type="button"
              value="Reset"
              @click="resetButton"
              v-if="resetButtonReady"
            />
          </div>
        </form>
      </section>
      <div class="preview-card">
        <header class="image-preview-title">Image preview</header>
        <div class="image-container">
          <img
            :src="image"
            :alt="alt"
            :title="title"
            @error="checkIfImage"
            ref="imageRef"
          />
        </div>
      </div>
    </div>
    <!-- <base-buttons
      @click-submit="insertImage"
      @click-cancel="$emit('close-dialog')"
      :isConfirmDisabled="isImageNull"
      :isDisabledClass="isImageNull"
      buttonText="INSERT"
    >
    </base-buttons> -->
  </base-dialog>
</template>

<script>
export default {
  props: ["show"],
  emits: ["close-dialog"],
  data() {
    return {
      imageUrl: "",
      altText: "",
      imageTitle: "",
      file: false,
      image: null,
      alt: null,
      title: null,
      showError: true,
      validUrl: true,
      insertedImage: null,
    };
  },
  methods: {
    onFileChange(event) {
      this.image = URL.createObjectURL(event.target.files[0]);
      this.file = true;
    },
    resetButton() {
      this.image = null;
      this.alt = null;
      this.title = null;
      this.file = false;
    },
    resetInput() {
      this.imageUrl = "";
      this.altText = "";
      this.imageTitle = "";
      this.file = false;
      this.image = null;
    },
    checkIfImage() {
      this.image = null;
    },
    applyChanges() {
      this.validateUrl();
      if (this.imageUrl.length > 0 && this.validUrl) {
        console.log("valid url");
        this.image = this.imageUrl;
      }
      this.alt = this.altText;
      this.title = this.imageTitle;
    },
    validateUrl() {
      try {
        new URL(this.imageUrl);
        this.validUrl = true;
      } catch (error) {
        this.validUrl = false;
      }
    },

    insertImage() {
      const editor = document.getElementById("editorId");
      const imgElement = document.createElement("img");
      imgElement.src = this.image;
      imgElement.alt = this.altText;
      imgElement.title = this.imageTitle;
      const selection = window.getSelection();
      editor.focus(selection);
      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(imgElement);
      range.setStartAfter(imgElement);
      range.collapse(true);

      // const imgTag = `<img src=${this.image} alt=${this.altText} title=${this.imageTitle}/>`;
      // editor.innerHTML += imgTag;

      this.$emit("close-dialog");
    },
  },
  computed: {
    altCounter() {
      return this.altText.length + "/" + "60";
    },
    titleCounter() {
      return this.imageTitle.length + "/" + "60";
    },
    isImageNull() {
      return this.image === null;
    },
    fileButtonReady() {
      return !this.file;
    },
    resetButtonReady() {
      return this.image !== null && this.file;
    },
    isImageUrlEmpty() {
      return this.imageUrl.length === 0;
    },
  },
};
</script>

<style scoped>
.main-content {
  display: flex;
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

.counter-label {
  display: flex;
  justify-content: space-between;
}

.form-control:nth-child(4) {
  display: flex;
  justify-content: center;
}

label,
span {
  color: #555353;
  margin-bottom: 6px;
  font-size: 11px;
}

input[type="text"],
input[type="url"] {
  width: 100%;
  padding: 8px 10px;
  font-size: 13px;
  border-bottom: 1px solid #ccc;
  background-color: #f5f7f7;
}

.form-section {
  flex-basis: 55%;
  margin-right: 30px;
}

h2:nth-child(1) {
  margin: 0 0 0 20px;
}

h3 {
  text-align: center;
  margin-top: 20px;
}

.preview-card {
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  border: 1px solid;
  background-color: #f5f7f7;
  flex-basis: 45%;
  box-shadow: 1px 2px 5px #777;
}

.image-preview-title {
  text-align: center;
  border-bottom: solid 2px;
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  padding: 5px;
  background-color: #fff;
}

.image-container {
  height: 350px;
  margin: 20px;
}

img {
  height: 100%;
  max-width: 100%;
}

.disable {
  background-color: red;
}
</style>
