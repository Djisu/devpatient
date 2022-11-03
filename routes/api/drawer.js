const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

// Load validation
const validateDrawerInput = require('../../validation/drawer')
const Drawer = require('../../models/Drawer')
const User = require('../../models/User')

// @route Get api/drawer/test
// Desc Test for drawer routes
// Access Public
router.get('/test', (req, res) => res.json({
  msg: 'drawer works'
}))

//*************** drawer Modules ******************************************
// @route Get api/drawer/all
// Desc Get all drawer
// Access Public
router.get('/all', (req, res) => {
  console.log('I am in all drawer')
  const errors = {}

  Drawer.find()
    //.populate('user', 'drawer')
    .then(drawer => {
      if (!drawer) {
        console.log('In  if (!drawer) {')
        errors.nodrawer = 'There are no drawer'
        res.status(404).json(errors)
      }
      console.log('In  I have got it')
      res.json(drawer)
      console.log('drawer returned')
    })
    .catch(err => res.status(404).json({
      msg: 'There are no drawer'
    }))
})


// @route POST api/drawer
// Desc Add drawer
// Access Private
router.post('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  console.log('I am in post drawer')
  const {
    errors,
    isValid
  } = validateDrawerInput(req.body)

  // Check validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors)
  }

  // Get fields
  const drawerFields = {}
  drawerFields.user = req.user.id

  console.log('in drawer backend')

  if (req.body.drawer_no) drawerFields.drawer_no = req.body.drawer_no
  if (req.body.drawer_type) drawerFields.drawer_type = req.body.drawer_type
  if (req.body.ward_id) drawerFields.ward_id = req.body.ward_id
  if (req.body.status) drawerFields.status = req.body.status

  new drawer(drawerFields)
    .save()
    .then(drawer => res.json(drawer))
    .catch(err => console.log(err))

})

// @route DELETE api/drawer/:dra_id
// Desc Delete drawer
// Access Private
router.delete('/:dra_id',
  passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    // console.log('req.user.id: ' + req.user.id)
    // console.log('req.params.dra_id: ' + req.params.dra_id)

    // Drawer.findOne({
    //     user: req.user.id
    //   })
    //   .then(drawer => {
    Drawer.findById(req.params.dra_id)
      .then(drawer => {
        // check for post owner
        if (drawer.user.toString() !== req.user.id) {
          return res.status(401).json({
            notauthorised: 'User not authorised'
          })
        }

        // Delete
        drawer.remove().then(() => res.json({
          success: true
        }))
      })
      .catch(err => res.status(404).json({
        drawernotfound: 'No drawer found'
      }))
  })
// })


// ************************End of drawer**************************

module.exports = router