import { createApp } from 'vue'
import App from './App.vue'
import ErrorService from './services/error'
import store from './store'
import router from './router'
import './assets/stylesheet/index.css'

const app = createApp(App).use(router).use(store);
app.config.errorHandler = (error) => ErrorService.onError(error);
app.mount('#app');
