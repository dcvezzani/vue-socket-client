import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ResponsiveView from '@/components/ResponsiveView'
import EightGreat from '@/components/EightGreat'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ResponsiveView',
      component: ResponsiveView
    }, 
    {
      path: '/great',
      name: 'EightGreat',
      component: EightGreat
    }, 
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
