const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateDrawerInput(data) {
  let errors = {}

  // Make sure field is not empty
  data.drawer_no = !isEmpty(data.drawer_no) ? data.drawer_no : ''
  data.drawer_type = !isEmpty(data.drawer_type) ? data.drawer_type : ''
  data.ward_id = !isEmpty(data.ward_id) ? data.ward_id : ''
  data.status = !isEmpty(data.status) ? data.status : ''

  // Send message for empty field
  if (Validator.isEmpty(data.drawer_no)) {
    errors.drawer_no = 'Drawer number is required'
  }
  if (Validator.isEmpty(data.drawer_type)) {
    errors.drawer_type = 'Drawer type is required'
  }
  if (Validator.isEmpty(data.ward_id)) {
    errors.ward_id = 'Ward id is required'
  }
  if (Validator.isEmpty(data.status)) {
    errors.status = 'Status is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}