const mongoose = require('mongoose');
const Item=require('../models/items')
const string_required = {
    type: String,
    required: true,
    trim: true
}
const menuSchema = new mongoose.Schema({
    menu_title: {
        ...string_required
    },
    item_list: [{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Item'
    }]

})


const Menu = mongoose.model('Menu', menuSchema)

module.exports = Menu