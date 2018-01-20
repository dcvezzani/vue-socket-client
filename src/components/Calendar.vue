<template>

<div class="calendar">
  <div class="calendar-nav">
    <div class="calendar-nav-left">
      <button class="button is-text">
        <i class="fa fa-chevron-left"></i>
      </button>
    </div>
    <div>{{ monthName }}</div>
    <div class="calendar-nav-right">
      <button class="button is-text">
        <i class="fa fa-chevron-right"></i>
      </button>
    </div>
  </div>
  <div class="calendar-container">
    <div class="calendar-header">
      <div class="calendar-date">Sun</div>
      <div class="calendar-date">Mon</div>
      <div class="calendar-date">Tue</div>
      <div class="calendar-date">Wed</div>
      <div class="calendar-date">Thu</div>
      <div class="calendar-date">Fri</div>
      <div class="calendar-date">Sat</div>
    </div>
    <div class="calendar-body">
      <calendar-day v-for="(day, index) in days[0]" :key="'pre-' + index" :disabled="true" :day="day"></calendar-day>
      <calendar-day v-for="(day, index) in daysData" :key="'cur-' + index" :day="day.day" :dayData="day"></calendar-day>
      <calendar-day v-for="(day, index) in days[2]" :key="'post-' + index" :disabled="true" :day="day"></calendar-day>
    </div>
  </div>
</div>

</template>

<script>
import CalendarDay from '@/components/CalendarDay'

export default {
  name: 'Calendar',
  props: {
    month: {type: Object, require: true}
  }, 
  components: {
    'calendar-day': CalendarDay
  },

  data () {
    return {
      monthName: this.month.name, 
      days: this.month.days, 
      daysData: this.month.daysData
    }
  },

  mounted () {
    window.Event.$on('clearAllDaysActive', (day) => {
      // console.log("clearAllDaysActive except: " + day);
      window.Event.$emit('clearAllActiveExceptFor', this.day);
    }) 
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.calendar {
  display: inline-block;
}
</style>





