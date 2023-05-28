const express = require('express');
const router = express.Router();
const { getDb, connectToDb } = require('../config/dbConfig')
const ticket = require ('../models/ticketModel')
const app = express()   
let db

// router.get("/getTrainTickets",async(req,res)=>{
//     try {
//         const ticketVal = new ticket(
//           {
//             seatNo: '1',
//             status : 'Booked',
//             row: 1
//           }
//           )
//         await ticketVal.save()
//         res.status (200).send({message : "Records Fetched successfully", success:true })
//     } catch (error) {
//         console.log(error)
//         res.status (500).send({message : "Error", success:false })
//     }
// });
connectToDb((err) => {
    if(!err){
      app.listen('3000', () => {
        console.log('app listening on port 3000')
      })
      db = getDb()
    }
  })
router.get('/getTrainTickets', (req, res) => {
    // current page 
    let ticket = []
  
    db.collection('ticket_coll')
      .find({}).toArray()
      .then(() => {
        res.status(200).json(ticket)
      })
      .catch(() => {
        res.status(500).json({error: 'Could not fetch the documents'})
      })
  })
// router.post('/bookTicket',async(req,res)=>{
//     try {
//        const ticket = new ticket({ticketid: '1'})
//         await ticket.save()
//         res.status (200).send({message : "Records Fetched successfully", success:true })
//     } catch (error) {
//         console.log(error)
//         res.status (500).send({message : "Error", success:false }) 
//     }
// })
router.post('/bookTicket', (req, res) => {
    const book = req.body
  
    db.collection('ticket_coll')
      .insertOne(book)
      .then(result => {
        res.status(201).json(result)
      })
      .catch(err => {
        res.status(500).json({err: 'Could not create new document'})
      })
})
module.exports =router