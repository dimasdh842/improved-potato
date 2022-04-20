import HomeComponent from '@/views/HomeComponent'
import { createWebHistory,createRouter } from 'vue-router'
// import store from '@/store';



const routes = [
  
    {
      path: '/',
      name: '/',
      component: HomeComponent,
    },
    {
      path: '/home',
      name: 'Home',
      component: HomeComponent,
    },
  ]
  

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
})

export default router;