import http from "../common/axios"
import ErrorService from './error'
import util from '../common/util'

const ChoiceService = Object.freeze({
  get: async (params) => {
    try {
      return await http.get("/choice", { ...util.getHeader(), params })
    } catch (error) {
      return ErrorService.onError(error)
    }
  },

  save: async (data) => {
    try {
      return await http.post("/choice", data, util.getHeader())
    } catch (error) {
      return ErrorService.onError(error)
    }
  },

})

export default ChoiceService
