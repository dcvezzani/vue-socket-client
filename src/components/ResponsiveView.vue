<template>
  <div class="responsive-view section">
    <div class="loading" v-if="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>
  
    <calendar v-for="(month, index) in months" :key="'month-' + index" :month="month"></calendar>
    
    <div class="container">
      <text-field @save="saveDailyRecord" tf-name="Positive Food" tf-details="true" class="topic-group"></text-field>
      <text-field @save="saveDailyRecord" tf-name="Negative Food" tf-details="true" class="topic-group"></text-field>
      <text-field @save="saveDailyRecord" tf-name="Fruits & Vegetables" class="topic-group"></text-field>
      <water @save="saveDailyRecord"></water>
      <checkbox-field @save="saveDailyRecord" tf-name="After 8" class="topic-group"></checkbox-field>
      <text-field @save="saveDailyRecord" tf-name="Exercise" tf-details="true" class="topic-group"></text-field>
      <checkbox-field @save="saveDailyRecord" tf-name="Daily Greatness" tf-details="true" class="topic-group"></checkbox-field>
      <checkbox-field @save="saveDailyRecord" tf-name="Personal Prayer" tf-details="true" class="topic-group"></checkbox-field>
      <checkbox-field @save="saveDailyRecord" tf-name="Scripture Study" tf-details="true" class="topic-group"></checkbox-field>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import $ from 'jquery'
import Calendar from '@/components/Calendar'
import TextField from '@/components/TextField'
import CheckboxField from '@/components/CheckboxField'
import Water from '@/components/Water'

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
  name: 'ResponsiveView',
  components: {
    'calendar': Calendar, 
    'text-field': TextField, 
    'checkbox-field': CheckboxField, 
    'water': Water
  },

  data () {
    return {
      loading: false,
      error: null, 
      months: [ ], 
      daysById: {}, 
      dailyData: null
    }
  }, 
  methods: {
    populate_calendar(month, days) {
      let self = this;
      let pre = []
      let post = []
      switch(month){
        case 'Jan 2018': 
          pre = [31, 1, 2, 3, 4, 5]
          post = [1, 2, 3]
          break;
        case 'Feb 2018': 
          pre = [28, 29, 30, 31]
          post = [1, 2, 3]
          break;
        case 'Mar 2018': 
          pre = [25, 26, 27, 28]
          post = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
          break;
      }

      let theDays = []
      $.each(days, function( index, day ) {
        theDays[theDays.length] = day.day;
        self.daysById[day.id] = day;
      });

      this.months[this.months.length] = {name: month, days: [pre, theDays, post], daysData: days}
    }, 
    fetch_calendar(data, callback) {
      this['loading'] = true;
      (new Vue()).$socket.emit('fetch_calendar', data, callback);
    }, 
    saveDailyRecord (data) {
      Object.assign(this.daysById[data.id], data);
      let day = this.daysById[data.id];
      console.log(day);

      let dayData = {"id": day.id,
        "weekId": day.weekId, 
        "wholeDate": day.wholeDate,
        "month": day.month,
        "day": day.day,
        "positiveFood": stringToInteger(day.positiveFood),
        "positiveFoodData": day.positiveFoodData,
        "negativeFood": stringToInteger(day.negativeFood),
        "negativeFoodData": day.negativeFoodData,
        "fruitsVegetables": stringToInteger(day.fruitsVegetables),
        "water": stringToInteger(day.water),
        "waterCupsCnt": stringToInteger(day.waterCupsCnt),
        "after8": booleanToInteger(day.after8, 5),
        "exercise": stringToInteger(day.exercise),
        "exerciseData": day.exerciseData,
        "dailyGreatness": booleanToInteger(day.dailyGreatness, 5),
        "dailyGreatnessData": day.dailyGreatnessData,
        "personalPrayer": booleanToInteger(day.personalPrayer, 5),
        "personalPrayerData": day.personalPrayerData,
        "scriptureStudy": booleanToInteger(day.scriptureStudy, 5),
        "scriptureStudyData": day.scriptureStudyData
        };

      console.log("updating with: " + JSON.stringify(dayData));
      // this.updateDay(dayData);
    }, 
    updateDay (dayData) {
      console.log("link up with socket call to update data");
      console.log(dayData);
    }
  }, 
  created() {
    this.fetch_calendar('Jan 2018', 'populate_calendar');
    this.fetch_calendar('Feb 2018', 'populate_calendar');
    this.fetch_calendar('Mar 2018', 'populate_calendar');
  }, 

  mounted () {
    window.Event.$on('loadDailyData', (dayData) => {
      window.Event.$emit('loadDailyDataFor', dayData);
    }) 
  }, 
  
  sockets:{
    connect: function(){
      console.log('socket connected for ResponsiveView')
    },
    // days

    calendar_fetched (resp) {
      // console.log("calendar fetched: " + JSON.stringify(resp));
      this[resp.callback](resp.collection[0].month, resp.collection);

      if (this.months.length == 3)
        this.loading = false;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.topic-group {
  margin: 1em 0;
  padding: 10px;
  border: 1px solid silver; 
}
.calendar {
  margin: 0 10px;
}
</style>

