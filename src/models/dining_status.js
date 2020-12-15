
const mongoose = require('mongoose');

const diningSchema = new mongoose.Schema({
    status:{
        type:Number,
        default:1
    }

})


const Dining = mongoose.model('Dining', diningSchema)

module.exports = Dining