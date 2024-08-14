export function SweetOk (title) {
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title,
    confirmButtonColor: '#27BE69',
    showConfirmButton: true,
    confirmButtonText: 'Aceptar',
    timer: 3000
  })
}
export function SweetError (title, text) {
  Swal.fire({
    position: 'top-end',
    icon: 'error',
    title,
    text,
    confirmButtonColor: '#F2415A',
    showConfirmButton: true
    // timer: 5000
  })
}
export function SweetWarning (title, text) {
  Swal.fire({
    position: 'top-end',
    icon: 'warning',
    title,
    text,
    confirmButtonColor: '#FFBF0F',
    showConfirmButton: true,
    confirmButtonText: 'Aceptar'
  })
}
