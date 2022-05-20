const pool = require("../db")
const bcrypt = require("bcrypt")
const jwtGenerator = require("../utils/jwtGenerator")

const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email])

        if(user.rows.length !== 0){
            return res.status(401).send("User Already Exists")
        }
        const salt = await bcrypt.genSalt(10)
        const bcryptPassword = await bcrypt.hash(password, salt)

        const newUser = await pool.query("INSERT INTO users(user_name, user_email, user_password, user_photo) VALUES ($1, $2, $3, 'https://img.favpng.com/25/13/19/samsung-galaxy-a8-a8-user-login-telephone-avatar-png-favpng-dqKEPfX7hPbc6SMVUCteANKwj.jpg') RETURNING *", [name, email, bcryptPassword])

        const token = jwtGenerator(newUser.rows[0].user_id)

        res.json({token})
        next()
    } catch (err) {
        console.error(err.message) 
        res.status(500).send("Server Error")
    }
}

const login = async (req, res) => {
    try{
        //1. destructure the req.body

        const {email, password} = req.body

        //2. check if user exists (if not then we throw error)

        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email])

        if(user.rows.length === 0){
            return res.status(401).json("Password or Email is incorrect")
        }

        //3. check if incomming password is the same as database password

        const validPassword = await bcrypt.compare(password, user.rows[0].user_password)

        if(!validPassword){
            return res.status(401).json("password or Email is incorrect")
        }

        //4. give jwtPassword

        const token = jwtGenerator(user.rows[0].user_id)

        res.json({token})

    }catch(err){
        console.error(err.message)
    }
}

const verify = async (req, res) => {
    try {
       res.json(true) 
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

const checkUsername = async (req, res) => {
    try {
        const username = req.body.name

        const isUsernameUnique = await pool.query(
            "SELECT exists (SELECT 1 FROM users WHERE user_name = $1 LIMIT 1)",[username]
        )
        res.json(isUsernameUnique.rows[0].exists)
    } catch (err) {
        console.error(err.message)
    }
}

const checkEmail = async (req, res) => {
    try {
        const email = req.body.email

        const isUsernameUnique = await pool.query(
            "SELECT exists (SELECT 1 FROM users WHERE user_email = $1 LIMIT 1)",[email]
        )
        const headers = res.getHeaders()
        console.log(headers)
        res.json(isUsernameUnique.rows[0].exists)
    } catch (err) {
        console.error(err.message)
    }
}

module.exports = {register, login, verify, checkUsername, checkEmail}