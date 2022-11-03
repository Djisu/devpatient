const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Create Schema
const WardSchema = new Schema({
  ward_id: {
    type: String,
    required: true
  },
  ward_name: {
    type: String,
    required: true
  },
  ward_gender: {
    type: String,
    required: true
  }
})

module.exports = Ward = mongoose.model('wards', WardSchema)