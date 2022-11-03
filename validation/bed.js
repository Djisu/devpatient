const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateBedInput(data) {
  let errors = {}

  // Make sure field is not empty: use our isEmpty() function
  data.bed_no = !isEmpty(data.bed_no) ? data.bed_no : ''
  data.bed_type = !isEmpty(data.bed_type) ? data.bed_type : ''
  data.ward_id = !isEmpty(data.ward_id) ? data.ward_id : ''
  data.status = !isEmpty(data.status) ? data.status : ''


  // Send message for empty field: use Validator.isEmpty()
  if (Validator.isEmpty(data.bed_no)) {
    errors.bed_no = 'Bed number is required'
  }
  if (Validator.isEmpty(data.bed_type)) {
    errors.bed_type = 'Bed type is required'
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