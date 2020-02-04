const db = require("../../config/dbConfig")

async function getUsers(){
    return db("users")
}

async function getUserById(id){
    return db("users").where("id", id)
}

module.exports = {
    getUsers,
    getUserById
}