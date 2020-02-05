const bcrypt = require("bcryptjs")
const db = require("../../config/dbConfig")


async function addUser(newUser) {
    newUser.password = await bcrypt.hash(newUser.password, 10)
    await db("users").insert(newUser)
    const [ user ] = await db("users").where("email", newUser.email).select("id", "name", "email", "roleId")
    return user
}

async function findBy(key) {
    const [ user ] = await db("users")
        .join("roles", "users.roleId", "roles.id")
        .select("users.id", "name", "email", "roleId", "role", "password")
        .where(key)

    return user
}



module.exports = {
    addUser,
    findBy
}