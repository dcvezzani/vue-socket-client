<template>
  <div class="topic">
    <div class="field">
      <div>
        <label class="label">{{ tfName }}</label>
      </div>
      <div class="controls-inline"></div>
      <a @click="decPoints" class="button is-primary"> - </a>
      <div class="control small-number">
        <input @blur="saveDailyContent" v-model="points" class="input" type="text">
      </div>
      <a @click="incPoints" class="button is-primary"> + </a>
      <div></div>
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
  name: 'TextField',
  props: {
    tfName: {type: String, required: true},
    // TODO: figure out how to use Boolean
    // tfDetails: {type: Boolean, default: false}
    tfDetails: {default: false}
  }, 
  data () {
    return {
      points: 0, 
      details: '', 
      dayId: null
    }
  }, 
  computed: {
    // TODO: include this data in material given from ResponsiveView to TextField
    supportedAttrs () {
      let theAttrs = {}
      switch(this.tfName){
        case 'Positive Food':
          theAttrs = {positiveFood: 'points', positiveFoodData: 'details'};
          break;
        case 'Negative Food':
          theAttrs = {negativeFood: 'points', negativeFoodData: 'details'};
          break;
        case 'Fruits & Vegetables':
          theAttrs = {fruitsVegetables: 'points'};
          break;
        case 'Water':
          theAttrs = {water: 'points'};
          break;
        case 'Cups of Water':
          theAttrs = {waterCupsCnt: 'points'};
          break;
        case 'Exercise':
          theAttrs = {exercise: 'points', exerciseData: 'details'};
          break;
      }

      return theAttrs;
    }
  }, 

  methods: {
    incPoints (direction) { this.adjPoints('up'); },
    decPoints (direction) { this.adjPoints('down'); },
    adjPoints (direction) {
      if (typeof this.points !== 'number')
        this.points = 0;

      switch(direction){
        case 'down':
          this.points -= 1;
          break;
        case 'up':
          this.points += 1;
          break;
      }

      this.saveDailyContent()
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
    }, 
    
  },

  mounted () {
    window.Event.$on('loadDailyDataFor', (dayData) => {
      let chk = []
      let self = this;
      // console.log(dayData);

      this.dayId = dayData.id;
      $.each(Object.keys(this.supportedAttrs), function( index, attr ) {
        console.log(attr, self.supportedAttrs[attr]);
        self[self.supportedAttrs[attr]] = dayData[attr] || '';
      });
    }) 
  }
  
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.small-number{
  display: inline-block;
  width: 3em;
}
.controls-inline a,
.controls-inline div {
  display: inline-block;
}
.topic {
}
a.button {
  width: 3em;
}
</style>


