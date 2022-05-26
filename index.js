const express = require("express")
const cors = require('cors')
const dotevn = require('dotenv')
const { corsOrigin } = require('./CorsOrigins')
let  originUrl  = corsOrigin.url.API_URL

dotevn.config();

const app = express()

app.use(express.json()) 
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: {originUrl},
    optionsSuccessStatus: 200,
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    allowedHeaders: "Origin, Content-Type, X-Auth-Token, token"
}))

app.options('*', cors())

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