const supertest = require("supertest")
const db = require("../config/dbConfig")
const server = require("./server")

test("This is a test to see that a test works",(done) => {
    expect(3+4).toBe(7)
    done()
})