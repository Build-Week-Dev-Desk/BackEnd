const db = require("../../config/dbConfig")

module.exports = {
    getMyTickets
}

async function getMyTickets(myId){
    return db("tickets")
    .where("asker", myId)
    .orWhere("assignee", myId)
    .leftJoin("users as u1", "tickets.asker", "u1.id")
    .leftJoin("users as u2", "tickets.assignee", "u2.id")
    .leftJoin("solutions", "tickets.id", "solutions.ticketId")
    .select("tickets.id", 
            "title", 
            "status", 
            "description", 
            "attemptedSolutions", 
            "category", 
            "u1.name as asker",
            "u2.name as assignee", 
            "tickets.createdAt",
            "solutions.body as solutions")

}