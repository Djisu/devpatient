const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

// Load validation
const validatePatientInput = require('../../validation/patient')
const validateDeathcausesInput = require('../../validation/deathcauses')
const validatePatientpaymentsInput = require('../../validation/patientpayments')
const validatePrescriptionInput = require('../../validation/prescription')
const validateMorgueInput = require('../../validation/morgue')
const validateVisitInput = require('../../validation/visit')
const validateBillInput = require('../../validation/bill')

const Patient = require('../../models/patient')
const User = require('../../models/User')

// @route Get api/patient/test
// Desc Test for patient routes
// Access Public
router.get('/test', (req, res) => res.json({
  msg: 'patient works'
}))

//*************** patient Modules ******************************************
// @route Get api/patient/all
// Desc Get all patient
// Access Public
router.get('/all', (req, res) => {
  console.log('I am in all patient')
  const errors = {}

  Patient.find()
    //.populate('user', 'patient')
    .then(patient => {
      if (!patient) {
        console.log('In  if (!patient) {')
        errors.nopatient = 'There are no patient'
        res.status(404).json(errors)
      }
      console.log('In  I have got it')
      res.json(patient)
      console.log('patient returned')
    })
    .catch(err => res.status(404).json({
      msg: 'There are no patient'
    }))
})


// @route POST api/patient
// Desc Add patient
// Access Private
router.post('/', passport.authenticate('jwt', {
      session: false
    }), (req, res) => {
      console.log('I am in post patient')
      const {
        errors,
        isValid
      } = validatePatientInput(req.body)

      // Check validation
      if (!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors)
      }

      // Get fields
      const patientFields = {}
     // patientFields.user = req.user.id

      console.log('in patient backend')

      if (req.body.p_ssn) patientFields.p_ssn = req.body.p_ssn
      if (req.body.p_name) patientFields.p_name = req.body.p_name
      if (req.body.birthdate) patientFields.birthdate = req.body.birthdate
      if (req.body.nhis_no) patientFields.nhis_no = req.body.nhis_no
      if (req.body.nhis_flag) patientFields.nhis_flag = req.body.nhis_flag
      if (req.body.insco_id) patientFields.insco_id = req.body.insco_id

      new patient(patientFields)
        .save()
        .then(patient => res.json(patient))
        .catch(err => console.log(err))
})

// @route DELETE api/patient/:pat_id
// Desc Delete patient
// Access Private
router.delete('/:pat_id',
    passport.authenticate('jwt', {
      session: false
    }), (req, res) => {
    // console.log('req.user.id: ' + req.user.id)
    // console.log('req.params.pat_id: ' + req.params.pat_id)

    // Patient.findOne({
    //     user: req.user.id
    //   })
    //   .then(patient => {
        Patient.findById(req.params.pat_id)
          .then(patient => {
            // check for post owner
            if (patient.user.toString() !== req.user.id) {
              return res.status(401).json({
                notauthorised: 'User not authorised'
              })
            }

            // Delete
            patient.remove().then(() => res.json({
              success: true
            }))
          })
          .catch(err => res.status(404).json({
            patientnotfound: 'No patient found'
          }))
      })
  //})

//****************Patient extentions: deathcauses *****************************************/
// @routepost api/patient/deathcauses
// @desc Add  deathcauses to profile
// @access public
router.post('/deathcauses', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateDeathcausesInput(req.body)
  // Check validation
  if (!isValid) {
    // Return any with errors status
    return res.status(400).json(errors)
  }
 //****************************************************************************************************

console.log('About to start')
//Patient.findOne({ user: req.user.id })
Patient.findById(req.params.pat_id)
  .then(patient => {
    const newDeathcause = {
        transdate : req.body.transdate,
        visit_time : req.body.visit_time,
        d_name : req.body.d_name,
        causesofdeath : req.body.causesofdeath
    }

    // Add to the deathcause array
    patient.deathcauses.unshift(newDeathcause)
    patient.save().then(patient => res.json(patient))
    })
  .catch(err => res.json(err))

  console.log('End')
    //*****************************End************************************************** */
});


