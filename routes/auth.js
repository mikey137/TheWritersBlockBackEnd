const express = require("express")
const router = express.Router()
const validInfo = require("../middleware/validinfo")
const authorization = require("../middleware/authorization")
const auth = require("../controllers/auth")

router.post("/checkusername", auth.checkUsername)

router.post("/checkemail", auth.checkEmail)

router.post("/register", validInfo, auth.register)

router.post("/login", validInfo, auth.login)

router.get("/is-verify", authorization, auth.verify)

module.exports = router