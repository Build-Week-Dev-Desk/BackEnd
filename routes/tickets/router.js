const express = require("express")
const router = express.Router()
const db = require("./model")
const { restricted, validateSolutionReq, validateTicketReq } = require("../../middlware/ticketMiddleware")


router.get("/", async (req,res) => {
    let tickets = await db.getTickets()
    try{
        res.status(200).json(tickets)
    }
    catch(err){
        res.status(500).json({ message: err })
    }
})

router.get("/:id", validateId, async (req,res) => {

    try{
        res.status(200).json(await db.getTickets(req.params.id))
    }
    catch(err){
        res.status(500).json({ message: err })
    }
})

router.post("/", restricted("student"), validateTicketReq, async (req,res) => {
    
    try{
        const newTicket = { ...req.body, asker: req.user.id }
        res.status(201).json(await db.addNewTicket(newTicket))
    }
    catch(err){
        res.status(500).json({ message: err })
    }
})


router.delete("/:id", validateId, async (req,res) => {
    try{
        res.status(200).json(await db.deleteTicket(req.params.id))
    }
    catch(err){
        res.status(500).json({ errorMessage: err })
    }
})

router.put("/:id", restricted("student"), validateId, validateTicketReq, async (req,res) => {

    try{
        const newUpdate = { ...req.body, asker: req.user.id }
        await db.editTicket(req.params.id, newUpdate)
        res.status(200).json(await db.getTickets(req.params.id))
    }
    catch(err){
        res.status(500).json({ errorMessage: err })
    }
})



router.post("/:id/solutions", restricted("staff"), validateId, validateSolutionReq, async (req,res) => {
    
    try{
        const solution = { ...req.body, answerer: req.user.id, ticketId: req.params.id}
        await db.addSolutions(solution)
        res.status(200).json(await db.getTickets(req.params.id))
    }
    catch(err){
        res.status(500).json({ errorMessage: err })
    }

})

router.put("/:id/solutions", restricted("staff"), validateId, validateSolutionReq, async (req,res) => {
    
    try{
        const solution = { ...req.body, answerer: req.user.id, ticketId: req.params.id}
        await db.editSolutions(req.params.id, solution)
        res.status(200).json(await db.getTickets(req.params.id))
    }
    catch(err){
        res.status(500).json({ errorMessage: err })
    }                                 
})

router.delete("/:id/solutions", restricted("staff"), validateId, async (req,res) => {
    try{
        await db.deleteSolutions(req.params.id)
        res.status(200).json(await db.getTickets(req.params.id))
    }
    catch(err){
        res.status(500).json({ errorMessage: err })
    }
})



// *** MIDDLE WARE ***//

async function validateId(req, res, next){
    const ticket = await db.getTickets(req.params.id)
    if (ticket){
        req.ticket = ticket
        next()
    } else {
      res.status(404).json({ message: "ID not found, please provide a valid Project ID" })
    }
}



module.exports = router