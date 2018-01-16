<template>
  <div id="app">
    <div style="display: none">
      <img src="./assets/logo.png">
      <router-view/>

      <div>
        <button @click="clickButton">asdf</button>
      </div>

      <div>
        <button @click="getUser(4)">Fetch User</button>
        <button @click="newUser">New User</button>
        <button @click="updateUser">Update User</button>
        <button @click="deleteUser">Delete User</button>
      </div>

      <div>
        <button @click="newWeek">New Week</button>
        <button @click="updateWeek">Update Week</button>
        <button @click="deleteWeek">Delete Week</button>
      </div>
      
      <div>
        <button @click="newDay">New Day</button>
        <button @click="updateDay">Update Day</button>
        <button @click="deleteDay">Delete Day</button>
      </div>
    </div>

    <div class="items">
      <div class="item">{{ day.id }}</div>

      <div class="item">Positive food: 
        <input v-model="day.positiveFood" id="positiveFood" type="text">
        <div><textarea v-model="day.positiveFoodData" id="positiveFoodData" name="" cols="30" rows="10"></textarea></div>
      </div>

      <div class="item">Negative food: 
        <input id="negativeFood" type="text">
        <div><textarea id="negativeFoodData" name="" cols="30" rows="10"></textarea></div>
      </div>

      <div class="item">Fruits &amp; vegetables:
        <input id="fruitsVegetables" type="text">
      </div>

      <div class="item">Water: <input id="water" type="text">
        <div> Cups: <input id="waterCupsCnt" type="text"></div>
      </div>

      <div class="item">After 8:
        <input id="after8" type="checkbox">
      </div>

      <div class="item">Exercise:
        <input id="exercise" type="text">
        <div><textarea id="exerciseData" name="" cols="30" rows="10"></textarea></div>
      </div>

      <div class="item">Daily greatness:
        <input id="dailyGreatness" type="checkbox">
        <div><textarea id="dailyGreatnessData" name="" cols="30" rows="10"></textarea></div>
      </div>

      <div class="item">Personal prayer:
        <input id="personalPrayer" type="checkbox">
        <div><textarea id="personalPrayerData" name="" cols="30" rows="10"></textarea></div>
      </div>

      <div class="item">Scripture study:
        <input id="scriptureStudy" type="checkbox">
        <div><textarea id="scriptureStudyData" name="" cols="30" rows="10"></textarea></div>
      </div>
    </div>


  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'App',
  data() {
    return {
      day: {id: 4, 
        positiveFood: 0, 
        positiveFoodData: JSON.stringify({asdf: 2, qwer: 4})
      }
    }
  }, 
  sockets:{
    connect: function(){
      console.log('socket connected')
    },
    got_it: function(val){
      console.log("got it: " + JSON.stringify(val));
    },

    // users

    user_fetched: function(val){
      console.log("user fetched: " + JSON.stringify(val));
    },
    user_created: function(val){
      console.log("user created: " + JSON.stringify(val));
    },
    user_updated: function(val){
      console.log("user updated: " + JSON.stringify(val));
    },
    user_destroyed: function(val){
      console.log("user destroyed: " + JSON.stringify(val));
    },

    // weeks

    week_fetched: function(val){
      console.log("week fetched: " + JSON.stringify(val));
    },
    week_created: function(val){
      console.log("week created: " + JSON.stringify(val));
    },
    week_updated: function(val){
      console.log("week updated: " + JSON.stringify(val));
    },
    week_destroyed: function(val){
      console.log("week destroyed: " + JSON.stringify(val));
    },

    // days

    day_fetched: function(val){
      console.log("day fetched: " + JSON.stringify(val));
    },
    day_created: function(val){
      console.log("day created: " + JSON.stringify(val));
    },
    day_updated: function(val){
      console.log("day updated: " + JSON.stringify(val));
    },
    day_destroyed: function(val){
      console.log("day destroyed: " + JSON.stringify(val));
    }
  },
  methods: {
    clickButton: () => {
      (new Vue()).$socket.emit('emit_method', {asdf: 2});
    }, 

    // users

    getUser: (id) => {
      (new Vue()).$socket.emit('fetch_user', {id: id});
    }, 
    newUser: () => {
      (new Vue()).$socket.emit('create_user', {name: "dcvezzani", notes: "David Vezzani", freeDay: 0, freeMeal: false, sickDay: 0});
    }, 
    updateUser: () => {
      (new Vue()).$socket.emit('update_user', {id: 3, name: "dcvezzani", notes: "David Vezzani", freeDay: 0, freeMeal: false, sickDay: 0});
    }, 
    deleteUser: () => {
      (new Vue()).$socket.emit('destroy_user', {id: 3});
    }, 

    // weeks

    getWeek: (id) => {
      (new Vue()).$socket.emit('fetch_week', {id: id});
    }, 
    newWeek: () => {
      (new Vue()).$socket.emit('create_week', {userId: 4, freebieFood: 0});
    }, 
    updateWeek: () => {
      (new Vue()).$socket.emit('update_week', {id: 4, userId: 4, freebieFood: 0});
    }, 
    deleteWeek: () => {
      (new Vue()).$socket.emit('destroy_week', {id: 4});
    }, 

    // days

    getDay: (id) => {
      (new Vue()).$socket.emit('fetch_day', {id: id});
    }, 
    newDay: () => {
      (new Vue()).$socket.emit('create_day', {weekId: 4, positiveFood: 0, positiveFoodData: '{}', negativeFood: 0, negativeFoodData: '{}', fruitsVegetables: 0, water: 0, waterCupsCnt: 0, after8: 0, exercise: 0, exerciseData: '{}', dailyGreatness: 0, dailyGreatnessData: '{}', personalPrayer: 0, personalPrayerData: '{}', scriptureStudy: 0, scriptureStudyData: '{}'});
    }, 
    updateDay: () => {
      (new Vue()).$socket.emit('update_day', {id: 1, weekId: 4, positiveFood: 0, positiveFoodData: '{}', negativeFood: 0, negativeFoodData: '{}', fruitsVegetables: 0, water: 0, waterCupsCnt: 0, after8: 0, exercise: 0, exerciseData: '{}', dailyGreatness: 0, dailyGreatnessData: '{}', personalPrayer: 0, personalPrayerData: '{}', scriptureStudy: 0, scriptureStudyData: '{}'});
    }, 
    deleteDay: () => {
      (new Vue()).$socket.emit('destroy_day', {id: 1});
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

.items .item {
  border: 1px solid gray; 
  margin: 10px 0;
  background-color: #efefef;
}
</style>
