<template>
  <div class="topic">
    <div class="field">
      <div>
        <label class="label">{{ tfName }}</label>
      </div>
      <div class="controls-inline"></div>
      <a class="button is-primary"> - </a>
      <div class="control small-number">
        <input class="input" type="text">
      </div>
      <a class="button is-primary"> + </a>
      <div></div>
    </div>

    <div class="field" v-show="tfDetails">
      <div class="control">
        <textarea class="textarea" placeholder="Textarea"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextField',
  props: {
    tfName: {type: String, required: true},
    tfDetails: {type: String, default: "false"}
  }, 
  data () {
    return {
    }
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


