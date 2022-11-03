if (process.env.NODE_ENV === 'production') {
  // console.log('In production')
  module.exports = require('./keys_prod')
} else {
  // console.log('In development')
  module.exports = require('./keys_dev')
}





// module.exports = {
//   mongoURI: 'mongodb://Djisu:Timbuk2tu@ds123603.mlab.com:23603/devhospital'
// };