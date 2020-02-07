const model = require("./model")
const db = require("../../config/dbConfig")

describe("TICKETS model", ()=> {
    
    it("RETURN an ARRAY of tickets", async ()=> {
        const tickets = await model.getTickets()
        expect.arrayContaining(tickets)
    })

    it("RETURN an single tickets", async ()=> {
        const ticket = await model.getTickets(1)
        expect(ticket.id).toBe(1)
    })

    it("Ticket status is edited", async ()=> {
        await model.editTicketStatus(1, { status: "claimed" })
        const ticket = await model.getTickets(1)
        console.log(ticket)
        expect(ticket.status).toBe("claimed")
    })

    // it("A Solution is edited", async ()=> {
    //     await model.editSolutions(1, { body: "this is a new solution" })
    //     const ticket = await model.getTickets(1)
    //     expect(ticket.solution.body).toBe("this is a new solution")
    // })

})