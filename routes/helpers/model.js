const express = require("express")
const router = express.Router()

const db = require("../../config/dbConfig")

function getHelper(helperId){
    return db("users").where("id", id && "userType", 2).first()
}

function getHelperTickets(helperId){
    return db("ticket").where("assignedTo", id)
}


module.exports = {
    getHelper,
    getHelperTickets
}