import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/tarefas',
    name: 'tarefas',
    component: () => import('../views/TarefasGridView.vue')
  },
  {
    path: '/cadastro',
    name: 'cadastro',
    component: () => import('../views/TarefaCadastroView.vue')
  }  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
