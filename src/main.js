// import App from './App.vue'
// import './assets/styles/global.scss'

import Home from './pages/Home/Home.vue'
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import 'bootstrap/scss/bootstrap.scss';
'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(Home);
app.use(pinia);
app.mount('#app');
