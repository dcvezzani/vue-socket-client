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
      people: {
        Joe: { details: 'Debitis dolores eligendi eaque nihil praesentium libero recusandae! Illum', points: 0 }, 
        Karen: { details: 'Lorem accusamus doloribus ipsum inventore illo ea incidunt Provident eligendi aperiam obcaecati architecto unde', points: 2 }, 
        George: { details: 'Corrupti maxime molestiae optio voluptatibus ad vitae dolor unde Assumenda', points: 5 }, 
        Kyle: { details: 'obcaecati tempora Alias officia doloremque dolorem consectetur quasi Pariatur illo similique', points: 10 }, 
      }
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
    }
  }, 

  methods: {
    blah () {}, 
    personMatches (label) {
      return true; //(this.currentPerson == label);
    }, 
    selectPerson (event) {
      this.currentPerson = event.target.childNodes[0].nodeValue;
      this.updateView();
    }, 
    updateView () {
      window.Event.$emit('sLoadData', this.currentPerson, this.people[this.currentPerson]);
      window.Event.$emit('updateTotal', this.currentPerson, this.totalPoints);
      window.Event.$emit('selectPerson', this.currentPerson);
    }, 
  }, 

  mounted () {
    this.updateView();
    window.Event.$on('incPoints', (person) => {
      if (this.currentPerson == person) {
        this.people[person].points += 1;
        this.updateView();
      }
    }); 
    window.Event.$on('decPoints', (person) => {
      if (this.currentPerson == person) {
        this.people[person].points -= 1;
        this.updateView();
      }
    }); 
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



