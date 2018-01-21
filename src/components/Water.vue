<template>
  <div class="water topic-group">
    <text-field @save="saveDailyRecord" tf-name="Water"></text-field>
    <text-field @save="saveDailyRecord" tf-name="Cups of Water"></text-field>
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
  }, 

  methods: {
    saveDailyRecord (attrData) {
      console.log(attrData);
      this.$emit('save', attrData);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>



