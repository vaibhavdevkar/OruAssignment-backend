const  mongoose = require("mongoose");

const Sample_data = mongoose.Schema({
    "id": {
        type: Number,
        require: true
    },
    "first_name":{
        type: String,
        require: true
    },
    "last_name": {
        type: String,
        require: true
    },
    "email": {
        type: String,
        require: true
    },
    "gender": {
        type: String,
        require: true  
    },
    "income": {
        type: String,
        require: true  
    },
    "city": {
        type: String,
        require: true  
    },
    "car": {
        type: String,
        require: true  
    },
    "phone_price": {
        type: String,
        require: true  
    }
})

 const Data = mongoose.model("Data", Sample_data )

module.exports = Data