const supertest = require("supertest")
const db = require("../config/dbConfig")
const server = require("./server")


const random = Math.round(Math.random() * (1000 - 5) +5)
const randomName = random.toString()


describe("STUDENT ACCESS", ()=> {
    let token;

    beforeAll((done) => {
      supertest(server)
        .post('/api/auth/login')
        .send( {
            email: '438@schooladmin.com',
            password: '123456789',
            role: 'student',
          }
  )
        .end((err, res) => {
          token = res.body.token;
          done();
        });
    });

    test("GET should allow STUDENT ACCESS to  get TICKETS", async (done) => {
        const res = await supertest(server)
            .get("/api/tickets/")
            .set('Authorization', token)
        expect(res.statusCode).toBe(200)
        done()
    })

    test("GET should allow STUDENT ACCESS to get an individual TICKETS", async (done) => {
        const res = await supertest(server)
            .get("/api/tickets/1")
            .set('Authorization', token)
        expect(res.statusCode).toBe(200)
        done()
    })


    test("POST should allow STUDENT ACCESS to post a new TICKET", async (done) => {
        const res = await supertest(server)
            .post("/api/tickets/")
            .send({
                title: `test ${randomName}`,
                status: "open",
                description: "test description",
                attemptedSolutions: "turning the computer on and off",
                category: "html"
            })
            .set('Authorization', token)
        expect(res.statusCode).toBe(201)
        done()
    })

    test("PUT should NOT allow STUDENT ACCESS to update a TICKET's status", async (done) => {
        const res = await supertest(server)
            .put("/api/tickets/1")
            .send({ 
                status: "claimed"
            })
            .set('Authorization', token)
        expect(res.statusCode).toBe(403)
        done()
    })

    test("POST should allow NOT STUDENT ACCESS to post a SOLUTION", async (done) => {
        const res = await supertest(server)
            .post("/api/tickets/1/solutions")
            .send({
                body: "Please see Student Success"
            })
            .set('Authorization', token)
        expect(res.statusCode).toBe(403)
        done()
    })
})
