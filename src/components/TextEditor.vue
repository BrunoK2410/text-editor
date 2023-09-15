<template>
  <div>
    <image-dialog :show="showDialog" @close-dialog="closeDialog"></image-dialog>
    <div class="wrapper">
      <div class="buttons-wrapper">
        <button
          data-title="Bold (Ctrl+B)"
          @click="bold"
          @keydown.ctrl.b="bold"
          :class="{
            active: isBold,
          }"
        >
          <font-awesome-icon icon="fa-solid fa-bold" />
        </button>
        <button
          data-title="Italic (Ctrl+I)"
          @click="italic"
          @keydown.ctrl.i="italic"
          :class="{ active: isItalic }"
        >
          <font-awesome-icon icon="fa-solid fa-italic" />
        </button>
        <button
          data-title="Insert Image"
          @click="openDialog"
          :class="{ loading: isLoading }"
          :disabled="showDialog"
        >
          <font-awesome-icon icon="fa-solid fa-image" />
        </button>
      </div>
      <div
        class="textarea"
        contenteditable="true"
        ref="editor"
        @input="isActive"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isBold: false,
      isItalic: false,
      showDialog: false,
      isLoading: false,
    };
  },
  methods: {
    bold() {
      // this.isBold = !this.isBold;
      this.$refs.editor.focus();
      if (!this.isBold) {
        document.execCommand("bold");
        this.isBold = true;
      } else {
        document.execCommand("bold");
        this.isBold = false;
      }
    },
    italic() {
      this.$refs.editor.focus();
      if (!this.isItalic) {
        document.execCommand("italic");
        this.isItalic = true;
      } else {
        document.execCommand("italic");
        this.isItalic = false;
      }
    },
    isActive() {
      const editor = this.$refs.editor;
      setInterval(() => {
        if (document.activeElement === editor) {
          if (document.queryCommandState("bold")) {
            this.isBold = true;
          } else {
            this.isBold = false;
          }
          if (document.queryCommandState("italic")) {
            this.isItalic = true;
          } else {
            this.isItalic = false;
          }
        }
      }, 250);
    },
    isEmpty(event) {
      console.log(event.target.innerText);
      if (event.target.innerText.length > 0) {
        this.availableButton = true;
      } else {
        this.availableButton = false;
      }
    },
    openDialog() {
      this.$refs.editor.focus();
      this.isLoading = true;
      setTimeout(() => {
        this.showDialog = true;
        this.isLoading = false;
      }, 500);
    },
    closeDialog() {
      this.showDialog = false;
    },
    expandEditor() {
      const editor = this.$refs.editor;
      editor.style.height = "auto";
      editor.style.height = editor.scrollHeight + "px";
    },
  },
  mounted() {
    this.isActive();
  },
};
</script>

<style scoped>
.wrapper {
  margin: 50px;
  width: fit-content;
}

.buttons-wrapper {
  background-color: #f5f7f7;
}

button {
  border: none;
  background-color: unset;
  cursor: pointer;
  padding: 10px;
  position: relative;
  display: inline-block;
}

button:hover {
  background-color: #c0c2c2;
  transition: all 0.5s;
}

button:hover:before {
  content: attr(data-title);
  white-space: nowrap;
  position: absolute;
  border-radius: 5px;
  bottom: 100%;
  left: 50%;
  margin-left: -50px;
  color: #fff;
  padding: 5px 15px;
  background: #333;
  background: rgba(0, 0, 0, 0.8);
}

button:hover:after {
  content: " ";
  position: absolute;
  top: 0%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #333 transparent transparent transparent;
}

button:nth-child(2) {
  border-right: solid rgb(230, 225, 225) 1px;
}

.active {
  background-color: #c0c2c2;
  color: #1354c3;
  box-shadow: inset 1px 2px 5px #777;
}

.disabled-button {
  cursor: not-allowed;
}

.loading {
  cursor: wait;
}

.textarea {
  resize: both;
  overflow-y: auto;
  width: 500px;
  height: 120px;
  background-color: #f5f7f7;
  outline-color: #326ecf;
  border: dotted 2px;
  padding: 10px;
}
</style>
