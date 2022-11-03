const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')


// Load validation
const validateProfileInput = require('../../validation/profile')
const Profile = require('../../models/Profile')
const User = require('../../models/User')

// @route Get api/profile/test
// Desc Test for profile routes
// Access Public
router.get('/test', (req, res) => res.json({
  msg: 'Profile works'
}))

// @route Get api/profile/all
// Desc Get all profile
// Access Public
router.get('/all', (req, res) => {
  console.log('I am in all')
  const errors = {}

  Profile.find()
    .populate('user', 'name avatar')
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = 'There are no profiles'
        res.status(404).json(errors)
      }
      console.log('profiles found')
      res.json(profiles)
    })
    .catch(err => res.status(404).json({
      msg: 'There are no profiles'
    }))
})



// @route Get api/profile
// Desc Get current user's profile
// Access Private
router.get('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  const errors = {}
  Profile.findOne({
      user: req.user.id
    })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user'
        return res.status(404).json(errors)
      }
      res.json(profile)
    })
    .catch(err => res.status(404).json(err))
})

// @route GET api/profile/handle/:handle
// @Get profile by handle
// @accesse public
router.get('/handle/:handle', (req, res) => {
  const errors = {}
  Profile.findOne({
      handle: req.params.handle
    })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user'
        return res.status(404).json(errors)
      }
      res.json(profile)
    })
    .catch(err => res.status(404).json(err))
})

// @route Get api/profile/user/:user_id
// Desc Get profile by user id
// Access Public
router.get('/user/:user_id', (req, res) => {
  const errors = {}
  Profile.findOne({
      user: req.params.user_id
    })
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user'
        return res.status(404).json(errors)
      }
      res.json(profile)
    })
    .catch(err => res.status(404).json({
      msg: 'There is no profile for this user'
    }))
})

// @route POST api/profile
// Desc Create/Update user's profile
// Access Private
router.post(
  '/',
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {
    const {
      errors,
      isValid
    } = validateProfileInput(req.body)

    // Check validation
    if (!isValid) {
      // Return any with errors status
      return res.status(400).json(errors)
    }

    // GET fields
    const profileFields = {}
    profileFields.user = req.user.id
    if (req.body.telephoneno) profileFields.telephoneno = req.body.telephoneno
    if (req.body.email) profileFields.email = req.body.email
    if (req.body.department) profileFields.department = req.body.department
    if (req.body.title) profileFields.title = req.body.title
    if (req.body.accessRight) profileFields.accessRight = req.body.accessRight

    Profile.findOne({
        user: req.user.id
      })
      .then(profile => {
        if (profile) {
          // Update profile
          Profile.findOneAndUpdate({
              user: req.user.id
            }, {
              $set: profileFields
            }, {
              new: true
            })
            .then(profile => res.json(profile))
            .catch(err => res.json(err))
        } else {
          // Create

          // Check if handle exists
          Profile.findOne({
            handle: profileFields.handle
          }).then(profile => {
            if (profile) {
              errors.handle = 'That handle already exists'
              res.status(400).json(errors)
            }

            // Save Profile
            new Profile(profileFields).save()
              .then(profile => res.json(profile))
              .catch(err => res.json(err))
          })
        }
      })
      .catch(err => res.json(err))
  }
)




// @route DELETE api/profile
// Desc Delete user and profile
// Access Private
router.delete('/',
  passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    Profile.findOneAndRemove({
        user: req.user.id
      })
      .then(() => {
        User.findOneAndRemove({
            _id: req.user.id
          })
          .then(() => res.json({
            success: true
          }))
      })
  })


module.exports = router