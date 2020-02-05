const supertest = require("supertest")
const db = require("../config/dbConfig")
const server = require("./server")

//TEST REGISTER
describe("POST/ register endpoint", ()=> {

    beforeEach(async () => {
        await db("users").truncate()
    })

    test("POST /REGISTER should work", async()=> {

        const newUser = { email: "alpharomeo@schooladmin.com", password: "123456789", role: "both", name: "Alpha Romeo "}
        const res = await supertest(server).post("/api/auth/register").send(newUser)
        expect(res.status).toBe(201)
        expect(res.body.username).toBe(newUser.username)
    })

    test("POST /REGISTER should NOT work", async()=> {
        const newUser = { email: "alpharomeo@schooladmin.com" }
        const res = await supertest(server).post("/api/auth/register").send(newUser)
        expect(res.status).toBe(400)
    })
    
})

//TEST LOGIN
describe("POST/ login endpoint", ()=> {
    
    beforeEach(async () => {
        await db('users').truncate();
    })

    test("POST/ login should work", async()=> {

        const newUser = { email: "alpharomeo@schooladmin.com", password: "123456789", role: "both" }
        await supertest(server).post("/api/auth/register").send(newUser)
        const res = await supertest(server).post("/api/auth/login").send(newUser)
        expect(res.status).toBe(200)
        expect(res.body.message).toMatch(/welcom/i)
    })

    test("POST/ login should NOT work with wrong request", async()=> {

        const newUser = { username: "panamacitybeach", password: "12345678" }
        await supertest(server).post("/api/auth/register").send(newUser)
        const res = await supertest(server).post("/api/auth/login").send({ username: "panamacity" })
        expect(res.status).toBe(400)
    })
})