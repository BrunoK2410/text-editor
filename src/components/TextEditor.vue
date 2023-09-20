<template>
  <div>
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
          <svg
            focusable="false"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            aria-label="Bold (Ctrl+B)"
            aria-hidden="true"
            width="20"
            height="20"
            viewBox="0 0 32 32"
            role="img"
            class="bx--btn__icon"
          >
            <path
              d="M18.25,25H9V7h8.5a5.25,5.25,0,0,1,4,8.65A5.25,5.25,0,0,1,18.25,25ZM12,22h6.23a2.25,2.25,0,1,0,0-4.5H12Zm0-7.5h5.5a2.25,2.25,0,1,0,0-4.5H12Z"
            ></path>
          </svg>
        </button>
        <button
          data-title="Italic (Ctrl+I)"
          @click="italic"
          @keydown.ctrl.i="italic"
          :class="{ active: isItalic }"
        >
          <svg
            focusable="false"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            aria-label="Italic (Ctrl+I)"
            aria-hidden="true"
            width="20"
            height="20"
            viewBox="0 0 32 32"
            role="img"
            class="bx--btn__icon"
          >
            <path
              d="M25 9L25 7 12 7 12 9 17.14 9 12.77 23 7 23 7 25 20 25 20 23 14.86 23 19.23 9 25 9z"
            ></path>
          </svg>
        </button>
        <button data-title="Insert link">
          <svg
            focusable="false"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            aria-label="Link"
            aria-hidden="true"
            width="20"
            height="20"
            viewBox="0 0 32 32"
            role="img"
            class="bx--btn__icon"
          >
            <path
              d="M29.25,6.76a6,6,0,0,0-8.5,0l1.42,1.42a4,4,0,1,1,5.67,5.67l-8,8a4,4,0,1,1-5.67-5.66l1.41-1.42-1.41-1.42-1.42,1.42a6,6,0,0,0,0,8.5A6,6,0,0,0,17,25a6,6,0,0,0,4.27-1.76l8-8A6,6,0,0,0,29.25,6.76Z"
            ></path>
            <path
              d="M4.19,24.82a4,4,0,0,1,0-5.67l8-8a4,4,0,0,1,5.67,0A3.94,3.94,0,0,1,19,14a4,4,0,0,1-1.17,2.85L15.71,19l1.42,1.42,2.12-2.12a6,6,0,0,0-8.51-8.51l-8,8a6,6,0,0,0,0,8.51A6,6,0,0,0,7,28a6.07,6.07,0,0,0,4.28-1.76L9.86,24.82A4,4,0,0,1,4.19,24.82Z"
            ></path>
          </svg>
        </button>
        <button
          data-title="Insert Image"
          @click="openImageDialog"
          :class="{ loading: isLoading }"
          :disabled="showImageDialog"
        >
          <svg
            focusable="false"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            aria-label="Image response type"
            aria-hidden="true"
            width="20"
            height="20"
            viewBox="0 0 32 32"
            role="img"
            class="bx--btn__icon"
          >
            <path
              d="M19,14a3,3,0,1,0-3-3A3,3,0,0,0,19,14Zm0-4a1,1,0,1,1-1,1A1,1,0,0,1,19,10Z"
            ></path>
            <path
              d="M26,4H6A2,2,0,0,0,4,6V26a2,2,0,0,0,2,2H26a2,2,0,0,0,2-2V6A2,2,0,0,0,26,4Zm0,22H6V20l5-5,5.59,5.59a2,2,0,0,0,2.82,0L21,19l5,5Zm0-4.83-3.59-3.59a2,2,0,0,0-2.82,0L18,19.17l-5.59-5.59a2,2,0,0,0-2.82,0L6,17.17V6H26Z"
            ></path>
          </svg>
        </button>
        <button data-title="Timer" @click="openTimerDialog">
          <svg
            focusable="false"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            aria-label="Pause response type"
            aria-hidden="true"
            width="20"
            height="20"
            viewBox="0 0 16 16"
            role="img"
            class="bx--btn__icon"
          >
            <path
              d="M6 4v8H4V4H6M6 3H4C3.4 3 3 3.4 3 4v8c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V4C7 3.4 6.6 3 6 3zM12 4v8h-2V4H12M12 3h-2C9.4 3 9 3.4 9 4v8c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V4C13 3.4 12.6 3 12 3z"
            ></path>
          </svg>
        </button>
      </div>
      <div class="container">
        <div
          class="textarea"
          contenteditable="true"
          ref="editor"
          id="editorId"
          @input="isActive"
        ></div>
        <div class="applied-change" v-if="isTimerSet">
          <div class="content">
            <div class="pause">
              <svg
                focusable="false"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                aria-label="Pause response type"
                aria-hidden="true"
                width="18"
                height="18"
                viewBox="0 0 16 16"
                role="img"
                class="bx--btn__icon"
              >
                <path
                  d="M6 4v8H4V4H6M6 3H4C3.4 3 3 3.4 3 4v8c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V4C7 3.4 6.6 3 6 3zM12 4v8h-2V4H12M12 3h-2C9.4 3 9 3.4 9 4v8c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V4C13 3.4 12.6 3 12 3z"
                ></path>
              </svg>
              <p>Pause ({{ receivedDuration }}s)</p>
            </div>
            <div class="timer-buttons">
              <button @click="openTimerDialog">
                <svg
                  focusable="false"
                  preserveAspectRatio="xMidYMid meet"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#5d8ddf"
                  aria-label="Edit"
                  aria-hidden="true"
                  role="img"
                  class="bx--btn__icon"
                >
                  <path
                    d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                  ></path>
                  <path
                    d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                  ></path>
                </svg>
              </button>
              <button @click="deleteTimer">
                <svg
                  focusable="false"
                  preserveAspectRatio="xMidYMid meet"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#5d8ddf"
                  aria-label="Delete"
                  aria-hidden="true"
                  width="18"
                  height="18"
                  viewBox="0 0 32 32"
                  role="img"
                  class="bx--btn__icon"
                >
                  <path d="M12 12H14V24H12zM18 12H20V24H18z"></path>
                  <path
                    d="M4 6V8H6V28a2 2 0 002 2H24a2 2 0 002-2V8h2V6zM8 28V8H24V28zM12 2H20V4H12z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <image-dialog
      :show="showImageDialog"
      @close-dialog="closeImageDialog"
      ref="imageDialog"
    ></image-dialog>
    <timer-dialog
      :show="showTimerDialog"
      @close-dialog="closeTimerDialog"
      @get-duration="handleDuration"
      ref="timerDialog"
    ></timer-dialog>
  </div>
  <button @click="send">send</button>
  <div id="output"></div>
