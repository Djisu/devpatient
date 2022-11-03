const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const path = require('path')

const bed = require('./routes/api/bed');
const department = require('./routes/api/department');
const doctor = require('./routes/api/doctor');
const drawer= require('./routes/api/drawer');
const insurance = require('./routes/api/insurance');
const nhissickness = require('./routes/api/nhissickness');
const patient = require('./routes/api/patient');
const profile = require('./routes/api/profile');
const users = require('./routes/api/users');
const ward = require('./routes/api/ward');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

// DB Config: we need the mongoDB keys for connection purposes
const db = require('./config/keys').mongoURI

// Connect to MongoDB
mongoose
  .connect(db,
    { useNewUrlParser: true })
  .then(() => console.log('Mongodb connected'))
  .catch(err => console.log(err))

// Passport middleware
app.use(passport.initialize())

// Passport Config
require('./config/passport')(passport)

//Use routes
app.use('/api/bed', bed)
app.use('/api/department', department)
app.use('/api/doctor', doctor)
app.use('/api/drawer', drawer)
app.use('/api/insurance', insurance)
app.use('/api/nhissickness', nhissickness)
app.use('/api/patient', patient)
app.use('/api/profile', profile)
app.use('/api/users', users)
app.use('/api/ward', ward)

// Serve static assets if in production
if(process.env.NODE_ENV === 'production'){
  // Set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server running on port ${port}`))