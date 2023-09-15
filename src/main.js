import { createApp } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faBold } from "@fortawesome/free-solid-svg-icons";
import { faItalic } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import ImageDialog from "./components/ui/ImageDialog.vue";
import BaseButtons from "./components/ui/BaseButtons.vue";
import App from "./App.vue";

const app = createApp(App);

library.add(faBold, faItalic, faImage, faBan);

app.component("font-awesome-icon", FontAwesomeIcon);
app.component("image-dialog", ImageDialog);
app.component("base-buttons", BaseButtons);

app.mount("#app");
