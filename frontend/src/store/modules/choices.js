import choice from '../../services/choice'
import ErrorService from '../../services/error'

// initial state
const state = {
  choicesSaved: [],
  history: []
}

// getters
const getters = {
  getChoicesSaved: (state) => {
    return state.choicesSaved
  },
  getHistory: (state) => {
    return state.history
  },
}

// actions
const actions = {
  async getChoicesSaved({ commit }, data) {
    try {
      const response = await choice.get(data)
      if (response && response.data.length) {
        let data = response.data[0].choices
        if (data) {
          return commit('set', { key: 'choicesSaved', items: data })
        }
      }
    } catch (error) {
      ErrorService.onError(error)
    }
  },

  async save({ dispatch }, data) {
    try {
      if (data.length) {
        await choice.save(data)
        await dispatch('getChoicesSaved')
      }
    } catch (error) {
      ErrorService.onError(error)
    }
  },

  // getHistory() {
  //   try {
  //     const response = await subject.get()
  //     if (response && response.data) {
  //       let data = response.data
  //       data = data.map(el => el.title)
  //       return commit('set', { key: 'items', items: data })
  //     }
  //   } catch (error) {
  //     ErrorService.onError(error)
  //   }
  // }
}

// mutations
const mutations = {

  set(state, { key, items }) {
    state[key] = items
  },

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
