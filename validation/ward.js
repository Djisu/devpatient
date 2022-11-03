const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateWardInput(data) {
  let errors = {}

  // Make sure field is not empty
  data.ward_id = !isEmpty(data.ward_id) ? data.ward_id : ''
  data.ward_name = !isEmpty(data.ward_name) ? data.ward_name : ''
  data.ward_gender = !isEmpty(data.ward_gender) ? data.ward_gender : ''

  // Send message for empty field
  if (Validator.isEmpty(data.ward_id)) {
    errors.ward_id = 'Ward id is required'
  }
  if (Validator.isEmpty(data.ward_name)) {
    errors.ward_name = 'Ward name is required'
  }

  if (Validator.isEmpty(data.ward_gender)) {
    errors.ward_gender = 'Ward gender is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}