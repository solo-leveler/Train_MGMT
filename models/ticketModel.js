const moongoose = require('mongoose');

const TicketSchema = new moongoose.Schema(
    {
        seatNo : {
            type: String,
            required : true
        },
        status : {
            type: String,
            required : true
        },
        row :{
            type : Number,
            required : true
        }
    },
        {
            timestamps : true
        },
    
)

const ticketModel = moongoose.model("Tickets", TicketSchema);

module.exports = ticketModel