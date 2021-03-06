const mongoose=require('mongoose');

const string_required={
    type:String,
    required:true,
    trim:true
}
const reservationSchema=new mongoose.Schema({
    customer_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Customer'
    },
    res_date:{
        type:Date,
        required:true
    },
    no_of_guests:{
        type:Number
    },
    table_no:{
        type:Number,
        required:true
    }
    
})


const Reservation=mongoose.model('Reservation',reservationSchema)

module.exports=Reservation