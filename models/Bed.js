const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Create Schema
const BedSchema = new Schema({
  bed_no: {
    type: String,
    required: true
  },
  bed_type: {
    type: String,
    required: true
  },
  ward_id: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  }
})

module.exports = Bed = mongoose.model('beds', BedSchema)