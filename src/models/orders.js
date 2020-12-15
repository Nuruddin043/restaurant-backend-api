const mongoose=require('mongoose');

const string_required={
    type:String,
    required:true,
    trim:true
}
const orderSchema=new mongoose.Schema({
    customer_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Customer'
    },
    order_date:{
        type:Date,
        required:true
    },
    item_list: [{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Item'
    }]
    
})


const Order=mongoose.model('Order',orderSchema)

module.exports=Order