const express = require("express")
const router = express.Router()
const authorization = require("../middleware/authorization")
const userController = require('../controllers/users')

router.get('/userinfo', authorization, userController.getUserInfo)

router.get('/publicuserinfo/:id', userController.getPublicUserInfo)

router.put('/userphoto', authorization, userController.putUserPhoto)

router.put('/usercoverphoto', authorization, userController.putCoverPhoto)

router.put('/userabout', authorization, userController.putAboutText)

module.exports = router