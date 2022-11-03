const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

// Load validation
const validateDoctorInput = require('../../validation/doctor')
const Doctor = require('../../models/Doctor')
const User = require('../../models/User')

// @route Get api/doctor/test
// Desc Test for doctor routes
// Access Public
router.get('/test', (req, res) => res.json({
  msg: 'doctor works'
}))

//*************** doctor Modules ******************************************
// @route Get api/doctor/all
// Desc Get all doctor
// Access Public
router.get('/all', (req, res) => {
  console.log('I am in all doctor')
  const errors = {}

  Doctor.find()
    //.populate('user', 'doctor')
    .then(doctor => {
      if (!doctor) {
        console.log('In  if (!doctor) {')
        errors.nodoctor = 'There are no doctor'
        res.status(404).json(errors)
      }
      console.log('In  I have got it')
      res.json(doctor)
      console.log('doctor returned')
    })
    .catch(err => res.status(404).json({
      msg: 'There are no doctor'
    }))
})


// @route POST api/doctor
// Desc Add doctor
// Access Private
router.post('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  console.log('I am in post doctor')
  const {
    errors,
    isValid
  } = validateDoctorInput(req.body)

  // Check validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors)
  }

  // Get fields
  const doctorFields = {}
  doctorFields.user = req.user.id

  console.log('in doctor backend')

  if (req.body.d_ssn) doctorFields.d_ssn = req.body.d_ssn
  if (req.body.d_name) doctorFields.d_name = req.body.d_name
  if (req.body.phone) doctorFields.phone = req.body.phone

  new doctor(doctorFields)
    .save()
    .then(doctor => res.json(doctor))
    .catch(err => console.log(err))

})

// @route DELETE api/doctor/:doc_id
// Desc Delete doctor
// Access Private
router.delete('/:doc_id',
  passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    // console.log('req.user.id: ' + req.user.id)
    // console.log('req.params.doc_id: ' + req.params.doc_id)

    // Doctor.findOne({
    //     user: req.user.id
    //   })
    //   .then(doctor => {
    Doctor.findById(req.params.doc_id)
      .then(doctor => {
        // check for post owner
        if (doctor.user.toString() !== req.user.id) {
          return res.status(401).json({
            notauthorised: 'User not authorised'
          })
        }

        // Delete
        doctor.remove().then(() => res.json({
          success: true
        }))
      })
      .catch(err => res.status(404).json({
        doctornotfound: 'No doctor found'
      }))
  })
//})


// ************************End of doctor**************************

module.exports = router