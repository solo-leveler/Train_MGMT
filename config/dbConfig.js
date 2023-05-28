
//const { MongoClient, ServerApiVersion } = require('mongodb');
//const uri = "mongodb+srv://admin_sample:nE9n8wDI2Ou7b9es@personalcluster.ybzwi0c.mongodb.net/TRAIN_MGMT/?retryWrites=true&w=majority&ssl=true";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
    
//     // Send a ping to confirm a successful connection
//     await client.db("ticket_coll").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

const  MongoClient  = require('mongodb').MongoClient
const assert = require('assert');
const dbName = 'TRAIN_MGMT';
let dbConnection
const uri = "mongodb+srv://admin_sample:nE9n8wDI2Ou7b9es@personalcluster.ybzwi0c.mongodb.net/TRAIN_MGMT?retryWrites=true&w=majority";
module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect(uri)
      .then(client => {
        //assert.equal(null,err)
        dbConnection = client.db(dbName)
        client.close()
        return cb()
        
      })
      .catch(err => {
        console.log(err)
        return cb(err)
      })
  },
  getDb: () => dbConnection
}


