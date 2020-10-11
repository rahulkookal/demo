var MongoClient = require('mongodb').MongoClient,
  f = require('util').format,
  fs = require('fs');

//Specify the Amazon DocumentDB cert
var ca = [fs.readFileSync("./cert/rds-combined-ca-bundle.pem")];

//Create a MongoDB client, open a connection to Amazon DocumentDB as a replica set, 
//  and specify the read preference as secondary preferred
let con;
const init = function() {
  MongoClient.connect(
    'mongodb://rahul:rahulkodoth@docdb-2020-10-10-08-45-24.cluster-c6jhpcbeair9.ap-southeast-2.docdb.amazonaws.com:27017/?ssl=true&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false', 
    { 
      sslValidate: true,
      sslCA:ca,
      useNewUrlParser: true
    }
    ,
    function(err, client) {
        if(err)
            throw err;

            con = client
        // let db = client.db('customer_1')
        // col = db.collection('users');
        // col.insertOne({'hello':'Amazon DocumentDB'}, function(err, result){
        //   console.log("updated")
        //   console.log(result)
        // })
    })
    //.then((client) => con = client);

}
const insertUser = (user) => {
  let db = con.db('customer_1')
      col = db.collection('users');
      return col.insertOne({'hello':'Amazon DocumentDB'})
}
module.exports = { init, insertUser }

