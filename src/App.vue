<template>
  <div id="app">
    <img src="./assets/logo.png">
    <button @click="clickButton">asdf</button>
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'App',
  sockets:{
    connect: function(){
      console.log('socket connected')
    },
    got_it: function(val){
      console.log("got it: " + JSON.stringify(val));
    }
  },
  methods: {
    clickButton: () => {
      (new Vue()).$socket.emit('emit_method', {asdf: 2});
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
