import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default Object.freeze({
  displayAlert: (title, text, icon) => {
    Swal.fire({
      title,
      text,
      icon,
    });
  }
})
