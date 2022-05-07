const pool = require("../db")

const followUser = async (req, res) => {
    try {
        const userToFollow = req.body.userToFollow
        const currentUser = req.user

        const addUserToFollow = await pool.query(
            "INSERT INTO followers(follower, followee) VALUES($1, $2)",[currentUser, userToFollow]
        )
        
        res.status(200).send('now following new user')
    } catch (err) {
        console.error(err)
    }
}

const isFollowing = async (req,res) => {
    try {
        const follower = req.user
        const followee = req.body.followee 

        const checkIfFollowing = await pool.query(
            "SELECT EXISTS(SELECT 1 FROM followers WHERE follower=$1 AND followee=$2)",[follower, followee]
        )
        res.json(checkIfFollowing.rows[0].exists)   
    } catch (err) {
        console.error(err)
    }
}

const getNumberOfFollowers = async (req,res) => {
    try {
        const followee = req.params.id

        const numberOfFollowers = await pool.query(
            "SELECT COUNT(followee) FROM followers WHERE followee = $1",[followee]
        )
        
        res.json(numberOfFollowers)   
    } catch (err) {
        console.error(err)
    }
}

module.exports = {followUser, isFollowing, getNumberOfFollowers}