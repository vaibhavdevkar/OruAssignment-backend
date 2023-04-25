const dotenv = require("dotenv").config()
const mongoose = require("mongoose")
const express = require("express")
const Data = require("./models/Datamodels")
// const Sample_data = require("./sample_data.json")
const  router  = require("./routes/Dataroutes")

const app = express()
app.use(express.json())

app.use(router)

//server production asseect 

const PORT = process.env.PORT || 5000

//connected database and also start server on port 5000
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT , () => {
            console.log(`Server is started is port ${PORT}`)
        })
    })
    .catch((err) => console.log(err))
