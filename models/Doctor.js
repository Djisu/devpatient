const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Create Schema
const DoctorSchema = new Schema({
  d_ssn: {
    type: String,
    required: true
  },
  d_name: {
    type: String,
    required: true
  },
  birthdate: {
    type: Date
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String
  }
})

module.exports = Doctor = mongoose.model('doctors', DoctorSchema)