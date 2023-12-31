<template>
  <base-dialog
    :show="show"
    title="Upload image"
    @click-submit="uploadImage"
    @click-cancel="$emit('close-dialog')"
    :isSubmitDisabled="isImageNull"
    :isDisabledClass="isImageNull"
    :buttonText="'insert'"
  >
    <div class="main-content">
      <section class="form-section">
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
          <input
            type="file"
            accept="image/*"
            @change="onFileChange"
            v-if="fileButtonReady"
          />
          <input
            type="button"
            value="Reset"
            @click="resetInput"
            v-if="resetButtonReady"
          />
        </div>
      </section>
      <div class="preview-card">
        <header class="image-preview-title">Image preview</header>
        <div class="image-container">
          <img :src="image" :alt="this.altText" :title="this.imageTitle" />
        </div>
      </div>
    </div>
  </base-dialog>
</template>

<script>
export default {
  props: ["show", "getSelection"],
  emits: ["close-dialog"],
  data() {
    return {
      altText: "",
      imageTitle: "",
      file: false,
      image: null,
    };
  },
  methods: {
    async onFileChange(event) {
      const imageFile = event.target.files[0];
      if (imageFile) {
        const base64String = await convertFileToBase64(imageFile);
        console.log(base64String);
        this.image = base64String;
      }
      function convertFileToBase64(imageFile) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();

          reader.onload = () => {
            const fileType = imageFile.type.split("/")[1];
            const base64String = reader.result.split(",")[1];
            resolve(`data:image/${fileType};base64,${base64String}`);
          };

          reader.onerror = (error) => {
            reject(error);
          };

          reader.readAsDataURL(imageFile);
        });
      }
      this.file = true;
    },
    resetInput() {
      this.altText = "";
      this.imageTitle = "";
      this.file = false;
      this.image = null;
    },
    uploadImage() {
      const imgElement = document.createElement("img");
      imgElement.src = this.image;
      imgElement.alt = this.altText;
      imgElement.title = this.imageTitle;
      if (this.getSelection) {
        this.getSelection.collapse(false);
        this.getSelection.insertNode(imgElement);
        this.getSelection.setStartAfter(imgElement);
        this.getSelection.collapse(true);
      } else {
        const editor = document.getElementById("editorId");
        editor.appendChild(imgElement);
      }
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

input[type="text"] {
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

.preview-card {
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  border: 1px solid;
  background-color: #f5f7f7;
  flex-basis: 45%;
  box-shadow: 1px 2px 5px #777;
  height: fit-content;
  min-height: 40vh;
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
  height: 100%;
  margin: 20px;
}

img {
  height: fit-content;
  max-width: 100%;
  min-width: 100%;
}

.disable {
  background-color: red;
}
</style>
