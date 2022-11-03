const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Create schema
const PatientSchema = new Schema({
  p_ssn: {
    type: String,
    required: true
  },
  p_name: {
    type: String,
    required: true
  },
  birthdate: {
    type: Date,
    required: true
  },
  phone: {
    type: String
  },
  address: {
    type: String
  },
  nhis_no: {
    type: String,
    required: true
  },
  nhis_flag: {
    type: String,
    required: true
  },
  deathdate: {
    type: Date
  },
  deathtime: {
    type: Date
  },
  deathcauses: [{
    transdate: {
      type: Date,
      default: Date.now
    },
    visit_time: {
      type: Date,
      default: Date.now
    },
    d_name: {
      type: String,
    },
    causesofdeath: {
      type: String
    }
  }],
  patientpayments: [{
    transdate: {
      type: Date,
      default: Date.now
    },
    particulars: {
      type: String
    },
    payment_amount: {
      type: Number
    },
    dept_id: {
      type: String
    },
    nhis_amount: {
      type: Number
    },
    d_ssn: {
      type: String
    }
  }],
  prescription: [{
    transdate: {
      type: Date,
      required: true
    },
    medicine_quantity: {
      type: Number,
      required: true
    },
    medicine_name: {
      type: String,
      required: true
    },
    d_ssn: {
      type: String,
      required: true
    }
  }],
  morgue: [{
    transdate: {
      type: Date,
      required: true
    },
    visit_time: {
      type: Date,
      required: true
    },
    drawer_no: {
      type: String,
      required: true
    }
  }],
  visit: [{
    transdate: {
      type: Date,
      required: true
    },
    visit_time: {
      type: Date
    },
    complaint: [{
      type: String,
      required: true
    }],
    d_ssn: {
      type: String,
      required: true
    },
    dept_id: {
      type: String,
      required: true
    }
  }],
  insco_id: {
    type: String,
    required: true
  },
  bill: [{
    transdate: {
      type: Date,
      required: true
    },
    service_offered: {
      type: String,
      required: true
    },
    p_ssn: {
      type: String,
      required: true
    },
    bill_amount: {
      type: Number,
      required: true
    },
    d_ssn: {
      type: String,
      required: true
    }
  }]
})
module.exports = Patient = mongoose.model('patients', PatientSchema)
