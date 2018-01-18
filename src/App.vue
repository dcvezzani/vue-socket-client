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
        <input v-model="day.positiveFood" @blur="updateString" id="positiveFood" type="text">
        <div><textarea v-model="day.positiveFoodData" @blur="updateText" id="positiveFoodData" name="" cols="30" rows="10"></textarea></div>
      </div>

      <div class="item">Negative food: 
        <input v-model="day.negativeFood" @blur="updateString" id="negativeFood" type="text">
        <div><textarea v-model="day.negativeFoodData" @blur="updateText" id="negativeFoodData" name="" cols="30" rows="10"></textarea></div>
      </div>

      <div class="item">Fruits &amp; vegetables:
        <input v-model="day.fruitsVegetables" @blur="updateString" id="fruitsVegetables" type="text">
      </div>

      <div class="item">Water: <input v-model="day.water" @blur="updateString" id="water" type="text">
        <div> Cups: <input v-model="day.waterCupsCnt" @blur="updateString" id="waterCupsCnt" type="text"></div>
      </div>

      <div class="item">After 8:
        <input v-model="day.after8" @click="updateCheckbox" id="after8" type="checkbox">
      </div>

      <div class="item">Exercise:
        <input v-model="day.exercise" @blur="updateString" id="exercise" type="text">
        <div><textarea v-model="day.exerciseData" @blur="updateText" id="exerciseData" name="" cols="30" rows="10"></textarea></div>
      </div>

      <div class="item">Daily greatness:
        <input v-model="day.dailyGreatness" @click="updateCheckbox" id="dailyGreatness" type="checkbox">
        <div><textarea v-model="day.dailyGreatnessData" @blur="updateText" id="dailyGreatnessData" name="" cols="30" rows="10"></textarea></div>
      </div>

      <div class="item">Personal prayer:
        <input v-model="day.personalPrayer" @click="updateCheckbox" id="personalPrayer" type="checkbox">
        <div><textarea v-model="day.personalPrayerData" @blur="updateText" id="personalPrayerData" name="" cols="30" rows="10"></textarea></div>
      </div>

      <div class="item">Scripture study:
        <input v-model="day.scriptureStudy" @click="updateCheckbox" id="scriptureStudy" type="checkbox">
        <div><textarea v-model="day.scriptureStudyData" @blur="updateText" id="scriptureStudyData" name="" cols="30" rows="10"></textarea></div>
      </div>
    </div>


  </div>
</template>

<script>
import Vue from 'vue'
import $ from 'jquery';

let points = {
  after8: 5, 
  dailyGreatness: 5, 
  personalPrayer: 5, 
  scriptureStudy: 5
}

let booleanToInteger = (valueBoolean, valueInteger) => {
  if (typeof valueBoolean === undefined) {
    valueBoolean = $('#' + event.target.id).is(":checked");
  }

  if (typeof valueInteger === undefined) {
    valueInteger = 1;
  }

  return ((valueBoolean) ? valueInteger : 0)
}

let integerToBoolean = (valueInteger) => {
  return (((typeof valueInteger === undefined) || (valueInteger == 0)) ? false : true);
}

let stringToInteger = (valueString) => {
  try {
    if (typeof valueString === undefined) {
      valueString = $('#' + event.target.id).val();
    }
    return JSON.parse(valueString);

  } catch(err) {
    console.error("Unable to parse integer; using default value: 0");
    return 0;
  }
}

