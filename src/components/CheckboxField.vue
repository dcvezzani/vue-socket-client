<template>
  <div class="topic">
    <div class="field">
      <div>
        <label class="label">{{ tfName }}</label>
      </div>
    </div>

    <div class="field">
      <input id="switchRoundedDefault" type="checkbox" name="switchRoundedDefault" class="switch is-rounded" checked="checked">
      <label for="switchRoundedDefault">Switch rounded default</label>
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
  name: 'CheckboxField',
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
</style>




