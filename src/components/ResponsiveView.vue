<template>
  <div class="responsive-view section">
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
import TextField from '@/components/TextField'
import CheckboxField from '@/components/CheckboxField'
import Water from '@/components/Water'

export default {
  name: 'ResponsiveView',
  components: {
    'text-field': TextField, 
    'checkbox-field': CheckboxField, 
    'water': Water
  },
  data () {
    return {
    }
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
</style>

