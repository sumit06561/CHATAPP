const UserModel = require("../models/user")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

async function loginUser(req, res){
    try {
        const {email, password} = req.body;

        //Login Details are provide or not
        if(!email || !password){
            return res.status(400).json({
                message : "Please provide email and password",
                error : true
            })
        }

        // Check user exist or not, using email
        const user = await UserModel.findOne({email})

        if(!user){
            return res.status(400).json({
                message : "user not exit",
                error : true
            })
        }

        //After checking email, check password
        const verifyPassword = await bcryptjs.compare(password, user.password)

        if(!verifyPassword){
            return res.status(400).json({
                message : "Please check password",
                error : true
            })
        }

        //After user verified, generate token, using jwt
        const tokenData = {
            id : user._id,
            email : user.email 
        }

        const token = jwt.sign(tokenData, process.env.JWT_SECREAT_KEY, { expiresIn : '2d'})

        const cookieOptions = {
            http : true,
            secure : true
        }

        return res.cookie('token', token, cookieOptions).status(200).json({
            message : "Login successfully",
            token : token,
            success :true
        })


    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true
        })
    }
}

module.exports = loginUser