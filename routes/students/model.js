const db = require("../../config/dbConfig")


function getStudent(id){
    return db("users").where("id", id).first()
}

function getStudentTickets(id){
    return db("tickets").where("asker", id)
}

async function createNewTicket(newTicket){
    return await db("tickets").insert(newTicket)
}

module.exports = {
    getStudent,
    getStudentTickets,
    createNewTicket
}