import AlertService from './alert'
import router from '../router'
export default class ErrorService {
  constructor() {
    // this.initHandler();
  }

  static onError(error) {
    const response = error.response;
    if (response) {
      if (response.status === 401) {
        ErrorService.apiError(error.response.data);
        localStorage.clear();
        router.push('/')
        return false;
      } else if (response.status >= 400 && response.status < 405) {
        ErrorService.apiError(error.response.data);
        return false;
      }
    }
    ErrorService.normalError(error);
  }

  static onWarn(error) {
    this.normalError(error);
  }

  static onInfo(error) {
    this.apiError(error);
  }

  static initHandler() {
    const scope = this;
    window.onerror = (message, url, lineNo, columnNo, error) => {
      if (error) {
        scope.onError(error);
        console.log(message, url, lineNo, columnNo, error);
      }
    };
  }


  static normalError(error) {
    console.log(error);
    AlertService.displayAlert("Error!", error.message, "error");
  }

  static apiError(error) {
    console.log(error);
    AlertService.displayAlert("Error!", error.message, "error");
  }
}
