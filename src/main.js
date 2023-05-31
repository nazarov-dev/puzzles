import Vue from 'vue';
// import Store from './store'; // Vuex
// import Axios from 'axios';
// import VueAxios from 'vue-axios';
import VueKonva from 'vue-konva';
// import PortalVue from 'portal-vue';

import App from './views/App.vue';
// import Router from './router';

Vue.config.productionTip = false;

// Vue.use( VueAxios, Axios );
Vue.use( VueKonva );
// Vue.use( PortalVue );

new Vue({
    render: h => h(App),
    // router: Router,
    // store: Store
}).$mount('#app');