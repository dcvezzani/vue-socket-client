<template>
  <div class="topic">

    <div class="field">
      <input @click="toggleCheckbox" :id="checkboxId" type="checkbox" :name="checkboxId" class="switch is-rounded" :checked="(points == 0) ? '' : 'checked'">
      <label :for="checkboxId" class="label">{{ tfName }}</label>
    </div>

    <div class="field" v-show="tfDetails">
      <div class="control">
        <textarea @blur="saveDailyContent" v-model="details" class="textarea" placeholder="Textarea"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'CheckboxField',
  props: {
    tfName: {type: String, required: true}, 
    tfDetails: {default: false}
  }, 

  data () {
    return {
      pointValue: 5, 
      points: 0, 
      details: '', 
      dayId: null
    }
  }, 
  
  computed: {
    checkboxId () {
      return this.tfName.toLowerCase().replace(/ +/, '-') + '-checkbox';
    }, 
    supportedAttrs () {
      let theAttrs = {}
      switch(this.tfName){
        case 'After 8':
          theAttrs = {after8: 'points'};
          break;
        case 'Daily Greatness':
          theAttrs = {dailyGreatness: 'points', dailyGreatnessData: 'details'};
          break;
        case 'Personal Prayer':
          theAttrs = {personalPrayer: 'points', personalPrayerData: 'details'};
          break;
        case 'Scripture Study':
          theAttrs = {scriptureStudy: 'points', scriptureStudyData: 'details'};
          break;
      }

      return theAttrs;
    }
  }, 

  methods: {
    toggleCheckbox (event) {
      this.points = (event.target.checked) ? this.pointValue : 0;
      this.saveDailyContent()
    }, 
    defaultValue (attr) {
      let value = null;
      switch (this.supportedAttrs[attr]) {
        case 'points': 
          value = 0;
          break;
        case 'details':
        default:
          value = '';
          break;
      }
      return value; 
    }, 
    saveDailyContent () {
      let self = this;
      // console.log("saving data");

      let attrData = {id: self.dayId}
      $.each(Object.keys(this.supportedAttrs), function( index, attr ) {
        attrData[attr] = self[self.supportedAttrs[attr]]
      });
      // console.log(attrData);

      this.$emit('save', attrData);
      // (new Vue()).$socket.emit('', data, callback);
    }
  }, 

  mounted () {
    window.Event.$on('loadDailyDataFor', (dayData) => {
      let chk = []
      let self = this;

      this.dayId = dayData.id;
      $.each(Object.keys(this.supportedAttrs), function( index, attr ) {
        console.log(attr, self.supportedAttrs[attr]);

        self[self.supportedAttrs[attr]] = dayData[attr] || self.defaultValue(attr);
      });
    }) 
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>




