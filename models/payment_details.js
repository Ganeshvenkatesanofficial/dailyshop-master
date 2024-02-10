const mongoose = require('mongoose')
const schema = mongoose.Schema;

let paymentSchema = new schema({
    paymentid: {
        type: String,
        index: true,
    },
    payment_id: {
        type: String,
        index: true,
    },
    orderid:{
        type: String,
    },
    signature:{
        type: String
    },
    date: {
        type: String,
        default: new Date()
    },
    amount: {
        type: Number, 
        required: true
    },
    success_status: {
        type:Boolean,
        default:false
    }
},
{
    timestamps:true
})

paymentModel=mongoose.model('payment_details',paymentSchema)

module.exports=paymentModel