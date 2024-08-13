const forms = document.querySelectorAll('form')
export function isFormValid (formElement) {
  validateForm(formElement)
  const invalidFields = formElement.querySelectorAll('.validation--error')
  return invalidFields.length === 0
}
export function validateForms () {
  forms.forEach(form => {
    const requiredFields = form.querySelectorAll('[required]')

    requiredFields.forEach(field => {
      const fieldParent = field.parentElement

      field.addEventListener('blur', () => {
        toggleValidationError(field, fieldParent)
      })
    })
  })
}

function validateForm (form) {
  const fields = form.querySelectorAll('[required]')
  fields.forEach(field => {
    const fieldParent = field.parentElement
    toggleValidationError(field, fieldParent)
  })
}
function toggleValidationError (field, fieldParent) {
  const isFieldValid = field.validity.valid

  if (!isFieldValid) {
    fieldParent.classList.add('validation--error')
  } else {
    fieldParent.classList.remove('validation--error')
  }
}
