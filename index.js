const express = require("express")
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 5000
const { corsOrigin } = require('./CorsOrigins')
let originUrl = corsOrigin.url.API_URL


//middleware
console.log(originUrl)
app.use(express.json())
app.use(cors({
    origin: originUrl,
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PUT']
}));
app.options('*', cors())


//Routes

app.use("/auth", require("./routes/auth"))

app.use("/dashboard", require("./routes/dashboard"))

app.use("/stories", require("./routes/stories"))

app.use("/users", require("./routes/users"))

app.use("/followers", require("./routes/followers"))

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})