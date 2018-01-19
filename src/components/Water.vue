<template>
  <div class="water topic-group">
    <text-field tf-name="Water"></text-field>
    <text-field tf-name="Cups of Water"></text-field>
  </div>
</template>

<script>
import TextField from '@/components/TextField'

export default {
  name: 'Water',
  props: {
  }, 
  components: {
    'text-field': TextField
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



