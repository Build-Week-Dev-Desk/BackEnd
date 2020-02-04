const db = require("../../config/dbConfig")

async function getTickets(){
    return await db("tickets")
        .join("users", "tickets.asker", "users.id")
        .select("tickets.id", "title", "status", "description", "attemptedSolutions", "category", "name as asker", "tickets.createdAt")
}

async function getTicketsById(id){

    const [ result ] = await db("tickets").where("id", id)
    const [ solution ] = await db("solutions").where("ticketId", id)
    result.solution = solution
    return result
}

module.exports = {
    getTickets,
    getTicketsById
}