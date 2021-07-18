import choice from '../../services/choice'
import ErrorService from '../../services/error'
import util from '../../common/util'

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
        await dispatch('getChoicesSaved', { start: util.getDateNow() })
      }
    } catch (error) {
      ErrorService.onError(error)
    }
  },

  async getHistory({ commit }, data) {
    try {
      const response = await choice.get(data)
      if (response && response.data.length) {
        let data = response.data
        if (data) {
          return commit('set', { key: 'history', items: data })
        }
      }
    } catch (error) {
      ErrorService.onError(error)
    }
  }
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
