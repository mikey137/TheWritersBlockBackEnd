const pool = require("../db")

const createStory = async (req, res) => {
    try {
        const { storyText, storyTitle, dateCreated, isStoryPublic, photoUrl, userName} = req.body
        const user_id = req.user

        const newStory = await pool.query(
            "INSERT INTO story_info(user_id, story_text, story_title, views, likes, date_created, public, photo_url, user_name) VALUES($1, $2, $3, $4, $5, $6, $7,$8, $9) RETURNING story_id", [user_id, storyText, storyTitle, 0, 0, dateCreated, isStoryPublic, photoUrl, userName]
        )
        
        res.json(newStory.rows[0].story_id)
    } catch (err) {
        console.error(err)
    }
}

const deleteStory = async (req, res) => {
    try {
       const{ id }= req.body
       const deleteStory = await pool.query(
           "DELETE FROM story_info WHERE story_id = $1", [id]
       )

       res.send('story deleted')
    } catch (err) {
        console.error(err)
    }
}

const likeStory = async (req,res) => {
    try {
        const  story_id  = req.params.id
        const currentStory = await pool.query(
            "SELECT * FROM story_info WHERE story_id = $1",[story_id]
        )
        
        if(currentStory.rows !== 0){
            let updatedNumberOfLikes = currentStory.rows[0].likes + 1
            await pool.query(
                "UPDATE story_info SET likes = $1 WHERE story_id = $2",[updatedNumberOfLikes, currentStory.rows[0].story_id]
            )
            res.json(updatedNumberOfLikes)
        }
    } catch (err) {
        console.error(err)
    }
}

const viewStory = async (req,res) => {
    try {
        const story_id = req.params.id
           
        await pool.query(
            "UPDATE story_info SET views = views + 1 WHERE story_id = $1",[story_id]
        )
        res.status(200).send('view count updated')
    } catch (err) {
        console.error(err)
    }
}

const editStory = async (req, res) => {
    try {
        const { storyId, storyText, storyTitle, photoUrl} = req.body

        const newStory = await pool.query(
            "UPDATE story_info SET story_text = $1, story_title = $2, photo_url = $3 WHERE story_id = $4", [storyText, storyTitle, photoUrl, storyId]
        )

        res.send("story updated")
    } catch (err) {
        console.error(err)
    }
}

const getStory = async (req, res) => {
    try {
        const story_id = req.params.id
        
        const story = await pool.query(
           "SELECT * FROM story_info WHERE story_id = $1", [story_id]
        )

        response = {
            story_id: story.rows[0].story_id,
            user_id: story.rows[0].user_id,
            story_text: story.rows[0].story_text,
            story_title: story.rows[0].story_title,
            date_created: story.rows[0].date_created,
            public: story.rows[0].public,
            photo_url: story.rows[0].photo_url,
            views: story.rows[0].views,
            likes: story.rows[0].likes,
            user_name: story.rows[0].user_name
        }

        res.json(response)
    } catch (err) {
        console.error(err)
    }
}

const getMostViewed = async (req, res) => {
    try {
        const mostViewedStories = await pool.query(
            "SELECT * FROM story_info ORDER BY views DESC LIMIT 5"
        )
        res.json(mostViewedStories.rows)
    } catch (err) {
        console.error(err)
    }
}

const getMyStories = async (req, res) => {
    try{
        const user_id = req.params.id
        const myStories = await pool.query(
            "SELECT * FROM story_info WHERE user_id = $1",[user_id]
        )
        res.json(myStories.rows)
    }catch(err){
        console.error(err)
    }
}

const getNewest = async (req, res) => {
    try {
       const newestStories = await pool.query(
           "SELECT * FROM story_info ORDER BY date_created DESC LIMIT 5"
       ) 

       res.json(newestStories.rows)
    } catch (err) {
        console.error(err)
    }
}

module.exports = {createStory, deleteStory, likeStory, viewStory, editStory, getStory, getMostViewed, getMyStories, getNewest}