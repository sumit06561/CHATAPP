const UserModel = require("../models/user")
const getUserFromToken = require("../services/getUserFromToken")

async function updateUserDetails(req, res){
    try {
        const token = req.cookies?.token || ""

        const user = await getUserFromToken(token)

        const {name, profile_pic} = req.body

        await UserModel.updateOne({_id: user._id}, {$set: {
            name,
            profile_pic
        }})

        const userInfomation = await UserModel.findById(user._id)

        return res.json({
            message : "user update successfully",
            data : userInfomation,
            success : true
        })
        
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true
        })
    }
}

module.exports = updateUserDetails