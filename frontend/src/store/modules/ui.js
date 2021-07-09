const state = () => ({
  dark: false,
})

// getters
const getters = {
  getDark: (state) => {
    return state.dark
  }
}

// actions
const actions = {
  setDark ({ commit, state }) {
    commit('toggleDark', !state.dark)
  },
}

// mutations
const mutations = {
  toggleDark (state, payload) {
    state.dark = payload
  },

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
