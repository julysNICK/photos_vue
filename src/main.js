import { createApp } from 'vue'
import App from './App.vue'
import PhotoForm from './components/PhotoFormPage.vue'
import HomePage from './components/HomePage.vue'
import SearchPage from './components/SearchPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/add-photo-form', component: PhotoForm },
  { path: '/edit-photo-form/:id', component: PhotoForm },
  { path: '/search', component: SearchPage },
  { path: '/', component: HomePage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)
app.use(router)
app.mount('#app')
