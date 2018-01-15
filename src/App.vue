<template>
  <div id="app">
    <img src="./assets/logo.png">
    <button @click="clickButton">asdf</button>
    <button @click="newUser">New User</button>
    <button @click="updateUser">Update User</button>
    <button @click="deleteUser">Delete User</button>
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
    },
    user_created: function(val){
      console.log("user created: " + JSON.stringify(val));
    },
    user_updated: function(val){
      console.log("user updated: " + JSON.stringify(val));
    },
    user_destroyed: function(val){
      console.log("user destroyed: " + JSON.stringify(val));
    }
  },
  methods: {
    clickButton: () => {
      (new Vue()).$socket.emit('emit_method', {asdf: 2});
    }, 
    newUser: () => {
      (new Vue()).$socket.emit('create_user', {name: "dcvezzani", notes: "David Vezzani", freeDay: 0, freeMeal: false, sickDay: 0});
    }, 
    updateUser: () => {
      (new Vue()).$socket.emit('update_user', {id: 3, name: "dcvezzani", notes: "David Vezzani", freeDay: 0, freeMeal: false, sickDay: 0});
    }, 
    deleteUser: () => {
      (new Vue()).$socket.emit('destroy_user', {id: 3});
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
