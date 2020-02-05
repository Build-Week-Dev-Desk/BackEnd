const db = require("../../config/dbConfig")

module.exports = {
    getTickets,
    addNewTicket,
    deleteTicket,
    editTicketStatus,
    addSolutions,
    getSolutions,
    editSolutions,
    deleteSolutions
}

function getTickets(id){

    let tickets = db("tickets").leftJoin("users as u1", "tickets.asker", "u1.id").leftJoin("users as u2", "tickets.assignee", "u2.id")
    .select("tickets.id", 
            "title", 
            "status", 
            "description", 
            "attemptedSolutions", 
            "category", 
            "u1.name as asker",
            "u2.name as assignee", 
            "tickets.createdAt",
            "solution")

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

async function editTicketStatus(id, newUpdate){
    return await db("tickets").where("id", id).update(newUpdate)
}



async function addSolutions(solution){
    const [ exist ] = await db("solutions").where("ticketId", solution.ticketId)
    if (exist){
        return { message: `solution already exists`}
    } else {
        return await db("solutions").insert(solution)
    }
}

async function editSolutions(id, solution){
    return await db("solutions").where("ticketId", solution.ticketId).update(solution)
}

async function deleteSolutions(id){
    return await db("solutions").where("ticketId", id).del()
}

