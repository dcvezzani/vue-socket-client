// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';
import App from './App'
import router from './router'

Vue.config.productionTip = false

export const SocketInstance = socketio('http://127.0.0.1:3000');
Vue.use(VueSocketIO, SocketInstance)

/* eslint-disable no-new */
var app = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
