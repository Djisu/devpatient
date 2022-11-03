const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateNhisicknessInput (data) {
  let errors = {}

  // Make sure field is not empty
  data.sicknessname = !isEmpty(data.sicknessname) ? data.sicknessname : ''

  // Send message for empty field
  if (Validator.isEmpty(data.sicknessname)) {
    errors.sicknessname = 'sicknessname is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
