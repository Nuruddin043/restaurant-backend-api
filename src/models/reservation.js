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
    res_time:{
        ...string_required
    },
    res_date:{
        ...string_required
    },
    no_of_guests:{
        ...string_required
    },
    table_no:{
        type:Number,
        required:true
    }
    
})


const Reservation=mongoose.model('Reservation',reservationSchema)

module.exports=Reservation