<template>
  <div class="section">
    <div class="person-buttons">
      <a @click="selectPerson" class="button is-primary">Joe</a>
      <a @click="selectPerson" class="button is-primary">Karen</a>
      <a @click="selectPerson" class="button is-primary">George</a>
      <a @click="selectPerson" class="button is-primary">Kyle</a>
    </div>
    <div class="section">
      <div class="tile is-ancestor">
        <div class="tile is-vertical is-16">
          <div class="tile is-parent">

            <simple-form label="Joe" v-if="personMatches('Joe')"></simple-form>
            <simple-form label="Karen" v-if="personMatches('Karen')"></simple-form>

            <simple-form label="George" v-if="personMatches('George')"></simple-form>
            <simple-form label="Kyle" v-if="personMatches('Kyle')"></simple-form>

          </div>
        </div>
      </div>
     
    </div>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import SimpleForm from '@/components/SimpleForm'
import $ from 'jquery'

export default {
  name: 'Simple',
  components: {
    'simple-form': SimpleForm, 
  },

  data () {
    return {
      currentPerson: 'Joe', 
      people: {}, 
      initialized: false
    }
  }, 

  computed: {
    totalPoints () {
      const self = this;
      let lTotalPoints = 0;
      $.each(Object.keys(self.people), function( index, key ) {
        lTotalPoints += self.people[key].points;
      });
      return lTotalPoints;
    }, 
  }, 

  methods: {
    personMatches (label) {
      return true; //(this.currentPerson == label);
    }, 
    selectPerson (event) {
      this.currentPerson = event.target.childNodes[0].nodeValue;
      this.updateView();
    }, 
    updateView () {
      const peopleKeys = Object.keys(this.people);
      const self = this;

      $.each(peopleKeys, function( index, person ) {
        window.Event.$emit('sLoadData', person, self.people[person]);
      });

      window.Event.$emit('updateTotal', this.currentPerson, this.totalPoints);
      window.Event.$emit('selectPerson', this.currentPerson);
    }, 
    loadData () {
      (new Vue()).$socket.emit('fetch_people');
    }, 
    filteredPerson (person) {
      const self = this;
      let filtered = {}
      const filteredKeys = ['id', 'name', 'points', 'details']

      $.each(filteredKeys, function( index, key ) {
        filtered[key] = self.people[person][key]
      });

      return filtered;
    }, 
    save (person) {
      (new Vue()).$socket.emit('update_person', this.filteredPerson(person));
    }, 
    initView () {
      window.Event.$on('incPoints', (person) => {
        if (this.currentPerson == person) {
          this.people[person].points += 1;
          this.save(person);
        }
      }); 
      window.Event.$on('decPoints', (person) => {
        if (this.currentPerson == person) {
          this.people[person].points -= 1;
          this.save(person);
        }
      }); 

      this.initialized = true;
    }
  }, 

  mounted () {
    this.loadData();
  }, 

  sockets:{
    connect: function(){
      console.log("socket connected for Simple");
      (new Vue()).$socket.emit('login', this.currentPerson, 'loggedIn');
    },
    disconnect: function(){
      (new Vue()).$socket.emit('logout', this.currentPerson);
    },
    loggedIn: function(resp){
      console.log('logged in for: ' + JSON.stringify(resp));
    },
    loggedOut: function(resp){
      console.log('logged out for: ' + JSON.stringify(resp));
    },
    person_updated: function(resp){
      this.loadData()
    },
    people_fetched: function(resp){
      const self = this;
      console.log('people fetched: ' + JSON.stringify(resp));
      console.log(resp.collection);

      $.each(resp.collection, function( index, rec ) {
        self.people[rec.name] = rec;
      });

      this.updateView();

      if (!this.initialized)
        this.initView();
    },
  }, 

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.person-buttons a {
  position: relative;
  width: 7em; 
  margin: 0 1em;
}
.my-tile {
  margin: 1em; 
}
</style>