// @route DELETE api/patient/deathcauses/:pat_id
// @desc  Delete deathcauses from patient
// @access private
router.delete('/deathcauses/:pat_id', passport.authenticate('jwt', { session: false }),
(req, res) => {
  Patient.findById(req.params.pat_id).then(patient => {
    // Get remove index
    const removeIndex = patient.deathcauses
      .map(item => item.id)
      .indexOf(req.params.pat_id)

     // Splice out of array
     patient.deathcauses.splice(removeIndex, 1)

    // Save
    patient.save().then(patient => res.json(patient))
  })
})
// ************************End of patient extention**************************


//****************Patient extentions: patientpayments  *****************************************/
// @routepost api/patient/patientpayments
// @desc Add  patientpayments  to patient
// @access public
router.post('/patientpayments', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validatePatientpaymentsInput(req.body)
  // Check validation
  if (!isValid) {
    // Return any with errors status
    return res.status(400).json(errors)
  }

 //****************************************************************************************************

console.log('About to start')
Patient.findById(req.params.pat_id)
  .then(patient => {
    const newPatientpayments = {
        transdate : req.body.transdate,
        particulars : req.body.particulars,
        payment_amount : req.body.payment_amount,
        dept_id : req.body.dept_id,
        nhis_amount : req.body.nhis_amount
    }

    // Add to the deathcause array
    patient.patientpayments.unshift(newPatientpayments)
    patient.save().then(patient => res.json(patient))
    })
  .catch(err => res.json(err))

  console.log('End')
    //******************************************************************************* */
});


// @route DELETE api/patient/patientpayments/:pat_id
// @desc  Delete patientpayments from patient
// @access private
router.delete('/patientpayments/:pat_id', passport.authenticate('jwt', { session: false }),
(req, res) => {
  Patient.findById(req.params.pat_id).then(patient => {
    // Get remove index
    const removeIndex = patient.patientpayments
      .map(item => item.id)
      .indexOf(req.params.pat_id)

     // Splice out of array
     patient.patientpayments.splice(removeIndex, 1)

    // Save
    patient.save().then(patient => res.json(patient))
  })
})
// ************************End of patient extention**************************


//****************Patient extentions: prescription  *****************************************/
// @routepost api/patient/prescription
// @desc Add  prescription  to patient
// @access public
router.post('/prescription', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validatePrescriptionInput(req.body)
  // Check validation
  if (!isValid) {
    // Return any with errors status
    return res.status(400).json(errors)
  }

 //****************************************************************************************************

console.log('About to start')
Patient.findById(req.params.pat_id)
  .then(patient => {
    const newPrescription = {
      transdate : req.body.transdate,
      medicine_quantity : req.body.medicine_quantity,
      medicine_name : req.body.medicine_name,
      d_ssn : req.body.d_ssn
    }

    // Add to the fixedassets array
    patient.prescription.unshift(newPrescription)
    patient.save().then(patient => res.json(patient))
    })
  .catch(err => res.json(err))

  console.log('End')
    //******************************************************************************* */
});


// @route DELETE api/patient/prescription/:pat_id
// @desc  Delete prescription from patient
// @access private
router.delete('/prescription/:pat_id', passport.authenticate('jwt', { session: false }),
(req, res) => {
  Patient.findById(req.params.pat_id).then(patient => {
    // Get remove index
    const removeIndex = patient.prescription
      .map(item => item.id)
      .indexOf(req.params.pat_id)

     // Splice out of array
     patient.prescription.splice(removeIndex, 1)

    // Save
    patient.save().then(patient => res.json(patient))
  })
})
// ************************End of patient extention**************************



