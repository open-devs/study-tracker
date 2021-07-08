import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default class ErrorService {
  constructor() {
    // this.initHandler();
  }

  static onError(error) {
    const response = error.response;
    if (response && response.status >= 400 && response.status < 405) {
      ErrorService.apiError(error.response.data);
      return false;
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

  static displayErrorAlert(message) {
    Swal.fire({
      title: "Error!",
      text: message,
      icon: "error",
    });
  }

  static normalError(error) {
    console.log(error);
    this.displayErrorAlert(error.message);
  }

  static apiError(error) {
    console.log(error);
    this.displayErrorAlert(error.message);
  }
}
