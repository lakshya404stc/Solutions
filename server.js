const express = require("express")
const app = express()
require("dotenv").config()
const morgan = require("morgan")
const authRoutes = require("./routes/authRoutes")
const cors = require("cors")

//db connection
const connectionDB = require("./config/db")
connectionDB()

//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

//routes
app.use("/api/v1/auth",authRoutes)

// server listen 
app.listen(process.env.PORT,()=>{
    console.log(`listening at port :${process.env.PORT}`)
})

