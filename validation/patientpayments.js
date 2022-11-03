const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validatePatientpaymentsInput(data) {
  let errors = {}

  // Make sure field is not empty: use our isEmpty() function
  data.transdate = !isEmpty(data.transdate) ? data.transdate : ''
  data.particulars = !isEmpty(data.particulars) ? data.particulars : ''
  data.payment_amount = !isEmpty(data.payment_amount) ? data.payment_amount : ''
  data.dept_id = !isEmpty(data.dept_id) ? data.dept_id : ''
  data.nhis_amount = !isEmpty(data.nhis_amount) ? data.nhis_amount : ''
  data.d_ssn = !isEmpty(data.d_ssn) ? data.d_ssn : ''

  // Send message for empty field: use Validator.isEmpty()
  if (Validator.isEmpty(data.transdate)) {
    errors.transdate= 'Date is required'
  }
  if (Validator.isEmpty(data.particulars)) {
    errors.particulars = 'Transaction details is required'
  }
  if (Validator.isEmpty(data.payment_amount)) {
    errors.payment_amount = 'Amount paid is required'
  }
  if (Validator.isEmpty(data.dept_id)) {
    errors.dept_id = 'Transaction department is required'
  }
  if (Validator.isEmpty(data.nhis_amount)) {
    errors.nhis_amount = 'Nhis amount in the payment is required'
  }
  if (Validator.isEmpty(data.d_ssn)) {
    errors.d_ssn = 'Officer/doctor id is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
