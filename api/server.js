const express = require("express")
const server = express()

const configMiddleware = require("../middlware/configMiddleware")

const authRouter = require("../routes/auth/router")
const helpersRouter = require("../routes/helpers/router")
const studentsRouter = require("../routes/students/router")
const ticketsRouter = require("../routes/tickets/router")

configMiddleware(server)

server.get("/", (req,res)=> {
    res.send(`Server is running`)
})

server.use("/api/auth", authRouter)
server.use("/api/helpers", helpersRouter)
server.use("/api/students", studentsRouter)
server.use("/api/tickets", ticketsRouter)

module.exports = server