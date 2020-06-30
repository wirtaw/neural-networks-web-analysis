const state = {
  trainTime: {},
  predictTime: {},
  predictAccuracy: {},
}

const getters = {

}

const mutations = {
  setTrainTime (state, payload) {
    let time = 0;
    const setTime = parseFloat(payload.time) / 1000;

    if (state.trainTime[payload.network]) {
      time = state.trainTime[payload.network];
    }

    state.trainTime[payload.network] = ((setTime + parseFloat(time)) / 2).toFixed(2);
    // state.trainTime.push({ id: state.trainTime.length + 1, value: parseFloat(payload).toFixed(2)})
  },
  setPredictTime (state, payload) {
    let time = 0;
    const setTime = parseFloat(payload.time) / 1000;

    if (state.predictTime[payload.network]) {
      time = state.predictTime[payload.network];
    }

    state.predictTime[payload.network] = ((setTime + parseFloat(time)) / 2).toFixed(2);
    // state.predictTime.push({ id: state.predictTime.length + 1, value: parseFloat(payload).toFixed(2)})
  },
}

const actions = {
  updateTrainTime ({ commit }, data) {
    commit('setTrainTime', data)
  },
  updatePredictTime ({ commit }, data) {
    commit('setPredictTime', data)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
