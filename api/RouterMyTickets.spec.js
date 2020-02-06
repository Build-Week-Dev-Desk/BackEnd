const supertest = require("supertest")
const db = require("../config/dbConfig")
const server = require("./server")

//TEST MYTICKETs GET ENDPOINT
describe("Test my tickets route", ()=> {

    test("It should prevent me from accessing the endpoint without TOKEN", async (done)=> {
        const res = await supertest(server).get("/api/mytickets")
        expect(res.status).toBe(403)
        done()
    })
    
})
   
    
