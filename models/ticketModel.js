const moongoose = require('mongoose');

const TicketSchema = new moongoose.Schema(
    {
        seatNo : {
            type: Number,
            required : true
        },
        status : {
            type: String,
            required : true
        },
        row :{
            type : Number,
            required : true
        },
        bookedBy : {
            type: String,
            required : true
        }
    },
        {
            timestamps : true,
        },
    
)
// module.exports = async function run() {
//     await mongoose.connect(process.env.MONGO_URL);
//     const ticketModel = moongoose.model("Tickets", TicketSchema);
  
//     //await mongoose.model('Tickets').findOne(); // Works!
//     return ticketModel
// }    
const ticketModel = moongoose.model('Ticket', TicketSchema);
module.exports = ticketModel