const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Create Schema
const DrawerSchema = new Schema({
  drawer_no: {
    type: String,
    required: true
  },
  drawer_type: {
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

module.exports = Drawer = mongoose.model('drawers', DrawerSchema)