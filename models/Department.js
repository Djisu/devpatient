const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Create Schema
const DepartmentSchema = new Schema({
  dept_id: {
    type: String,
    required: true
  },
  dept_name: {
    type: String,
    required: true
  }
})

module.exports = Department = mongoose.model('departments', DepartmentSchema)