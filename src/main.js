import { createApp } from 'vue'
import App from './App.vue'

console.log("API URL uit .env:", import.meta.env.VITE_API_URL);

createApp(App).mount('#app')
