// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store/store'
import axios from 'axios'
Vue.prototype.$ajax= axios
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
Vue.use(Vuex)

// var state = {
//   isLogin:0,
// }
// const mutations = {
//   changeLogin(state,data){
//       state.isLogin = data;
//   }
// };

//这地方有问题，无法修改vuex中的数据
// router.beforeEach((to,from,next) => {
//   if(to.matched.some( m => m.meta.auth)){
//       // 对路由进行验证
//       if(state.isLogin=='100') { // 已经登陆
//           next()     // 正常跳转到你设置好的页面
//       }else{
//           // 未登录则跳转到登陆界面，query:{ Rurl: to.fullPath}表示把当前路由信息传递过去方便登录后跳转回来；
//           alert('请先登录')
// 　　 　　　　next({path:'/',})
// 　　　　　} 
// 　　　　}else{ 
// 　　　　　　next()
// 　　} 
// })
router.beforeEach((to,from,next) => {
  if(to.matched.some( m => m.meta.auth)){
    // console.log(store.getters.authorizd)
      // 对路由进行验证
      if(store.getters.authorizd) { // 已经登陆
          next()
      }else{
          // 未登录,跳转到登陆页面，并且带上 将要去的地址，方便登陆后跳转。
          next({path:'/login',query:{ referrer: to.fullPath} })  
      }
  }else{
      next()
  }
})

Vue.use(ElementUI);
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
