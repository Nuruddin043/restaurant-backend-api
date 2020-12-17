const mongoose=require('mongoose');

const string_required={
    type:String,
    required:true,
    trim:true
}
const itemSchema=new mongoose.Schema({
    item_name:{
        ...string_required
    },
    item_price:{
        type:Number,
        required:true
    },
    item_category:{
        ...string_required
    },
    item_details:{
        ...string_required
    },
    item_photo_data:{
        type:Buffer
    }
    
})



///to delete image data
itemSchema.methods.toJSON = function(){
    const item=this
    const itemObject= item.toObject()
    delete itemObject.item_photo_data
    return itemObject
}

const Item=mongoose.model('Item',itemSchema)

module.exports=Item