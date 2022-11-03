const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

// Load validation
const validateInsuranceInput = require('../../validation/insurance')
const Insurance = require('../../models/Insurance')
const User = require('../../models/User')

// @route Get api/insurance/test
// Desc Test for insurance routes
// Access Public
router.get('/test', (req, res) => res.json({
  msg: 'insurance works'
}))

//*************** insurance Modules ******************************************
// @route Get api/insurance/all
// Desc Get all insurance
// Access Public
router.get('/all', (req, res) => {
  console.log('I am in all insurance')
  const errors = {}

  Insurance.find()
    //.populate('user', 'insurance')
    .then(insurance => {
      if (!insurance) {
        console.log('In  if (!insurance) {')
        errors.noinsurance = 'There are no insurance'
        res.status(404).json(errors)
      }
      console.log('In  I have got it')
      res.json(insurance)
      console.log('insurance returned')
    })
    .catch(err => res.status(404).json({
      msg: 'There are no insurance'
    }))
})


// @route POST api/insurance
// Desc Add insurance
// Access Private
router.post('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  console.log('I am in post insurance')
  const {
    errors,
    isValid
  } = validateInsuranceInput(req.body)

  // Check validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors)
  }

  // Get fields
  const insuranceFields = {}
  insuranceFields.user = req.user.id

  console.log('in insurance backend')

  if (req.body.insco_id) drawerFields.insco_id = req.body.insco_id
  if (req.body.insco_name) drawerFields.insco_name = req.body.insco_name
  if (req.body.category) drawerFields.category = req.body.category
  if (req.body.phone) drawerFields.phone = req.body.phone
  if (req.body.address) drawerFields.address = req.body.address
  if (req.body.nhis_percent) drawerFields.nhis_percent = req.body.nhis_percent

  new insurance(insuranceFields)
    .save()
    .then(insurance => res.json(insurance))
    .catch(err => console.log(err))

})

// @route DELETE api/insurance/:ins_id
// Desc Delete insurance
// Access Private
router.delete('/:ins_id',
  passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    // console.log('req.user.id: ' + req.user.id)
    // console.log('req.params.ins_id: ' + req.params.ins_id)

    // Insurance.findOne({
    //     user: req.user.id
    //   })
    //   .then(insurance => {
    Insurance.findById(req.params.ins_id)
      .then(insurance => {
        // check for post owner
        if (insurance.user.toString() !== req.user.id) {
          return res.status(401).json({
            notauthorised: 'User not authorised'
          })
        }

        // Delete
        insurance.remove().then(() => res.json({
          success: true
        }))
      })
      .catch(err => res.status(404).json({
        insurancenotfound: 'No insurance found'
      }))
  })
// })


// ************************End of insurance**************************

module.exports = router