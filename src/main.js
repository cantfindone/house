// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import App from './App'
import router from './router'
//import axios from 'axios'
import './meta'
import './x'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.config.productionTip = false

router.beforeEach(function (to,from,next) {  
  if (!['/','/dl','/tc'].includes(to.path) && !window.u && !sessionStorage.getItem('u')) {
      // if route requires auth and user isn't authenticated
      next('/')
  } else {
      next()
  }
})


// http response 拦截器

window.x.interceptors.response.use(
  response => {
      return response;
  },
  error => {
      if (error.response) {
          switch (error.response.status) {
              case 401:  
                  // 返回 401 清除token信息并跳转到登录页面
                  sessionStorage.clear()
                  router.replace({
                      path: '/dl',
                      query: {redirect: router.currentRoute.fullPath}
                  })
          }
      }
      return Promise.reject(error)   // 返回接口返回的错误信息
  });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
