const state = {
  epochs: 1,
  numTrainingIterations: 10,
  name: 'pitch-1',
  start: false,
  libraryType: '',
  trainDisabled: true,
  learnData: null,
  testData: null,
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
  setTrainButton(state, payload) {
    state.trainDisabled = payload
  },
  setTrainData(state, payload) {
    state.learnData = { ...payload }
  },
  setTestData(state, payload) {
    state.testData = { ...payload }
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
  changeTrainButton({ commit }, data) {
    commit('setTrainButton', data)
  },
  loadTrainData({ commit }, data) {
    commit('setTrainData', data)
  },
  loadTestData({ commit }, data) {
    commit('setTestData', data)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
