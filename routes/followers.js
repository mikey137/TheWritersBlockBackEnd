const express = require("express")
const router = express.Router()
const authorization = require("../middleware/authorization")
const followersController = require('../controllers/followers')

router.post('/followuser', authorization, followersController.followUser)

router.post('/isfollowing', authorization, followersController.isFollowing)

router.get('/numberOfFollowers/:id', followersController.getNumberOfFollowers)

module.exports = router