export default {
  name: 'App',
  data() {
    return {
      day: {}
    }
  }, 
  methods: {
    updateCheckbox (event) {
      let checked = $('#' + event.target.id).is(":checked");
      let pointValue = 0;

      switch(checked){
        case true:
          pointValue = points[event.target.id];
          break;

        case false:
        default: 
          break;
      }

      console.log(JSON.stringify({name: event.target.id, value: pointValue}));
      this.day[event.target.id] = pointValue;
      this.saveDay(this.day);
    }, 

    updateString (event) {
      let valueString = $('#' + event.target.id).val();
      if(valueString.length == 0)
        return false;

      let valueInteger = parseInt(valueString);
      let value = {name: event.target.id, value: valueInteger}
      console.log(value);
      this.saveDay(this.day);
    }, 

    updateText (event) {
      let valueString = $('#' + event.target.id).val();
      if(valueString.length == 0)
        return false;

      let valueObj = JSON.parse(valueString);
      let value = {name: event.target.id, value: valueObj}
      this.saveDay(this.day);
    }, 

    clickButton (event) {
      (new Vue()).$socket.emit('emit_method', {asdf: 2});
    }, 

    saveDay (day) {
      let dayData = {"id":1,
        "weekId":4,
        "positiveFood": stringToInteger(this.day.positiveFood),
        "positiveFoodData": this.day.positiveFoodData,
        "negativeFood": stringToInteger(this.day.negativeFood),
        "negativeFoodData": this.day.negativeFoodData,
        "fruitsVegetables": stringToInteger(this.day.fruitsVegetables),
        "water": stringToInteger(this.day.water),
        "waterCupsCnt": stringToInteger(this.day.waterCupsCnt),
        "after8": booleanToInteger(this.day.after8, 5),
        "exercise": stringToInteger(this.day.exercise),
        "exerciseData": this.day.exerciseData,
        "dailyGreatness": booleanToInteger(this.day.dailyGreatness, 5),
        "dailyGreatnessData": this.day.dailyGreatnessData,
        "personalPrayer": booleanToInteger(this.day.personalPrayer, 5),
        "personalPrayerData": this.day.personalPrayerData,
        "scriptureStudy": booleanToInteger(this.day.scriptureStudy, 5),
        "scriptureStudyData": this.day.scriptureStudyData
        };

      console.log("updating with: " + JSON.stringify(dayData));
      this.updateDay(dayData);
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

    getWeek: () => {
      (new Vue()).$socket.emit('fetch_week', {id: id}, callback);
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

    populateDay (day) {
      this.day = day;

      this.day = {"id": day.id,
        "weekId": day.weekId,
        "positiveFood": day.positiveFood,
        "positiveFoodData": day.positiveFoodData,
        "negativeFood": day.negativeFood,
        "negativeFoodData": day.negativeFoodData,
        "fruitsVegetables": day.fruitsVegetables,
        "water": day.water,
        "waterCupsCnt": day.waterCupsCnt,
        "after8": integerToBoolean(day.after8),
        "exercise": day.exercise,
        "exerciseData": day.exerciseData,
        "dailyGreatness": integerToBoolean(day.dailyGreatness),
        "dailyGreatnessData": day.dailyGreatnessData,
        "personalPrayer": integerToBoolean(day.personalPrayer),
        "personalPrayerData": day.personalPrayerData,
        "scriptureStudy": integerToBoolean(day.scriptureStudy),
        "scriptureStudyData": day.scriptureStudyData
        };
      
    }, 
    getDay (id, callback) {
      (new Vue()).$socket.emit('fetch_day', {id: id}, callback);
    }, 
    newDay: () => {
      (new Vue()).$socket.emit('create_day', {weekId: 4, positiveFood: 0, positiveFoodData: '{}', negativeFood: 0, negativeFoodData: '{}', fruitsVegetables: 0, water: 0, waterCupsCnt: 0, after8: 0, exercise: 0, exerciseData: '{}', dailyGreatness: 0, dailyGreatnessData: '{}', personalPrayer: 0, personalPrayerData: '{}', scriptureStudy: 0, scriptureStudyData: '{}'});
    }, 
    updateDay (data) {
      (new Vue()).$socket.emit('update_day', data);
      // {id: 1, weekId: 4, positiveFood: 0, positiveFoodData: '{}', negativeFood: 0, negativeFoodData: '{}', fruitsVegetables: 0, water: 0, waterCupsCnt: 0, after8: 0, exercise: 0, exerciseData: '{}', dailyGreatness: 0, dailyGreatnessData: '{}', personalPrayer: 0, personalPrayerData: '{}', scriptureStudy: 0, scriptureStudyData: '{}'}
    }, 
    deleteDay: () => {
      (new Vue()).$socket.emit('destroy_day', {id: 1});
    }
  }, 

  created() {
    this.getDay(1, 'populateDay');
  },

  sockets:{
    connect: function(){
      console.log('socket connected')
    },
    got_it: function(val){
      console.log("got it: " + JSON.stringify(val));
    },

    // users

    user_fetched: function(val, callback){
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

    day_fetched (val) {
      console.log("day fetched: " + JSON.stringify(val));
      this[val.callback](val.model);
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
