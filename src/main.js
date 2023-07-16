import { createApp } from 'vue';
import App from './App.vue';
import { store } from './store'
import Konva from 'konva';
import VueKonva from 'vue-konva';

// by default Konva prevent some events when node is dragging
// it improve the performance and work well for 95% of cases
// we need to enable all events on Konva, even when we are dragging a node
// so it triggers touchmove correctly
Konva.hitOnDragEnabled = true;

const app = createApp(App);

app.use(store);
app.use(VueKonva);

app.mount('#app');
