const supertest = require("supertest")
const db = require("../config/dbConfig")
const server = require("./server")

//TEST GET USERS ENDPOINT
describe("TEST USERS ROUTE", ()=> {



    test("It should prevent me from accessing the endpoint if you are NOT the user", async (done)=> {
        const res = await supertest(server).get("/api/users/1")
        expect(res.status).toBe(403)
        done()
    })



    function token(){
        const res = await supertest(server)
        .post("/api/auth/login")
        .send({ email: "alpharomeo@schooladmin.com", password: "123456789", role: "both" } )

        return res.body.token
    }

    let token = await getToken()

    test("It should allow logged in users to access their profile", async (done) => {
        
        console.log(token)
        const response = await supertest(server)
            .get("/api/users/1")
            .set('Authorization', token)
            
        expect(response.status).toBe(200)

    })


    
})