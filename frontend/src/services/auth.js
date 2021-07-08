import http from "../common/axios";
import ErrorService from './error'

const AuthService =  Object.freeze({
  signup: async (data) => {
    try {
      return await http.get("/auth/signup", data);
    } catch (error) {
      return ErrorService.onError(error)
    }
  },

  login: async (data) => {
    try {
      return await http.post("/auth/login", data);
    } catch (error) {
      return ErrorService.onError(error)
    }
  },

})

export default AuthService;
