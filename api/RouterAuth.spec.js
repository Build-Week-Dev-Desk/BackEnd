const supertest = require("supertest")
const db = require("../config/dbConfig")
const server = require("./server")


const random = Math.round(Math.random() * (1000 - 5) +5)
const randomName = random.toString()
//TEST REGISTER
describe("TEST REGISTER", ()=> {

    test("REGISTER endpoints should work", async()=> {
        const newUser = { email: `${random}@schooladmin.com`, password: "123456789", role: "staff", name: `${randomName}` } 
        const res = await supertest(server).post("/api/auth/register").send(newUser)
        expect(res.status).toBe(201)
    })

    test("REGISTER enpdoints should NOT work with bad request", async()=> {
        const newUser = { email: "alpharomeo@schooladmin.com" }
        const res = await supertest(server).post("/api/auth/register").send(newUser)
        expect(res.status).toBe(400)
    })
    
})

//TEST LOGIN
describe("TEST LOGIN endpoint", ()=> {
    
    test("LOGIN should work and returns correct response", async()=> {
        
        const res = await supertest(server)
                    .post("/api/auth/login")
                    .send({ email: "783@schooladmin.com", password: "123456789", role: "both" } )
        expect(res.status).toBe(200)
        expect(res.body.id).toBe(4)
        expect(res.body.message).toMatch(/welcome/i)
    })

    test("LOGIN endpoint should NOT work with wrong request", async()=> {

        const res = await supertest(server).post("/api/auth/login").send({ username: "panamacity" })
        expect(res.status).toBe(400)
        expect(res.body.message).toMatch(/please make sure/i)
    })
})