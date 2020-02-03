const bcrypt = require("bcryptjs")
const db = require("../../config/dbConfig")


async function addUser(newUser) {
    newUser.password = await bcrypt.hash(newUser.password, 10)
    await db("users").insert(newUser)
    const [ user ] = await db("users").where("username", newUser.username).select("userId", "name", "username", "usertypeId")
    return user
}

function findById(id){
    return db("users").where("userId", id).first("id","username")
}

async function findBy(key) {
    const [ user ] = await db("users")
        .join("user_type", "users.usertypeId", "user_type.id")
        .select("userId", "name", "username", "userType", "password")
        .where(key)
    return user
}



module.exports = {
    addUser,
    findById,
    findBy
}