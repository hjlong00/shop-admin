import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('views/login/Login')
const Home = () => import('views/home/Home')

Vue.use(VueRouter)

const routes = [
  // 默认登录
  { path: '', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/home', component: Home }
]

const router = new VueRouter({
  routes
})

/**
 *  | 挂载路由守卫
 *  | to   将要访问的路径
 *  | from 代表从哪个路径跳转而来
 *  | next 是一个函数，表示放行
 *  |   - next() 放行
 *  |   - next('/login') 强制跳转到指定路径
 */

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()

  // | 获取token 判断是否已是登录状态
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})
export default router
