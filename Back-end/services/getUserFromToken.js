const jwt = require("jsonwebtoken")
const UserModel = require("../models/user")

// async function getUserFromToken(token){
//     //do something
// }


const getUserFromToken = async (token) => {
    if(!token){
        return {
            message : "session out",
            logout : true,
        }
    }

    const decodeToken = jwt.verify(token, process.env.JWT_SECREAT_KEY)

    const user = await UserModel.findById(decodeToken.id).select('-password')

    return user
}

module.exports = getUserFromToken