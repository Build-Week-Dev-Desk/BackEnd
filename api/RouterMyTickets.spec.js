const supertest = require("supertest")
const db = require("../config/dbConfig")
const server = require("./server")

//TEST MYTICKETs GET ENDPOINT
describe("TEST MYTICKETS expect fail", ()=> {

    test("It should prevent me from accessing the endpoint without TOKEN", async (done)=> {
        const res = await supertest(server).get("/api/mytickets")
        expect(res.status).toBe(403)
        done()
    })
    
})
   
describe("TEST MYTICKETS expect pass", ()=> {

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

    test("It should allow from accessing the endpoint with TOKEN", async (done)=> {
        const res = await supertest(server)
            .get("/api/mytickets")
            .set("Authorization", token)
        expect(res.status).toBe(200)
        done()
    })
    
})
