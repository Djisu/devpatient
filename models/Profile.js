const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create our Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  telephoneno: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  dateofbirth: {
    type: Date,
    default: Date.now
  },
  department: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  status: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  accessRight: {
    type: String,
    required: true
  }
})

module.exports = Profile = mongoose.model('profile', ProfileSchema)