import Swal from "sweetalert2";

const SmallAlert = Swal.mixin({
  toast: true,
  position: "top-end",
  width: "450",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: false,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export function smallAlert(icon, message) {
  return SmallAlert.fire({
    icon: icon,
    title: message,
  });
}

export function errorAlert(message) {
  return Swal.fire({
    title: "Error!",
    text: message,
    icon: "error",
    confirmButtonText: "OK",
    confirmButtonColor: "#743ad5",
  });
}

export function warningAlert(title, message) {
  return Swal.fire({
    title: title,
    text: message,
    icon: "warning",
    confirmButtonText: "OK",
    confirmButtonColor: "#743ad5",
  });
}
