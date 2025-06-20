import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

function notification(message, type) {
  toast(message, {
    type: type,
    hideProgressBar: true,
    transition: "zoom",
    dangerouslyHTMLString: true,
  });
}

export default notification;
