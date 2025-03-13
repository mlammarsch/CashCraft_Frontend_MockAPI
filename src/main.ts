import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './index.css';
import 'flyonui/flyonui';
import App from './App.vue';
import router from './router';
import { Icon } from '@iconify/vue';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.component('Icon', Icon);
app.mount('#app');
