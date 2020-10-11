var MongoClient = require('mongodb').MongoClient,
  f = require('util').format,
  fs = require('fs');

//Specify the Amazon DocumentDB cert
var ca = [fs.readFileSync("./cert/rds-combined-ca-bundle.pem")];

const PRIMARY = "mongodb://rahul:rahulkodoth@docdb-2020-10-10-08-45-24.c6jhpcbeair9.ap-southeast-2.docdb.amazonaws.com:27017/?ssl=true&retryWrites=false"
const REPLICA_1 = "mongodb://rahul:rahulkodoth@docdb-2020-10-10-08-45-242.c6jhpcbeair9.ap-southeast-2.docdb.amazonaws.com:27017/?ssl=true&retryWrites=false"
const REPLICA_2 = "mongodb://rahul:rahulkodoth@docdb-2020-10-10-08-45-242.c6jhpcbeair9.ap-southeast-2.docdb.amazonaws.com:27017/?ssl=true&retryWrites=false"
const REPLICA_3 = "mongodb://rahul:rahulkodoth@docdb-2020-10-10-08-45-242.c6jhpcbeair9.ap-southeast-2.docdb.amazonaws.com:27017/?ssl=true&retryWrites=false"


function connect(url) {
  return MongoClient.connect(url, { 
    sslValidate: true,
    sslCA:ca,
    useNewUrlParser: true
  }).then(client => client)
}

module.exports = async function() {
  let databases = await Promise.all([connect(PRIMARY), connect(REPLICA_1), connect(REPLICA_2), connect(REPLICA_3)])

  return {
    PRIMARY: databases[0],
    REPLICA_1: databases[1], 
    REPLICA_2: databases[2],
    REPLICA_3: databases[3]
  }
}

