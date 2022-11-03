const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

// Load validation
const validateWardInput = require('../../validation/ward')
const Ward = require('../../models/Ward')
const User = require('../../models/User')

// @route Get api/ward/test
// Desc Test for ward routes
// Access Public
router.get('/test', (req, res) => res.json({
  msg: 'ward works'
}))

//*************** ward Modules ******************************************
// @route Get api/ward/all
// Desc Get all ward
// Access Public
router.get('/all', (req, res) => {
  console.log('I am in all ward')
  const errors = {}

  Ward.find()
    //.populate('user', 'ward')
    .then(ward => {
      if (!ward) {
        console.log('In  if (!ward) {')
        errors.noward = 'There are no ward'
        res.status(404).json(errors)
      }
      console.log('In  I have got it')
      res.json(ward)
      console.log('ward returned')
    })
    .catch(err => res.status(404).json({
      msg: 'There are no ward'
    }))
})


// @route POST api/ward
// Desc Add ward
// Access Private
router.post('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  console.log('I am in post ward')
  const {
    errors,
    isValid
  } = validateWardInput(req.body)

  // Check validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors)
  }

  // Get fields
  const wardFields = {}
  //wardFields.user = req.user.id

  console.log('in ward backend')

  if (req.body.ward_id) wardFields.ward_id = req.body.ward_id
  if (req.body.ward_name) wardFields.ward_name = req.body.ward_name
  if (req.body.ward_gender) drawerFields.ward_gender = req.body.ward_gender

  new ward(wardFields)
    .save()
    .then(ward => res.json(ward))
    .catch(err => console.log(err))

})

// @route DELETE api/ward/:dra_id
// Desc Delete ward
// Access Private
router.delete('/:war_id',
  passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    // console.log('req.user.id: ' + req.user.id)
    // console.log('req.params.war_id: ' + req.params.war_id)

    // Ward.findOne({
    //     user: req.user.id
    //   })
    //   .then(ward => {
    Ward.findById(req.params.war_id)
      .then(ward => {
        // check for post owner
        if (ward.user.toString() !== req.user.id) {
          return res.status(401).json({
            notauthorised: 'User not authorised'
          })
        }

        // Delete
        ward.remove().then(() => res.json({
          success: true
        }))
      })
      .catch(err => res.status(404).json({
        wardnotfound: 'No ward found'
      }))
  })
//})


// ************************End of ward**************************

module.exports = router