const db = require("../../config/dbConfig")

async function getUsers(){
    return db("users")
}

async function getUserById(id){
    return db("users").where("id", id)
}

async function editUser(id, userUpdate){
    return await db("users").where("id", id).update(userUpdate)
}

module.exports = {
    getUsers,
    getUserById,
    editUser
}