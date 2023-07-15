import { createApp } from 'vue';
import App from './App.vue';
import { store } from './store'
import VueKonva from 'vue-konva';

const app = createApp(App);

app.use(store);
app.use(VueKonva);

app.mount('#app');
