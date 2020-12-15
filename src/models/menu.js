const mongoose = require('mongoose');

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
        item: {

            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Item'

        }
    }]

})


const Menu = mongoose.model('Menu', menuSchema)

module.exports = Menu