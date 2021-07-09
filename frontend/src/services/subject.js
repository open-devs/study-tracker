import http from "../common/axios";
import ErrorService from './error'

const getHeaders = () => ({ headers: { 'Authorization': `Bearer ${localStorage.getItem('bearer')}`, } });

const AuthService =  Object.freeze({
  get: async () => {
    try {
      return await http.get("/subject", getHeaders());
    } catch (error) {
      return ErrorService.onError(error)
    }
  },

  save: async (data) => {
    try {
      return await http.post("/subject", data, getHeaders());
    } catch (error) {
      return ErrorService.onError(error)
    }
  },

})

export default AuthService;
