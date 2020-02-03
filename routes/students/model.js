const db = require("../../config/dbConfig")


function getStudent(id){
    return db("users").where("id", id && "userType", 2).first()
}

function getStudentTickets(id){
    return db("tickets").where("userId", id)
}

module.exports = {
    getStudent,
    getStudentTickets
}