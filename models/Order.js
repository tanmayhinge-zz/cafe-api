const { model, Schema } = require('mongoose');

const orderSchema = new Schema({
    item: String,
    username: String,
    createdAt: String,

    user: {

        type: Schema.Types.ObjectId,
        ref: 'users'

    }
})

module.exports = model('Order', orderSchema);