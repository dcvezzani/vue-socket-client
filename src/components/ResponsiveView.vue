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
      <text-field tf-name="Positive Food" tf-details="true" class="topic-group"></text-field>
      <text-field tf-name="Negative Food" tf-details="true" class="topic-group"></text-field>
      <text-field tf-name="Fruits & Vegetables" class="topic-group"></text-field>
      <water></water>
      <checkbox-field tf-name="After 8" class="topic-group"></checkbox-field>
      <text-field tf-name="Exercise" tf-details="true" class="topic-group"></text-field>
      <checkbox-field tf-name="Daily Greatness" tf-details="true" class="topic-group"></checkbox-field>
      <checkbox-field tf-name="Personal Prayer" tf-details="true" class="topic-group"></checkbox-field>
      <checkbox-field tf-name="Scripture Study" tf-details="true" class="topic-group"></checkbox-field>
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
      months: [ ]
    }
  }, 
  methods: {
    populate_calendar(month, days) {
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
      });

      this.months[this.months.length] = {name: month, days: [pre, theDays, post]}
    }, 
    fetch_calendar(data, callback) {
      this['loading'] = true;
      (new Vue()).$socket.emit('fetch_calendar', data, callback);
    }
  }, 
  created() {
    this.fetch_calendar('Jan 2018', 'populate_calendar');
    this.fetch_calendar('Feb 2018', 'populate_calendar');
    this.fetch_calendar('Mar 2018', 'populate_calendar');
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

