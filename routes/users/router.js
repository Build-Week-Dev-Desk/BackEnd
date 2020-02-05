const express = require("express")
const bcrypt = require("bcryptjs")
const router = express.Router()
const db = require("./model")

router.get("/", async (req,res) => {
    try{
        res.status(200).json(await db.getUsers())
    }
    catch(err){
        res.status(500).json({ message: err })
    }
})

router.get("/:id", async (req,res) => {
    try{
        res.status(200).json(await db.getUserById(req.params.id))
    }
    catch(err){
        res.status(500).json({ message: err })
    }
})

// router.put("/:id", async (req,res) => {
//     try{
//         res.status(200).json(await db.editUser(req.params.id))
//     }
//     catch(err){
//         res.status(500).json({ message: err })
//     }
// })

module.exports = router
