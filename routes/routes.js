const express = require('express');
const router = express.Router();
const app = express() 
const ticketModel = require('../models/ticketModel') 
const mongoose = require('mongoose');

router.post('/bookTrainTickets', async (req, res) => {
  try {
    let ticketsToUpdate = req.body;
    if (!Array.isArray(ticketsToUpdate)) {
      const singleTicket = ticketsToUpdate;
      ticketsToUpdate = [singleTicket];
    }
    const updatedTickets = [];
    //const ticketModel = mongoose.model('Ticket', TicketSchema);
    for (const ticket of ticketsToUpdate) {
      const { seatNo, row, status,bookedBy } = ticket;

      const updatedTicket = await ticketModel.findOneAndUpdate(
        { seatNo ,row },
        { $set: { status,bookedBy } },
        { new: true }
      );

      if (!updatedTicket) {
        return res.status(404).json({ success: false, message: `Ticket not found: ${ticketId}` });
      }

      updatedTickets.push(updatedTicket);
    }

    return res.status(200).json({ success: true,message: `Ticket Booked Successfully` });
  } catch (error) {
    console.error('Error updating tickets:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


router.get('/getTrainTickets', async function (req, res) {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    //mongoose.model('Tickets', TicketSchema);
    
    const ticket = await ticketModel.find().sort({ "seatNo" : 1});
    res.send(ticket);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});
module.exports =router