<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent">
      <div
        v-if="showForm"
        class="container form"
      >
        <div class="field is-horizontal">
          <div class="field-label">
            <label
              for="name"
              class="label"
            >Model name</label>
          </div>
          <div class="field-body">
            <div class="control">
              <input
                id="name"
                :value="name"
                type="text"
                class="input"
                @input="inputEpoch"
              >
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label">
            <label
              for="epoch"
              class="label"
            >Epoch</label>
          </div>
          <div class="field-body">
            <div class="control">
              <input
                id="epoch"
                :value="epochs"
                type="number"
                class="input"
                @input="inputEpoch"
              >
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label">
            <label
              for="iterations"
              class="label"
            >Iterations</label>
          </div>
          <div class="field-body">
            <div class="control">
              <input
                id="iterations"
                :value="iterations"
                type="number"
                class="input"
                @input="inputIterations"
              >
            </div>
          </div>
        </div>
        <div class="field is-grouped is-grouped-centered">
          <div class="control">
            <button
              class="button is-link"
              @click="startLearn"
              @disabled="isDisabledTrain"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="tile is-parent">
      <h4>Logs</h4>
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
        iterations: state => state.learnModel.numTrainingIterations,
        isDisabledTrain: state => state.learnModel.trainDisabled,
        learnData: state => state.learnModel.learnData,
        testData: state => state.learnModel.testData,
      }),
      showForm() {
        return this.testData && Object.values(this.testData).length > 0
          && this.learnData && Object.values(this.learnData).length >0
      }
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
