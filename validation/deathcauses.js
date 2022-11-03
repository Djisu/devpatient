const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateDeathcausesInput(data) {
  let errors = {}

  // Make sure field is not empty: use our isEmpty() function
  data.transdate = !isEmpty(data.transdate) ? data.transdate : ''
  data.visit_time = !isEmpty(data.visit_time) ? data.visit_time : ''
  data.d_name = !isEmpty(data.d_name) ? data.d_name : ''
  data.causesofdeath = !isEmpty(data.causesofdeath) ? data.causesofdeath : ''


  // Send message for empty field: use Validator.isEmpty()
  if (Validator.isEmpty(data.transdate)) {
    errors.transdate= 'Date is required'
  }
  if (Validator.isEmpty(data.visit_time)) {
    errors.visit_time = 'Death time is required'
  }
  if (Validator.isEmpty(data.d_name)) {
    errors.d_name = 'Doctor name is required'
  }
  if (Validator.isEmpty(data.causesofdeath)) {
    errors.causesofdeath = 'the cause of death is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}