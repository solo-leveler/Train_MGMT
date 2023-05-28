const express = require('express');
const router = express.Router();
const ticketModel = require ('../models/ticketModel')
const app = express()  
const mongoose = require('mongoose');
const TicketSchema = require('../models/ticketModel') 

router.get('/bookTrainTickets', function (req, res) {
  const newticket = new ticketModel({
                seatNo: '1',
                status : 'Booked',
                row: 1
    });

  newticket.save(function (err, data) {
      if (err) {
          console.log(error);
      }
      else {
          res.send("Data inserted");
      }
  });
  
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