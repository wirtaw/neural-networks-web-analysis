<template>
  <div>
    <form>
      <div>
        <label for="name">Model name</label>
        <input :value="name" @input="inputEpoch" type="text" id="name"/>
      </div>
      <div>
        <label for="epoch">Epoch</label>
        <input :value="epochs" @input="inputEpoch" type="number" id="epoch"/>
      </div>
      <div>
        <label for="iterations">Iterations</label>
        <input :value="iterations" @input="inputIterations" type="number" id="iterations"/>
      </div>


    </form>
    <button @click="startLearn">Update</button>
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
