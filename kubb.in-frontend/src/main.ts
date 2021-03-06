import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import VeeValidate from "vee-validate";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  faBars,
  faEye,
  faEyeSlash
} from "@fortawesome/free-solid-svg-icons";

library.add(faHome,faEye,faEyeSlash, faUser, faUserPlus, faSignInAlt, faSignOutAlt, faBars);

Vue.config.productionTip = false;
Vue.use(VeeValidate);
Vue.component("font-awesome-icon", FontAwesomeIcon);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
