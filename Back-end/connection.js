const mongoose = require("mongoose")

async function mongoConnection(url){
    return mongoose.connect(url)
    // try {
    //     await mongoose.connect(url)

    //     const connection = mongoose.connection

    //     connection.on('connected',()=>{
    //         console.log("Connect to DB......:)")
    //     })

    //     connection.on('error',(error)=>{
    //         console.log("Something is wrong in mongodb ",error)
    //     })
    // } catch (error) {
    //     console.log("Something is wrong ",error)
    // }
}

module.exports = mongoConnection