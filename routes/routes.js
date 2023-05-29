const express = require('express');
const router = express.Router();
const ticketModel = require ('../models/ticketModel')
const app = express()  
const mongoose = require('mongoose');
const TicketSchema = require('../models/ticketModel') 

router.get('/bookTrainTickets', async function (req, res) {
  const newticket = new ticketModel(req.body);
  try{
    await mongoose.connect(process.env.MONGO_URL);
    mongoose.model('Tickets', TicketSchema);
    re.body.forEach(async element => {
      const ticket = await mongoose.model('Tickets').findOneAndUpdate({
        seatNo: req.body.seatNo,
        row: req.body.row
      },{
        $set: {
          status:"booked"
        }
      });
      
    });
    res.status(200).send('Booked Successfully!!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
  
  
});

router.get('/getTrainTickets', async function (req, res) {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    mongoose.model('Tickets', TicketSchema);
    
    const ticket = await mongoose.model('Tickets').find();
    res.send(ticket);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});
module.exports =router