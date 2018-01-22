import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ResponsiveView from '@/components/ResponsiveView'
import EightGreat from '@/components/EightGreat'
import Take2 from '@/components/Take2'
import Simple from '@/components/Simple'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/take-2',
      name: 'Take2',
      component: Take2
    }, 
    {
      path: '/simple',
      name: 'Simple',
      component: Simple
    }, 
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
