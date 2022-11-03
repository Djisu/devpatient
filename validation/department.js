const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateDepartmentInput (data) {
  let errors = {}

  // Make sure field is not empty
  data.department_id = !isEmpty(data.department_id) ? data.department_id : ''
  data.department_name = !isEmpty(data.department_name) ? data.department_name : ''

  // Send message for empty field
  if (Validator.isEmpty(data.department_id)) {
    errors.department_id = 'Department id is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