//****************Patient extentions: morgue  *****************************************/
// @routepost api/patient/morgue
// @desc Add  morgue  to patient
// @access public
router.post('/morgue', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateMorgueInput(req.body)
  // Check validation
  if (!isValid) {
    // Return any with errors status
    return res.status(400).json(errors)
  }

 //****************************************************************************************************

console.log('About to start')
Patient.findById(req.params.pat_id)
  .then(patient => {
    const newMorgue = {
      transdate : req.body.transdate,
      visit_time : req.body.visit_time,
      drawer_no : req.body.drawer_no
    }

    // Add to the morgue array
    patient.prescription.unshift(newMorgue)
    patient.save().then(patient => res.json(patient))
    })
  .catch(err => res.json(err))

  console.log('End')
    //******************************************************************************* */
});


// @route DELETE api/patient/morgue/:pat_id
// @desc  Delete morgue from patient
// @access private
router.delete('/morgue/:pat_id', passport.authenticate('jwt', { session: false }),
(req, res) => {
  Patient.findById(req.params.pat_id).then(patient => {
    // Get remove index
    const removeIndex = patient.morgue
      .map(item => item.id)
      .indexOf(req.params.pat_id)

     // Splice out of array
     patient.morgue.splice(removeIndex, 1)

    // Save
    patient.save().then(patient => res.json(patient))
  })
})
// ************************End of patient extention**************************


//****************Patient extentions: visit  *****************************************/
// @routepost api/patient/visit
// @desc Add  visit  to patient
// @access public
router.post('/visit', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateVisitInput(req.body)
  // Check validation
  if (!isValid) {
    // Return any with errors status
    return res.status(400).json(errors)
  }

 //****************************************************************************************************

console.log('About to start')
Patient.findById(req.params.visit_id)
  .then(patient => {
    const newVisit = {
      visit_id: req.body.visit_id,
      transdate : req.body.transdate,
      visit_time : req.body.visit_time,
      drawer_no : req.body.drawer_no
    }

    // Add to the visit array
    patient.prescription.unshift(newVisit)
    patient.save().then(patient => res.json(patient))
    })
  .catch(err => res.json(err))

  console.log('End')
    //******************************************************************************* */
});


// @route DELETE api/patient/visit/:visit_id
// @desc  Delete visit from patient
// @access private
router.delete('/morgue/:visit_id', passport.authenticate('jwt', { session: false }),
(req, res) => {
  Patient.findById(req.params.visit_id).then(patient => {
    // Get remove index
    const removeIndex = patient.morgue
      .map(item => item.id)
      .indexOf(req.params.visit_id)

     // Splice out of array
     patient.morgue.splice(removeIndex, 1)

    // Save
    patient.save().then(patient => res.json(patient))
  })
})
// ************************End of patient extention**************************






  //****************Patient extentions: bill  *****************************************/
  // @routepost api/patient/bill
  // @desc Add  bill  to patient
  // @access public
  router.post('/bill', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateBillInput(req.body)
    // Check validation
    if (!isValid) {
      // Return any with errors status
      return res.status(400).json(errors)
    }

   //****************************************************************************************************
   Patient.findById(req.params.bill_id)
    .then(patient => {
      const newBill = {
        bill_id: req.body.bill_id,
        transdate: req.body.transdate,
        service_offered: req.body.service_offered,
        p_ssn: req.body.p_ssn,
        bill_amount: req.body.bill_amount,
        d_ssn: req.body.d_ssn
      }

      // Add to the newBill array
      patient.bill.unshift(newBill)
      patient.save().then(patient => res.json(patient))
      })
    .catch(err => res.json(err))

    console.log('End')
      //******************************************************************************* */
  });


  // @route DELETE api/patient/bill/:bill_id
  // @desc  Delete bill from patient
  // @access private
  router.delete('/bill/:bill_id', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Patient.findById(req.params.bill_id).then(patient => {
      // Get remove index

      const removeIndex = patient.bill
        .map(item => item.id)
        .indexOf(req.params.bill_id)

       // Splice out of array
       patient.visit.splice(removeIndex, 1)

      // Save
      patient.save().then(patient => res.json(patient))
    })


// ************************End of patient extention**************************
})

module.exports = router
