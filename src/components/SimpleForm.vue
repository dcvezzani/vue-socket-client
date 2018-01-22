<template>
  <div class="tile my-tile">
    <article class="tile is-child notification is-info">

      <div class="field">
        <div>
          <label :class="['label', selected ? 'is-selected' : '']">{{ label }}</label>
        </div>
        <div class="controls-inline"></div>
        <a @click="decPoints" class="button is-primary"> - </a>
        <div class="control small-number">
          <input @blur="blah" v-model="points" class="input" type="text">
        </div>
        <a @click="incPoints" class="button is-primary"> + </a>
        <a @click="blah" class="button is-success"> ^ </a>
        <div></div>
      </div>

      <div class="field">
        <div class="control">
          <textarea @blur="blah" v-model="details" class="textarea" placeholder="Textarea"></textarea>
        </div>
      </div>

      <div class="field">
        <div class="control">
          <textarea @blur="blah" v-model="allInfo" class="textarea" placeholder="Textarea"></textarea>
        </div>
      </div>

      <div>{{ allTotal }}</div>

    </article>
  </div>
</template>

<script>
import Vue from 'vue'
// import TextField from '@/components/TextField'

export default {
  name: 'SimpleForm',
  props: {
    label: {type: String}
  }, 
  components: {
    // 'text-field': TextField, 
  },

  data () {
    return {
      details: '', 
      points: 0, 
      allTotal: 0, 
      allInfo: '', 
      selected: false
    }
  }, 

  methods: {
    blah () {}, 
    loadData (data) {
      this.details = data.details;
      this.points = data.points;
    }, 
    incPoints () {
      window.Event.$emit('incPoints', this.label);
    }, 
    decPoints () {
      window.Event.$emit('decPoints', this.label);
    }, 
  }, 

  mounted () {
    window.Event.$on('sLoadData', (person, data) => {
      if (person == this.label)
        this.loadData(data);
    })
    window.Event.$on('updateTotal', (person, total) => {
      this.allTotal = total;
    })
    window.Event.$on('selectPerson', (person) => {
      this.selected = (person == this.label);

      // if (person == this.label) {
      //   (new Vue()).$socket.emit('login', this.label, 'loggedIn');
      // } else {
      //   (new Vue()).$socket.emit('logout', this.label, 'loggedOut');
      // }
      
    })
    window.Event.$on('logout', () => {
      (new Vue()).$socket.emit('logout', this.label, 'loggedOut');
    })

    
  }, 

  sockets:{
    connect: function(){
      console.log('socket connected for SimpleForm');
      (new Vue()).$socket.emit('login', this.label, 'loggedIn');
    },
  }, 
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.small-number{
  display: inline-block;
  width: 3em;
}
article a.button {
  width: 3em;
}
label.label {
  margin-bottom: 1em;
}
label.is-selected {
  color: white;
}

</style>




