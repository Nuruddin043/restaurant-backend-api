const mongoose=require('mongoose');

const string_required={
    type:String,
    required:true,
    trim:true
}
const billSchema=new mongoose.Schema({
    order_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Order'
    },
    total_price:{
        type:Number,
        required:true
    },
    tax:{
        type:Number,
        required:true
    },
    total_bill:{
        type:Number,
        required:true
    }
    
})


const Bill=mongoose.model('Bill',billSchema)

module.exports=Bill