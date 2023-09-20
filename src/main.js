import { createApp } from "vue";
import BaseButtons from "./components/ui/BaseButtons.vue";
import BaseDialog from "./components/ui/BaseDialog.vue";
import BaseTypingIndicator from "./components/ui/BaseTypingIndicator.vue";
import App from "./App.vue";

const app = createApp(App);

app.component("base-buttons", BaseButtons);
app.component("base-dialog", BaseDialog);
app.component("base-typing-indicator", BaseTypingIndicator);

app.mount("#app");
