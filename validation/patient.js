const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validatePatientInput(data) {
  let errors = {}

  // Make sure field is not empty
  data.p_ssn = !isEmpty(data.p_ssn) ? data.p_ssn : ''
  data.p_name = !isEmpty(data.p_name) ? data.p_name : ''
  data.birthdate = !isEmpty(data.birthdate) ? data.birthdate : ''
  data.nhis_no = !isEmpty(data.nhis_no) ? data.nhis_no : ''
  data.nhis_flag = !isEmpty(data.nhis_flag) ? data.nhis_flag : ''
  data.insco_id = !isEmpty(data.insco_id) ? data.insco_id : ''

  // Send message for empty field
  if (Validator.isEmpty(data.p_ssn)) {
    errors.p_ssn = 'Patient id is required'
  }
  if (Validator.isEmpty(data.p_name)) {
    errors.p_name = 'Doctor name is required'
  }

  if (Validator.isEmpty(data.birthdate)) {
    errors.birthdate = 'Patient date of birth is required'
  }
  if (Validator.isEmpty(data.nhis_no)) {
    errors.nhis_no = 'Nhis number is required'
  }
  if (Validator.isEmpty(data.nhis_flag)) {
    errors.nhis_flag = 'Nhis flag is required'
  }

  if (Validator.isEmpty(data.insco_id)) {
    errors.insco_id = 'Insurance company of the nhis is required'
  }




  return {
    errors,
    isValid: isEmpty(errors)
  }
}