const express = require('express')
const registerUser = require('../controllers/registerUser')
const loginUser = require('../controllers/loginUser')
const userDetails = require('../controllers/userDetails')
const logout = require('../controllers/logout')
const updateUserDetails = require('../controllers/updateUserDetails')
const searchUser = require('../controllers/searchUser')

const router = express.Router()

//create user api or register user
router.post("/register", registerUser)
//login user
router.post("/login", loginUser)
//get userDetails
router.get("/userDetails", userDetails)
//user logout
router.get("/logout", logout)
//update userDetails
router.post("/updateUser", updateUserDetails)
//search user
router.post("/searchUser", searchUser)



//check user email
// router.post('/email',checkEmail)
// //check user password
// router.post('/password',checkPassword)
// //login user details
// router.get('/user-details',userDetails)
// //logout user
// router.get('/logout',logout)
// //update user details
// router.post('/update-user',updateUserDetails)
// //search user
// router.post("/search-user",searchUser)


module.exports = router