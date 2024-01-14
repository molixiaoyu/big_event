import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/reg')
  },
  {
    path: '/',
    redirect: '/reg' // 将根目录重定向到 /reg
  },
  {
    path: '/home',
    name:'home',
    component:() => import('@/views/home')
  }
]

const router = new VueRouter({
  routes
})

export default router
