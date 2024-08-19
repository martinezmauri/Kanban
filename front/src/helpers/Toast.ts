import Swal from "sweetalert2";

export const createToast = () => {
  // : typeof Swal
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });
  return Toast;
};
