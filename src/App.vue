<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div id="views">
      <router-link :to="{path: '/'}">responsive view</router-link> | 
      <router-link :to="{path: '/great'}">8 to Great</router-link> | 
      <router-link :to="{path: '/hello'}">Hello</router-link>
    </div>

    <calendar></calendar>
    <calendar></calendar>
    
    <router-view/>
  </div>
</template>

<script>
import Calendar from '@/components/Calendar'

export default {
  name: 'App',
  components: {
    'calendar': Calendar
  },
  data () {
    return {
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

#views {
  margin-bottom: 2em; 
}
</style>