</template>

<script>
import ImageDialog from "./ImageDialog.vue";
import TimerDialog from "./TimerDialog.vue";
export default {
  components: {
    ImageDialog,
    TimerDialog,
  },
  data() {
    return {
      isBold: false,
      isItalic: false,
      showImageDialog: false,
      showTimerDialog: false,
      isLoading: false,
      isTimerSet: false,
      receivedDuration: 0,
      isMessageSent: false,
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
      if (event.target.innerText.length > 0) {
        this.availableButton = true;
      } else {
        this.availableButton = false;
      }
    },
    openImageDialog() {
      this.$refs.editor.focus();
      this.isLoading = true;
      setTimeout(() => {
        this.showImageDialog = true;
        this.isLoading = false;
      }, 500);
    },
    openTimerDialog() {
      this.showTimerDialog = true;
      const buttons = document.querySelectorAll(".buttons-wrapper button");
      buttons.forEach((button) => {
        if (button.classList.contains("active")) {
          button.classList.remove("active");
        }
      });
    },
    closeImageDialog() {
      this.$refs.imageDialog.resetInput();
      this.showImageDialog = false;
    },
    closeTimerDialog() {
      this.showTimerDialog = false;
      if (!this.isTimerSet) {
        this.$refs.timerDialog.resetTimer();
      }
    },
    send() {
      const editor = document.getElementById("editorId");
      const output = document.getElementById("output");
      this.isMessageSent = true;
      const message = editor.innerHTML;
      if (this.isTimerSet) {
        this.deleteTimer();
        setTimeout(() => {
          output.innerHTML += message;
        }, this.receivedDuration * 1000);
      } else {
        output.innerHTML += editor.innerHTML;
      }
      editor.innerHTML = "";
    },
    handleDuration(data) {
      this.receivedDuration = data;
      this.isTimerSet = true;
      const buttons = document.querySelectorAll(".buttons-wrapper button");
      buttons.forEach((button) => {
        button.disabled = true;
      });
    },
    deleteTimer() {
      this.isTimerSet = false;
      if (!this.isMessageSent) {
        this.$refs.timerDialog.resetTimer();
      }
      const buttons = document.querySelectorAll(".buttons-wrapper button");
      buttons.forEach((button) => {
        button.disabled = false;
      });
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

.buttons-wrapper > button {
  border: none;
  background-color: unset;
  cursor: pointer;
  padding: 7px;
  position: relative;
  display: inline-block;
}

.buttons-wrapper > button:disabled {
  cursor: unset;
}

.buttons-wrapper > button:hover {
  background-color: #c0c2c2;
  transition: all 0.5s;
}

.buttons-wrapper > button:hover:before {
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

.buttons-wrapper > button:nth-child(5):hover:before {
  margin-left: -30px;
}
.buttons-wrapper > button:nth-child(3):hover:before {
  margin-left: -40px;
}
.buttons-wrapper > button:hover:after {
  content: " ";
  position: absolute;
  top: 0%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #333 transparent transparent transparent;
}

.buttons-wrapper > button:nth-child(3),
.buttons-wrapper > button:nth-child(4) {
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
  cursor: wait !important;
}
.container {
  position: relative;
}
.textarea {
  resize: vertical;
  overflow-y: auto;
  width: 700px;
  min-height: 120px;
  max-height: 550px;
  background-color: #f5f7f7;
  outline-color: #326ecf;
  border: dotted 2px;
  padding: 10px;
  display: inline-block;
  vertical-align: middle;
}

.applied-change {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 98;
  background-color: #f5f7f7;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  display: flex;
  width: 90%;
  background-color: white;
  padding: 10px;
  justify-content: space-between;
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
</style>
