const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Create Schema
const NhissicknessSchema = new Schema({
  sicknessname: {
    type: String,
    required: true
  }
})

module.exports = Nhissickness = mongoose.model('nhissickness', NhissicknessSchema)