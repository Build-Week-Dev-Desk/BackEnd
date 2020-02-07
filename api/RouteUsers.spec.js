const supertest = require("supertest")
const db = require("../config/dbConfig")
const server = require("./server")

//TEST GET USERS ENDPOINT
describe("TEST USERS ROUTE, should NOT work", ()=> {

    test("It should prevent me from accessing the endpoint if you are NOT the user", async (done)=> {
        const res = await supertest(server).get("/api/users/1")
        expect(res.status).toBe(403)
        done()
    })

})

describe("TEST USERS ROUTE, should work", ()=> {

    let token;

    beforeAll((done) => {
      supertest(server)
        .post('/api/auth/login')
        .send({ email: "783@schooladmin.com", password: "123456789", role: "both" })
        .end((err, res) => {
          token = res.body.token;
          done();
        });
    });

    test("It should allow logged in users to access their profile", async (done) => {
        const res = await supertest(server)
            .get("/api/users/4")
            .set('Authorization', token)
        expect(res.statusCode).toBe(200)
        done()
    })


    test("It should allow NOT logged in users to access other's profile", async (done) => {
        const res = await supertest(server)
            .get("/api/users/1")
            .set('Authorization', token)
        expect(res.statusCode).toBe(403)
        done()
    })

})