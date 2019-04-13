const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/*
module.exports = class Order {
    constructor(body) {
        this.size = body.size,
        this.crust = body.crust,
        this.qty = body.qty,
        this.topping = body.topping,
        this.firstName = body.firstName;
        this.lastName = body.lastName;
        this.phone = body.phone;
        this.address = body.address;
        this.total = body.total;
    }
}
*/

//defining Order schema for mongodb
const orderSchema = new Schema({
    size: String,
    crust: String,
    qty: Number,
    topping: Array,
    firstName: String,
    lastName: String,
    phone: String,
    address: String,
    total: Number,
    createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
