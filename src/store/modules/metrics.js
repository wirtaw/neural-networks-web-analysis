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
    const id = `${payload.network}-${payload.model.name}`;
    const setTime = parseFloat(payload.time) / 1000;

    if (!state.trainTime[id]) {
      state.trainTime[id] = {};
    }

    if (state.trainTime[id] && state.trainTime[id].time) {
      time = state.trainTime[id].time;
    } else {
      state.trainTime[id].model = {...payload.model};
    }

    state.trainTime[id].time = ((setTime + parseFloat(time)) / 2).toFixed(2);
    // state.trainTime.push({ id: state.trainTime.length + 1, value: parseFloat(payload).toFixed(2)})
  },
  setPredictTime (state, payload) {
    let time = 0;
    const id = `${payload.network}-${payload.model.name}`;
    const setTime = parseFloat(payload.time) / 1000;

    if (!state.predictTime[id]) {
      state.predictTime[id] = {};
    }

    if (state.predictTime[id] && state.predictTime[id].time) {
      time = state.predictTime[id].time;
    } else {
      state.predictTime[id].model = {...payload.model};
    }

    state.predictTime[id].time = ((setTime + parseFloat(time)) / 2).toFixed(2);
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
