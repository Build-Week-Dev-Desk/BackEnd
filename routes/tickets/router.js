const express = require("express")
const router = express.Router()
const db = require("./model")
const { restricted } = require("../../middlware/ticketMiddleware")


router.get("/", async (req,res) => {
    let tickets = await db.getTickets()
    try{
        res.status(200).json(tickets)
    }
    catch(err){
        res.status(500).json({ message: err })
    }
})

router.get("/:id", async (req,res) => {

    try{
        res.status(200).json(await db.getTickets(req.params.id))
    }
    catch(err){
        res.status(500).json({ message: err })
    }
})

router.post("/", restricted("student"), async (req,res) => {
    const newTicket = { ...req.body, asker: req.user.id }
    try{
        res.status(201).json(await db.addNewTicket(req.body))
    }
    catch(err){
        res.status(500).json({ message: err })
    }
})

router.post("/:id/solutions", restricted("staff"), async (req,res) => {
    
    const solution = { ...req.body, answerer: req.user.id, ticketId: req.params.id}
    try{
        res.status(200).json(await db.addSolutions(solution))
    }
    catch(err){
        res.status(500).json({ message: err })
    }

})


router.delete("/:id", async (req,res) => {
    try{
        res.status(200).json(await db.deleteTicket(req.params.id))
    }
    catch(err){
        res.status(500).json({ message: err })
    }
})

router.put("/:id/solutions", restricted("staff"), async (req,res) => {

    const solution = { ...req.body, answerer: req.user.id, ticketId: req.params.id}
    console.log(solution)
    try{
        res.status(200).json(await db.edtSolutions(req.params.id, solutions))
    }
    catch(err){
        res.status(500).json({ message: err })
    }
})



module.exports = router