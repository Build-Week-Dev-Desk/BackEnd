const express = require("express")
const router = express.Router()
const db = require("./model")

router.get("/", async (req,res) => {
    try{
        res.status(200).json(await db.getMyTickets(req.user.id))
    }
    catch(err){
        res.status(500).json({ errorMessage: err })
    }
})


module.exports = router