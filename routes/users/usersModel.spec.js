const model = require("./model")
const db = require("../../config/dbConfig")

describe("USERS db", ()=> {
    it("RETURN an array", async ()=> {
        const users = await model.getUsers()
        console.log(users)
        expect.arrayContaining(users)
    })

    it("RETURN a user", async ()=> {
        const [ user ] = await model.getUserById(1)
        expect(user)
    })

    it("RETURN an array", async ()=> {
        const user = await model.getUserById(1)
        expect.arrayContaining(user)
    })
})