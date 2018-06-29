import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import table from '../pages/table.vue'
import zy from '../pages/zy.vue'
import dl from '../pages/dl.vue'
import ys from '../pages/ys.vue'
import hm from '../pages/hm.vue'
import reg_admin from '../pages/reg_admin.vue'
import admin from '../pages/admin.vue'
import reg_ys from '../pages/reg_ys.vue'

Vue.use(Router)

export default new Router({
  routes: [   
    {
        path: '/',
        name: '首页',
        component: hm
      },
    {
        path: '/dl',
        name: '登录',
        component: dl
      },
    {
        path: '/tc',
        name: '退出',
        component: hm
      },
    {
        path: '/zy',
        name: '中药',
        component: zy
      },
    {
        path: '/reg_admin',
        name: '管理员注册',
        component: reg_admin
      },
    {
        path: '/list_admin',
        name: '管理员',
        component: admin
      },
    {
        path: '/reg_ys',
        name: '医生注册',
        component: reg_ys
      },
    {
      path: '/ys',
      name: '医生',
      component: ys
    }
  ]
})
