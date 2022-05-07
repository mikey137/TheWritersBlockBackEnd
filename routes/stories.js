const express = require("express")
const router = express.Router()
const authorization = require("../middleware/authorization")
const storiesController = require('../controllers/stories')

router.get("/getstory/:id", storiesController.getStory)

router.get("/mostviewed", storiesController.getMostViewed)

router.get("/mystories/:id", storiesController.getMyStories)

router.get("/neweststories", storiesController.getNewest)

router.post("/createstory",authorization, storiesController.createStory )

router.delete("/deletestory", authorization, storiesController.deleteStory)

router.put("/likestory/:id", storiesController.likeStory )

router.put("/viewstory/:id", storiesController.viewStory)

router.put("/editstory", authorization, storiesController.editStory)

module.exports = router