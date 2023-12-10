import { createApp } from "vue";
import App from "./App.vue";
import apolloClient from "./apollo-client";
import { ApolloClients } from "@vue/apollo-composable";
import router from "./route/indexx";
import { createPinia } from "pinia";

const app = createApp(App);
app.provide(ApolloClients, {
  default: apolloClient,
});

app.use(createPinia()).use(router).mount("#app");
