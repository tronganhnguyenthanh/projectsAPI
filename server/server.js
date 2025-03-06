const express = require("express")
const app = express()
const dotenv = require("dotenv")
dotenv.config()
const cors = require("cors")
const router = require("./routes/students/students")
const routerProject = require("./routes/projects/projects")
const port = process.env.PORT_APP
app.listen(port, () => {
 console.log(`Server is running on port ${port}`)
})
app.use(express.json())
app.use(cors())
app.use("/api", router, routerProject)
