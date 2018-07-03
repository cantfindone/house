var axios = require("axios");

axios.interceptors.request.use(
    config => {
        if (localStorage.getItem('tk')){  // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.authorization = localStorage.getItem('tk')
            console.log(config.header)
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器

// axios.interceptors.response.use(
//     response => {
//         return response;
//     },
//     error => {
//         if (error.response) {
//             switch (error.response.status) {
//                 case 401:  
//                     // 返回 401 清除token信息并跳转到登录页面
//                     localStorage.clear()
//                     router.replace({
//                         path: '/dl',
//                         query: {redirect: router.currentRoute.fullPath}
//                     })
//             }
//         }
//         return Promise.reject(error)   // 返回接口返回的错误信息
//     });

window.x=axios
export default window.x