const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Create Schema
const InsuranceSchema = new Schema({
  insco_id: {
    type: String,
    required: true
  },
  insco_name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  nhis_percent: {
    type: Number,
    required: true
  }
})

module.exports = Insurance = mongoose.model('insurance', InsuranceSchema)