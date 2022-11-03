const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateBillInput(data) {
  let errors = {}

  // Make sure field is not empty: use our isEmpty() function
  data.transdate = !isEmpty(data.transdate) ? data.transdate : ''
  data.service_offered = !isEmpty(data.service_offered) ? data.service_offered : ''
  data.p_ssn = !isEmpty(data.p_ssn) ? data.p_ssn : ''
  data.bill_amount = !isEmpty(data.bill_amount) ? data.bill_amount : ''
  data.d_ssn = !isEmpty(data.d_ssn) ? data.d_ssn : ''


  // Send message for empty field: use Validator.isEmpty()
  if (Validator.isEmpty(data.transdate)) {
    errors.transdate= 'Date is required'
  }
  if (Validator.isEmpty(data.service_offered)) {
    errors.service_offered = 'service offered is required'
  }
  if (Validator.isEmpty(data.p_ssn)) {
    errors.p_ssn = 'Patient id is required'
  }
  if (Validator.isEmpty(data.bill_amount)) {
    errors.bill_amount = 'Billed amount is required'
  }
  if (Validator.isEmpty(data.d_ssn)) {
    errors.d_ssn = 'Doctor name is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
