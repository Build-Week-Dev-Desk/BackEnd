const express = require("express")
const router = express.Router()
const db = require("./model")

const { checkId, validateRequest } = require("../../middlware/usersMiddleware")

router.get("/", async (req,res) => {
    try{
        res.status(200).json(await db.getUsers())
    }
    catch(err){
        res.status(500).json({ message: err })
    }
})

router.get("/:id", checkId, async (req,res) => {
    try{
        res.status(200).json(await db.getUserById(req.params.id))
    }
    catch(err){
        res.status(500).json({ message: err })
    }
})

router.put("/:id", checkId, validateRequest, async (req,res) => {
    try{
        
        await db.editUser(req.params.id, req.body)
        res.status(200).json(await db.getUserById(req.params.id))
    }
    catch(err){
        res.status(500).json({ message: err })
    }
})

module.exports = router
