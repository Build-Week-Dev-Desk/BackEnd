const bcrypt = require("bcryptjs")
const db = require("../../config/dbConfig")

module.exports = {
    addUser,
    findBy
}

async function addUser(newUser) {
    newUser.password = await bcrypt.hash(newUser.password, 10)
    await db("users").insert(newUser)
    const [ user ] = await db("users").where("email", newUser.email).select("id", "name", "email", "role")
    return user
}

async function findBy(key) {
    const [ user ] = await db("users")
        .select("users.id", "name", "email", "role", "password")
        .where(key)

    return user
}


