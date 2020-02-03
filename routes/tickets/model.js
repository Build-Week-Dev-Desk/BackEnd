const db = require("../../config/dbConfig")

function getTickets(){
    return db("tickets")
}

function getTicketsById(ticketId){
    return db("tickets").where("ticketId", ticketId)
}

module.exports = {
    getTickets,
    getTicketsById
}