const db = require("../../config/dbConfig")


function getTickets(id){

    let tickets = db("tickets").join("users", "tickets.asker", "users.id")
    .select("tickets.id", 
            "title", 
            "status", 
            "description", 
            "attemptedSolutions", 
            "category", 
            "name as asker", 
            "tickets.createdAt")

    if (id) {
        tickets.where("tickets.id", id).first()

        const promises = [tickets, this.getSolutions(id)]
        return Promise.all(promises).then(results => {
            let [ticket, solution] = results

            if (ticket){
                ticket.solution = solution[0]
                return ticket
            } else {
                return null
            }
        })
    } else {
        return tickets
    }
}

async function getSolutions(ticketId){
    return await db("solutions").where("ticketId", ticketId)
    .join("users", "solutions.answerer", "users.id")
    .select("solutions.id as solutionId", "body", "name as answerer", "solutions.createdAt")
}

async function addNewTicket(newTicket){
    await db("tickets").insert(newTicket)
    const [ success ] = await db("tickets").where("title", newTicket.title).select("id", "title")
    return success
}

async function deleteTicket(id){
    await db("tickets").where("id", id).del()
    return getTickets()
}

async function addSolutions(solution){
    await db("solutions").insert(solution)
    return db("tickets").where("id", solutions.ticketId)
}

async function editSolutions(id, solution){
    await db("solutions").update(solution).where("ticketId", id)
    return db("tickets").where("id", id)
}

module.exports = {
    getTickets,
    addNewTicket,
    deleteTicket,
    addSolutions,
    getSolutions,
    editSolutions
}