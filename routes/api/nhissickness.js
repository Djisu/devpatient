const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

// Load validation
const validateNhissicknessInput = require('../../validation/nhissickness')
const Nhissickness = require('../../models/Nhissickness')
const User = require('../../models/User')

// @route Get api/nhissickness/test
// Desc Test for nhissickness routes
// Access Public
router.get('/test', (req, res) => res.json({
  msg: 'nhissickness works'
}))

//*************** nhissickness Modules ******************************************
// @route Get api/nhissickness/all
// Desc Get all nhissickness
// Access Public
router.get('/all', (req, res) => {
  console.log('I am in all nhissickness')
  const errors = {}

  Nhissickness.find()
    //.populate('user', 'nhissickness')
    .then(nhissickness => {
      if (!nhissickness) {
        console.log('In  if (!nhissickness) {')
        errors.nonhissickness = 'There are no nhissickness'
        res.status(404).json(errors)
      }
      console.log('In  I have got it')
      res.json(nhissickness)
      console.log('nhissickness returned')
    })
    .catch(err => res.status(404).json({
      msg: 'There are no nhissickness'
    }))
})


// @route POST api/nhissickness
// Desc Add nhissickness
// Access Private
router.post('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  console.log('I am in post nhissickness')
  const {
    errors,
    isValid
  } = validateNhissicknessInput(req.body)

  // Check validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors)
  }

  // Get fields
  const nhissicknessFields = {}
  nhissicknessFields.user = req.user.id

  console.log('in nhissickness backend')

  if (req.body.sicknessname) nhissicknessFields.sicknessname = req.body.sicknessname

  new nhissickness(nhissicknessFields)
    .save()
    .then(nhissickness => res.json(nhissickness))
    .catch(err => console.log(err))

})

// @route DELETE api/nhissickness/:nhi_id
// Desc Delete nhissickness
// Access Private
router.delete('/:nhi_id',
  passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    // console.log('req.user.id: ' + req.user.id)
    // console.log('req.params.nhi_id: ' + req.params.nhi_id)

    // Nhissickness.findOne({
    //     user: req.user.id
    //   })
    //   .then(nhissickness => {
        Nhissickness.findById(req.params.dep_id)
          .then(nhissickness => {
            // check for post owner
            if (nhissickness.user.toString() !== req.user.id) {
              return res.status(401).json({
                notauthorised: 'User not authorised'
              })
            }

            // Delete
            nhissickness.remove().then(() => res.json({
              success: true
            }))
          })
          .catch(err => res.status(404).json({
            dnhissicknessnotfound: 'No nhissickness found'
          }))
      })
  //})


// ************************End of nhissickness**************************

module.exports = router