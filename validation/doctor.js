const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateDoctorInput(data) {
  let errors = {}

  // Make sure field is not empty
  data.d_ssn = !isEmpty(data.d_ssn) ? data.d_ssn : ''
  data.d_name = !isEmpty(data.d_name) ? data.d_name : ''
  data.phone = !isEmpty(data.phone) ? data.phone : ''

  // Send message for empty field
  if (Validator.isEmpty(data.d_ssn)) {
    errors.d_ssn = 'Doctor id is required'
  }
  if (Validator.isEmpty(data.d_name)) {
    errors.d_name = 'Doctor name is required'
  }

  if (Validator.isEmpty(data.phone)) {
    errors.phone = 'Doctor phone is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}