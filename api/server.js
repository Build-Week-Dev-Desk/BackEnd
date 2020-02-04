const express = require("express")
const server = express()

const configMiddleware = require("../middlware/configMiddleware")
const { authenticate } = require("../middlware/authMiddleware")

const authRouter = require("../routes/auth/router")
const usersRouter = require("../routes/users/router")
const ticketsRouter = require("../routes/tickets/router")

configMiddleware(server)

server.get("/", (req,res)=> {
    res.send(`Server is running`)
})

server.use("/api/auth", authRouter)
server.use("/api/users", authenticate, usersRouter)
server.use("/api/tickets", authenticate, ticketsRouter)

module.exports = server