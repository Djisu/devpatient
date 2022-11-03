const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validatePrescriptionInput(data) {
  let errors = {}

  // Make sure field is not empty: use our isEmpty() function
  data.transdate = !isEmpty(data.transdate) ? data.transdate : ''
  data.medicine_quantity = !isEmpty(data.medicine_quantity) ? data.medicine_quantity : ''
  data.medicine_name = !isEmpty(data.medicine_name) ? data.medicine_name : ''
  data.d_ssn = !isEmpty(data.d_ssn) ? data.d_ssn : ''


  // Send message for empty field: use Validator.isEmpty()
  if (Validator.isEmpty(data.transdate)) {
    errors.transdate= 'Date is required'
  }
  if (Validator.isEmpty(data.medicine_quantity)) {
    errors.medicine_quantity = 'Quantity of medicine is required'
  }
  if (Validator.isEmpty(data.medicine_name)) {
    errors.medicine_name = 'medicine name is required'
  }
  if (Validator.isEmpty(data.d_ssn)) {
    errors.d_ssn = 'Doctor name is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}