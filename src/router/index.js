import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/reg' // 将根目录重定向到 /reg
  },
  {
    path: '/reg',
    component: () => import('@/views/reg')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/components/home'),
    redirect:'/echats',
    children: [
      {
        path:'/echats',
        component:() => import('@/views/echarts')
      },
      {
        path:'/category',
        component:() => import('@/views/article/category')
      },
      {
        path:'/list',
        component:() => import('@/views/article/list')
      },
      {
        path:'/publish',
        component:() => import('@/views/article/publish')
      },
      {
        path:'/information',
        component:() => import('@/views/user/information')
      },
      {
        path:'/userImage',
        component:() => import('@/views/user/userImage')
      },
      {
        path:'/userPassword',
        component:() => import('@/views/user/userPassword')
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

// 解决push 和路由守卫跳转冲突报错的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

router.beforeEach((to, from, next) => {
  // 如果用户登陆了
  if (localStorage.getItem('username')) {
    // 判断要访问的页面是否是登录页或者包含登录行为的页面，如果是则直接跳转到首页，否则允许继续访问
    if (to.path === '/reg' || to.path === '/') {
      next('/home');
    } else {
      next();
    }
  } else {
    // 用户未登录，强制跳转回登录页
    if (to.path !== '/reg') {
      next('/reg');
    } else {
      next();
    }
  }
});



export default router
