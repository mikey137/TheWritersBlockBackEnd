const express = require("express")
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 5000
const { corsOrigin } = require('./CorsOrigins')
let  originUrl  = corsOrigin.url.API_URL

console.log(originUrl)
//middleware
app.use(express.json())
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(cors({
    origin: 'https://master--radiant-axolotl-de1247.netlify.app'
}));

//Routes

app.use("/auth", require("./routes/auth"))

app.use("/dashboard", require("./routes/dashboard"))

app.use("/stories", require("./routes/stories"))

app.use("/users", require("./routes/users"))

app.use("/followers", require("./routes/followers"))

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})