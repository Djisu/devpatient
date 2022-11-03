const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateProfileInput(data) {
  let errors = {}

  data.telephoneno = !isEmpty(data.telephoneno) ? data.telephoneno : ''
  data.email = !isEmpty(data.email) ? data.email : ''
  data.department = !isEmpty(data.department) ? data.department : ''
  data.title = !isEmpty(data.title) ? data.title : ''
  data.accessRight = !isEmpty(data.accessRight) ? data.accessRight : ''


  // Handle
  if (!Validator.isLength(data.handle, {
      min: 2,
      max: 40
    })) {
    errors.handle = 'Handle needs to be between 2 and 40 characters'
  }

  if (Validator.isEmpty(data.telephoneno)) {
    errors.telephoneno = 'Telephone number is required'
  }

  // email
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email address is required'
  }

  // department
  if (Validator.isEmpty(data.department)) {
    errors.department = 'Department field is required'
  }

  // title
  if (Validator.isEmpty(data.title)) {
    errors.title = 'User employment title is required'
  }

  // accessRight
  if (Validator.isEmpty(data.accessRight)) {
    errors.accessRight = 'User access right is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}