const mongoose=require('mongoose');

const string_required={
    type:String,
    required:true,
    trim:true
}
const tableSchema=new mongoose.Schema({
    table_no:{
        type:Number,
        required:true
    },
    capacity:{
        type:Number,
        required:true
    }
    
})


const Table=mongoose.model('Table',tableSchema)

module.exports=Table