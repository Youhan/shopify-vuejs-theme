const state = {
  count: 0
};

const getters = {};

const mutations = {
  addOne: state => {
    state.count++;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations
};
