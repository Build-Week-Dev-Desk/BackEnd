const supertest = require("supertest")
const db = require("../config/dbConfig")
const server = require("./server")

//TEST REGISTER
describe("TEST REGISTER", ()=> {

    // test("POST /REGISTER should work", async()=> {

    //     const newUser = { email: "alpharomeo@schooladmin.com", password: "123456789", role: "both", name: "Alpha Romeo "}
    //     const res = await supertest(server).post("/api/auth/register").send(newUser)
    //     expect(res.status).toBe(201)
    // })


    test("REGISTER enpoints should NOT work with bad request", async()=> {
        const newUser = { email: "alpharomeo@schooladmin.com" }
        const res = await supertest(server).post("/api/auth/register").send(newUser)
        expect(res.status).toBe(400)
        expect(res.body.message).toMatch(/please make sure/i)
    })
    
})

//TEST LOGIN
describe("TEST LOGIN endpoint", ()=> {
    
    test("LOGIN should work and returns correct response", async()=> {

        const res = await supertest(server)
                    .post("/api/auth/login")
                    .send({ email: "alpharomeo@schooladmin.com", password: "123456789", role: "both", name: "Alpha Romeo "} )
        expect(res.status).toBe(200)
        expect(res.body.id).toBe(1)
        expect(res.body.message).toMatch(/welcome/i)
    })

    test("LOGIN endpoint should NOT work with wrong request", async()=> {

        const res = await supertest(server).post("/api/auth/login").send({ username: "panamacity" })
        expect(res.status).toBe(400)
        expect(res.body.message).toMatch(/please make sure/i)
    })
})