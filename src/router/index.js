import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import Index from '@/components/index'
import error404 from '../components/errorPage/404.vue'
import HomeNavtion from '../components/HomeModule/HomeNavtion.vue'

Vue.use(Router)

export default new Router({
  routes: [
      {
        path:'/404',
        name:'errror5',
        component:error404
      },
      {
        path:'*',
        redirect:'/404'
      },
      {
        path: '/',
        name: 'HomePage',
        component: HomePage,
        children:[{
          path:'/haha',
          name:'HomeNavtion',
          component:HomeNavtion
        }]
      },
      {
        path:'/index',
        name:'Indexs',
        component:Index
      }
  ]
})
