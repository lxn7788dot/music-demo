/**
 * 路由相关模块
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
import Home from '@/views/Home'
import Search from '@/views/Search'
import Play from '@/views/Play'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/layout'
  },
  // 二级路由菜单
  {
    path: '/layout',
    component: Layout,
    redirect: '/layout/home',
    children: [
      {
        path: 'home',
        component: Home,
        // 保存路由对象额外信息
        meta: {
          title: '首页'
        }
      },
      {
        path: 'search',
        component: Search,
        meta: {
          title: '搜索'
        }
      },
      {
        path: 'search',
        component: Search,
        meta: {
          title: '搜索'
        }
      }
    ]
  },
  {
    path: '/play',
    component: Play
  }
]

const router = new VueRouter({
  routes
})

export default router