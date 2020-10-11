var MongoClient = require('mongodb').MongoClient,
  f = require('util').format,
  fs = require('fs');

//Specify the Amazon DocumentDB cert
var ca = [fs.readFileSync("./cert/rds-combined-ca-bundle.pem")];

//Create a MongoDB client, open a connection to Amazon DocumentDB as a replica set, 
//  and specify the read preference as secondary preferred
// let con;
// const init = function() {
//   MongoClient.connect(
//     'mongodb://rahul:rahulkodoth@docdb-2020-10-10-08-45-24.cluster-c6jhpcbeair9.ap-southeast-2.docdb.amazonaws.com:27017/?ssl=true&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false', 
//     { 
//       sslValidate: true,
//       sslCA:ca,
//       useNewUrlParser: true
//     }
//     ,
//     function(err, client) {
//         if(err)
//             throw err;
//             console.log("Connection created")
//             con =  client
        // let db = client.db('customer_1')
        // col = db.collection('users');
        // col.insertOne({'hello':'Amazon DocumentDB'}, function(err, result){
        //   console.log("ee")
        //   console.log(result)
    //     // })
    // }
    // )
    // .then((client) => con = client);

// }
// const insertUser = (req, res) => {
//   let db = con.db('customer_1')
//       col = db.collection('users');
//       col.insertOne({'hello':'Amazon DocumentDB'}, function(err, result){
//         console.log("ee")
//         console.log(result)
//       })
// }
// module.exports = { init, insertUser }


const PRIMARY = "mongodb://rahul:rahulkodoth@docdb-2020-10-10-08-45-24.cluster-c6jhpcbeair9.ap-southeast-2.docdb.amazonaws.com:27017/?ssl=true&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false"
const REPLICA_1 = "mongodb://rahul:rahulkodoth@docdb-2020-10-10-08-45-24.cluster-c6jhpcbeair9.ap-southeast-2.docdb.amazonaws.com:27017/?ssl=true&replicaSet=rs1&readPreference=secondaryPreferred&retryWrites=false"

function connect(url) {
  return MongoClient.connect(url, { 
    sslValidate: true,
    sslCA:ca,
    useNewUrlParser: true
  }).then(client => client)
}

module.exports = async function() {
  let databases = await Promise.all([connect(PRIMARY), connect(REPLICA_1)])

  return {
    PRIMARY: databases[0],
    REPLICA_1: databases[1]
  }
}

