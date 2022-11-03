const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

// Load validation
const validateBedInput = require('../../validation/bed')
const Bed = require('../../models/Bed')
const User = require('../../models/User')

// @route Get api/bed/test
// Desc Test for bed routes
// Access Public
router.get('/test', (req, res) => res.json({
  msg: 'bed works'
}))

//*************** Bed Modules ******************************************
// @route Get api/bed/all
// Desc Get all bed
// Access Public
router.get('/all', (req, res) => {
  console.log('I am in all bed')
  const errors = {}

  Bed.find()
    //.populate('user', 'bed')
    .then(bed => {
      if (!bed) {
        console.log('In  if (!bed) {')
        errors.nobed = 'There are no bed'
        res.status(404).json(errors)
      }
      console.log('In  I have got it')
      res.json(bed)
      console.log('fixed bed returned')
    })
    .catch(err => res.status(404).json({
      msg: 'There are no bed'
    }))
})


// @route POST api/bed
// Desc Add bed
// Access Private
router.post('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  console.log('I am in post bed')
  const {
    errors,
    isValid
  } = validateBedInput(req.body)

  // Check validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors)
  }

  // Get fields
  const bedFields = {}
  //bedFields.user = req.user.id

  console.log('in bed backend')

  if (req.body.bed_no) bedFields.bed_no = req.body.bed_no
  if (req.body.bed_type) bedFields.bed_type = req.body.bed_type
  if (req.body.ward_id) bedFields.ward_id = req.body.ward_id
  if (req.body.status) bedFields.status = req.body.status

  new bed(bedFields)
    .save()
    .then(bed => res.json(bed))
    .catch(err => console.log(err))
})

// @route DELETE api/bed/:bed_id
// Desc Delete bed
// Access Private
router.delete('/:bed_id',
  passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    // console.log('req.user.id: ' + req.user.id)
    // console.log('req.params.bed_id: ' + req.params.bed_id)

    ///*  Bed.findOne({
    //  user: req.user.id
    // })
    // .then(bed => { */
    Bed.findById(req.params.bed_id)
      .then(bed => {
        // check for post owner
        if (bed.user.toString() !== req.user.id) {
          return res.status(401).json({
            notauthorised: 'User not authorised'
          })
        }

        // Delete
        bed.remove().then(() => res.json({
          success: true
        }))
      })
      .catch(err => res.status(404).json({
        bednotfound: 'No bed found'
      }))
    // })
  })


// ************************End of Location**************************

module.exports = router