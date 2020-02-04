const express = require("express")
const router = express.Router()
const db = require("./model")

router.get("/", async (req,res) => {

})

router.get("/:id", async (req,res) => {
    try{
        res.status(200).json(await db.getStudent(req.params.id))
    }
    catch(err){
        res.status(500).json({ message: err })
    }
})

router.get("/:id/tickets", async (req,res) => {
    try{
        res.status(200).json(await db.getStudentTickets(req.params.id))
    }
    catch(err){
        res.status(500).json({ message: err })
    }
})

router.post("/:id/tickets", async (req,res) => {

})


module.exports = router