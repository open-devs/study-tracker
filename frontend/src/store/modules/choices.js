import choice from '../../services/choice'
import ErrorService from '../../services/error'

// initial state
const state = {
  choicesSelected: [],
  choicesSaved: [],
  history: []
}

// getters
const getters = {
  getChoicesSelected: (state) => {
    return state.choicesSelected
  },
  getChoicesSaved: (state) => {
    return state.choicesSaved
  },
  getHistory: (state) => {
    return state.history
  },
}

// actions
const actions = {
  async getChoicesSaved({ commit }) {
    try {
      const today = new Date()
      const response = await choice.get({ start: new Date(`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`) })
      if (response && response.data) {
        let data = response.data
        data = data.map(el => el.title)
        return commit('set', { key: 'choicesSaved', items: data })
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
