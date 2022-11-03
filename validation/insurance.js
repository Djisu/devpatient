const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateInsuranceInput(data) {
  let errors = {}

  //console.log('data.name is : ' + data.name)
  // Make sure field is not empty
  data.insco_id = !isEmpty(data.insco_id) ? data.insco_id : ''
  data.insco_name = !isEmpty(data.insco_name) ? data.insco_name : ''
  data.category = !isEmpty(data.category) ? data.category : ''
  data.phone = !isEmpty(data.phone) ? data.phone : ''
  data.address = !isEmpty(data.address) ? data.address : ''
  data.nhis_percent = !isEmpty(data.nhis_percent) ? data.nhis_percent : 0


  // Send message for empty field
  if (Validator.isEmpty(data.insco_id)) {
    errors.insco_id = 'Insurance company id is required'
  }
  if (Validator.isEmpty(data.insco_name)) {
    errors.insco_name = 'Insurance company name is required'
  }
  if (Validator.isEmpty(data.category)) {
    errors.category = 'Category is required'
  }
  if (Validator.isEmpty(data.phone)) {
    errors.phone = 'Phone number company id is required'
  }
  if (Validator.isEmpty(data.address)) {
    errors.address = 'Insurance company address is required'
  }
  if (Validator.isEmpty(data.nhis_percent)) {
    errors.nhis_percent = 'National insurance percentage is required'
  }


  return {
    errors,
    isValid: isEmpty(errors)
  }
}