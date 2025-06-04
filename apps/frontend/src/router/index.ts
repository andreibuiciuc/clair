import Home from '@/views/Home.vue'
import VolumeViewer from '@/features/volume-viewer/index.vue';
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => Home,
    },
    {
      path: '/volume-viewer',
      name: 'volume-viewer',
      component: () => VolumeViewer
    }
  ],
})

export default router
