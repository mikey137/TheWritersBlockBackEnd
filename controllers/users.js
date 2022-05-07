const pool = require("../db")

const getUserInfo = async (req, res) => {
    try {
        const user_id = req.user

        const currentUser = await pool.query(
            "SELECT * FROM users WHERE user_id = $1",[user_id]
        )

        response = {
            user_name: currentUser.rows[0].user_name,
            user_photo: currentUser.rows[0].user_photo,
            user_cover_photo: currentUser.rows[0].user_cover_photo,
            user_id: user_id
        }

        res.json(response)
    } catch (err) {
        console.error(err)
    }
}

const getPublicUserInfo = async (req, res) => {
    try {
        const user_id = req.params.id

        const currentUser = await pool.query(
            "SELECT * FROM users WHERE user_id = $1",[user_id]
        )

        response = {
            user_name: currentUser.rows[0].user_name,
            user_photo: currentUser.rows[0].user_photo,
            user_cover_photo: currentUser.rows[0].user_cover_photo,
            about_user: currentUser.rows[0].about_user
        }

        res.json(response)
    } catch (err) {
        console.error(err)
    }
}

const putUserPhoto = async (req,res) =>{
    try {
        const user_id = req.user
        const photo_url = req.body.user_photo
        const userPhoto = await pool.query(
            "UPDATE users SET user_photo = $1 WHERE user_id = $2", [photo_url, user_id]
        )
        res.status(200).send('photo updated')
    } catch (err) {
        console.error(err)
    }
}

const putCoverPhoto = async (req,res) => {
    try {
        const user_id = req.user
        const photo_url = req.body.user_cover_photo
        const userPhoto = await pool.query(
            "UPDATE users SET user_cover_photo = $1 WHERE user_id = $2", [photo_url, user_id]
        )

        res.status(200).send('photo updated')
    } catch (err) {
        console.error(err)
    }
}

const putAboutText = async (req,res) => {
    try {
        
        const about_user  = req.body.about_user
        const user_id = req.user

        const aboutText = await pool.query(
            "UPDATE users SET about_user = $1 WHERE user_id = $2", [about_user, user_id]
        )

        res.send('text updated')
    } catch (err) {
        console.error(err)
    }
}

module.exports = {getUserInfo, putUserPhoto, putCoverPhoto, getPublicUserInfo, putAboutText}