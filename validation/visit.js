const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateVisitInput(data) {
  let errors = {}

  // Make sure field is not empty
  data.transdate  = !isEmpty(data.transdate ) ? data.transdate  : ''
  data.visit_time = !isEmpty(data.visit_time) ? data.visit_time : ''
  data.complaint = !isEmpty(data.complaint) ? data.complaint : ''
  data.d_ssn = !isEmpty(data.d_ssn) ? data.d_ssn : ''
  data.dept_id = !isEmpty(data.dept_id) ? data.dept_id : ''

  // Send message for empty field
  if (Validator.isEmpty(data.transdate)) {
    errors.transdate= 'Date is required'
  }
  if (Validator.isEmpty(data.visit_time)) {
    errors.visit_time = 'Morgue visit time is required'
  }
  if (Validator.isEmpty(data.complaint)) {
    errors.complaint = 'Patient complaint is required'
  }
  if (Validator.isEmpty(data.d_ssn)) {
    errors.d_ssn = 'Doctor name is required'
  }
  if (Validator.isEmpty(data.dept_id)) {
    errors.dept_id = 'Depart id name is required'
  }


  return {
    errors,
    isValid: isEmpty(errors)
  }
}