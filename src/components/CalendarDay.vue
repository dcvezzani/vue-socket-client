<template>
  <div :class="['calendar-date', disabled ? 'is-disabled' : '']"><button @click="toggle" :class="['date-item', isLocked ? 'is-locked' : '', isActive ? 'is-active' : '' ]">{{ day }}</button></div>

</template>

<script>
import moment from 'moment'

export default {
  name: 'CalendarDay',
  props: {
    day: {type: Number, required: true}, 
    dayData: {type: Object}, 
    disabled: {type: Boolean, default: false}
  }, 

  data () {
    return {
      isActive: false, 
      isLockedValue: false, 
      dayDate: null
    }
  }, 

  methods: {
    toggle () {
      window.Event.$emit('clearAllDaysActive', this.day);
      window.Event.$emit('loadDailyData', this.dayData);
      this.isActive = !this.isActive;
    }
  }, 

  computed: {
    isLocked () {
      if (this.dayDate == null)
        return false;

      let theDate = moment(this.dayData.wholeDate); 
      //TODO: ugly, but works for now
      let today = moment(moment().format('YYYY-MM-DD'), 'YYYY-MM-DD');
      
      return (theDate.unix() < today.unix());
    }
  }, 

  mounted () {
    window.Event.$on('clearAllActiveExceptFor', (day) => {
      // console.log("clear day: " + this.day);
      this.isActive = (day == this.day);
    })

    if (typeof this.dayData !== 'undefined')
      this.dayDate = this.dayData.wholeDate;

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.calendar .calendar-date .date-item.is-locked {
    background: #C4F3EB;
    border-color: #C4F3EB;
    color: #fff;
}
/* TODO: this style should override is-locked */
.calendar .calendar-date .date-item.is-active {
    background: #00d1b2;
    border-color: #00d1b2;
    color: #fff;
}
</style>





