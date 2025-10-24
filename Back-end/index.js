const express = require("express")
const cors = require("cors")
require("dotenv").config()
const cookieParser = require("cookie-parser")
const mongoConnection = require("./connection")
const userRoute = require("./routes/userWorking")
const {app, server} = require("./socket/index")

// const app = express()

mongoConnection(process.env.MONGODB_URI).then(() => {
    console.log(`mongoDB connected succesfully`)
})

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT || 5000

//routes
app.use("/api", userRoute)

server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})