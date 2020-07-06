const state = {
  modelTime: {},
  predictAccuracy: {},
}

const getters = {

}

const mutations = {
  setTrainTime (state, payload) {
    let time = 0;
    const id = `${payload.network}-${payload.model.name}`;
    const setTime = parseFloat(payload.time) / 1000;

    if (!state.modelTime[id]) {
      state.modelTime[id] = {...payload.model};
    }

    if (state.modelTime[id].learnTime) {
      time = state.modelTime[id].learnTime;
    }

    state.modelTime[id].learnTime = (time > 0) ? ((setTime + parseFloat(time)) / 2).toFixed(2) : setTime.toFixed(2);
    // state.trainTime.push({ id: state.trainTime.length + 1, value: parseFloat(payload).toFixed(2)})
  },
  setPredictTime (state, payload) {
    let time = 0;
    const id = `${payload.network}-${payload.model.name}`;
    const setTime = parseFloat(payload.time) / 1000;

    if (!state.modelTime[id]) {
      state.modelTime[id] = {...payload.model};
    }

    if (state.modelTime[id].predictTime) {
      time = state.modelTime[id].predictTime;
    }

    state.modelTime[id].predictTime = (time > 0) ? ((setTime + parseFloat(time)) / 2).toFixed(2) : setTime.toFixed(2);
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
