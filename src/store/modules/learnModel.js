const state = {
  model: null,
  epochs: 1,
  numTrainingIterations: 10,
  name: 'pitch-1',
  start: false,
  libraryType: '',
  learnData: null,
  testData: null,
  trainStatus: '',
  predictData: null,
  predictClassName: '',
  constants: {
    VX0_MIN: -18.885,
    VX0_MAX: 18.065,
    VY0_MIN: -152.463,
    VY0_MAX: -86.374,
    VZ0_MIN: -15.5146078412997,
    VZ0_MAX: 9.974,
    AX_MIN: -48.0287647107959,
    AX_MAX: 30.592,
    AY_MIN: 9.397,
    AY_MAX: 49.18,
    AZ_MIN: -49.339,
    AZ_MAX: 2.95522851438373,
    START_SPEED_MIN: 59,
    START_SPEED_MAX: 104.4,
    NUM_PITCH_CLASSES: 7,
    TRAINING_DATA_LENGTH: 7000,
    TEST_DATA_LENGTH: 700,
    TIMEOUT_BETWEEN_EPOCHS_MS: 2000,
  }
}

const getters = {

}

const mutations = {
  setEpoch (state, payload) {
    state.epochs = payload
  },
  setIteration (state, payload) {
    state.numTrainingIterations = payload
  },
  setName (state, payload) {
    state.name = payload
  },
  setStart (state, payload) {
    state.start = payload
  },
  setLibrary (state, payload) {
    state.libraryType = payload
  },
  setTrainData(state, payload) {
    state.learnData = { ...payload }
  },
  setTestData(state, payload) {
    state.testData = { ...payload }
  },
  setStatus(state, payload) {
    state.trainStatus = `${payload}`
  },
  setPredictData(state, payload) {
    state.predictData = { ...payload }
  },
  setPredictClassName(state, payload) {
    state.predictClassName = `${payload}`
  },
  setModel(state, payload) {
    state.model = { ...payload }
  },
}

const actions = {
  changeEpoch ({ commit }, data) {
    commit('setEpoch', data)
  },
  changeIteration ({ commit }, data) {
    commit('setIteration', data)
  },
  changeName ({ commit }, data) {
    commit('setName', data)
  },
  learnModelStart({ commit }, data) {
    commit('setStart', data)
  },
  changeLibraryType({ commit }, data) {
    commit('setLibrary', data)
  },
  loadTrainData({ commit }, data) {
    commit('setTrainData', data)
  },
  loadTestData({ commit }, data) {
    commit('setTestData', data)
  },
  changeStatus({ commit }, data) {
    commit('setStatus', data)
  },
  predictData({ commit }, data) {
    commit('setPredictData', data)
  },
  changePredictClassName({ commit }, data) {
    commit('setPredictClassName', data)
  },
  changeModel({ commit }, data) {
    commit('setModel', data)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
