const mongoose = require('mongoose')

const planSchema = new mongoose.Schema(
    {
        destination: {
            type:String,
            required:true
        },
        startDate:{
            type:Date
        } ,
        endDate:{
            type:Date
        },
        activities:{
            type:Array,
            required:true
        }
    }
)

const Plan = mongoose.model('plans', planSchema)

module.exports = Plan