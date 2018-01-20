<template>
  <div :class="['calendar-date', disabled ? 'is-disabled' : '']"><button class="date-item">{{ day }}</button></div>

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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>





