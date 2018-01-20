<template>
  <div :class="['calendar-date', disabled ? 'is-disabled' : '']"><button @click="toggle" :class="['date-item', isActive ? 'is-active' : '', isLocked ? 'is-locked' : '', ]">{{ day }}</button></div>

</template>

<script>

export default {
  name: 'CalendarDay',
  props: {
    day: {type: Number, required: true}, 
    disabled: {type: Boolean, default: false}
  }, 

  data () {
    return {
      isActive: false
    }
  }, 

  methods: {
    toggle() {
      window.Event.$emit('clearAllDaysActive', this.day);
      this.isActive = !this.isActive;
    }
  }, 

  mounted () {
    window.Event.$on('clearAllActiveExceptFor', (day) => {
      // console.log("clear day: " + this.day);
      this.isActive = (day == this.day);
    }) 
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
</style>





