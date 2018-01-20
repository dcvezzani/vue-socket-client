<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div id="views">
      <router-link :to="{path: '/'}">responsive view</router-link> | 
      <router-link :to="{path: '/great'}">8 to Great</router-link> | 
      <router-link :to="{path: '/hello'}">Hello</router-link>
    </div>

    <calendar v-for="(month, index) in months" :key="'month-' + index" :month="month"></calendar>
    
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
      months: [
        {name: 'Jan 2018', days: [ [31], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31], [1, 2, 3] ]}, 
        {name: 'Feb 2018', days: [ [28, 29, 30, 31], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28], [1, 2, 3] ]}, 
      ]
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
