import http from "../common/axios"
import ErrorService from './error'
import util from '../common/util'

const AuthService = Object.freeze({
  get: async () => {
    try {
      return await http.get("/subject", util.getHeader())
    } catch (error) {
      return ErrorService.onError(error)
    }
  },

  save: async (data) => {
    try {
      return await http.post("/subject", data, util.getHeader())
    } catch (error) {
      return ErrorService.onError(error)
    }
  },

})

export default AuthService
