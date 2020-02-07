const model = require("./model")
const db = require("../../config/dbConfig")

describe("MYTICKETS db", ()=> {
    it("RETURN an array", async ()=> {
        const mytickets = await model.getMyTickets(1)
        expect.arrayContaining(mytickets)
    })
})