<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent" />
    <div class="tile is-parent">
      <div class="container">
        <div class="field">
          <label
            for="name"
            class="label"
          >Model name</label>
          <div class="control">
            <input
              id="name"
              :value="name"
              type="text"
              @input="inputEpoch"
            >
          </div>
        </div>
        <div class="field">
          <label
            for="epoch"
            class="label"
          >Epoch</label>
          <div class="control">
            <input
              id="epoch"
              :value="epochs"
              type="number"
              @input="inputEpoch"
            >
          </div>
        </div>
        <div class="field">
          <label
            for="iterations"
            class="label"
          >Iterations</label>
          <div class="control">
            <input
              id="iterations"
              :value="iterations"
              type="number"
              @input="inputIterations"
            >
          </div>
        </div>
        <div class="field is-grouped is-grouped-centered">
          <div class="control">
            <button
              class="button is-link"
              @click="startLearn"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="tile is-parent">
      <h3>Logs</h3>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  export default {
    name: 'LearnForm',
    computed: {
      ...mapState({
        name: state => state.learnModel.name,
        epochs: state => state.learnModel.epochs,
        iterations: state => state.learnModel.numTrainingIterations
      })
    },
    methods: {
      ...mapActions({
        changeName: 'learnModel/changeName',
        changeEpoch: 'learnModel/changeEpoch',
        changeIteration: 'learnModel/changeIteration',
        learnModelStart: 'learnModel/learnModelStart',
      }),
      inputName(e) {
        this.changeName(e.target.value);
      },
      inputEpoch(e) {
        this.changeEpoch(Number(e.target.value));
      },
      inputIterations(e) {
        this.changeIteration(Number(e.target.value));
      },
      startLearn() {
        this.learnModelStart(true);
      }
    }
  }
</script>

<style scoped>

</style>
