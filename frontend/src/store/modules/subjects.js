import subject from '../../services/subject'
import ErrorService from '../../services/error'

// initial state
const state = {
  items: [],
  selectedValues: [],
}

// getters
const getters = {
  get: (state) => {
    return state.items
  },
  getSelected: (state) => {
    return state.selectedValues
  },
}

// actions
const actions = {
  async get({ commit }) {
    try {
      const response = await subject.get()
      if (response && response.data) {
        let data = response.data
        data = data.map(el => el.title)
        return commit('set', { key: 'items', items: data })
      }
    } catch (error) {
      ErrorService.onError(error)
    }
  },

  async save({ dispatch, state }, data) {
    try {
      let subjectData = data.filter(el => !state.items.includes(el.toLowerCase()))
      if (subjectData.length) {
        await subject.save(subjectData)
        await dispatch('get')
      }
    } catch (error) {
      ErrorService.onError(error)
    }
  },

  saveSelected({ commit }, data) {
    return commit('set', { key: 'selectedValues', items: data })
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
