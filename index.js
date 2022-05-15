const express = require("express")
const cors = require('cors')
const dotevn = require('dotenv')
const { corsOrigin } = require('./CorsOrigins')
let  originUrl  = corsOrigin.url.API_URL

dotevn.config();

const app = express()

app.use(express.json()) //Allow access the body json data

//middleware
app.use(cors({
    origin: {originUrl},
    optionsSuccessStatus: 200
}))

// app.use(function(req, res, next) {
//     res.setHeader("Access-Control-Allow-Origin", "https://master--radiant-axolotl-de1247.netlify.app")
//     res.setHeader("Access-Control-Allow-Headers", "Content-Type, Origin, Content-Length, Authorization, Accept, X-Requested-With")
//     res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
//     next()
// });

//Routes


app.use("/auth", require("./routes/auth"))

app.use("/dashboard", require("./routes/dashboard"))

app.use("/stories", require("./routes/stories"))

app.use("/users", require("./routes/users"))

app.use("/followers", require("./routes/followers"))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})