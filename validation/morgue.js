const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateMorgueInput(data) {
  let errors = {}

  // Make sure field is not empty
  data.transdate  = !isEmpty(data.transdate ) ? data.transdate  : ''
  data.visit_time = !isEmpty(data.visit_time) ? data.visit_time : ''
  data.drawer_no = !isEmpty(data.drawer_no) ? data.drawer_no : ''

  // Send message for empty field
  if (Validator.isEmpty(data.transdate)) {
    errors.transdate= 'Date is required'
  }
  if (Validator.isEmpty(data.visit_time)) {
    errors.visit_time = 'Morgue visit time is required'
  }
  if (Validator.isEmpty(data.drawer_no)) {
    errors.drawer_no = 'Morgue drawer number is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}