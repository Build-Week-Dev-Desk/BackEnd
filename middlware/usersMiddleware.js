module.exports = {
    checkId,
    validateRequest
}

function validateRequest(req, res, next){
    if (!req.body.email){
       res.status(400).json({ message: `Please make sure that EMAIL field is not empty` })
     } else if (!req.body.name){
       res.status(400).json({ message: `Please make sure that NAME field is not empty` })
     } else if (!req.body.role){
       res.status(400).json({ message: `Please select your ROLE before your proceed` })
     } else {
       next()
     }
 }
 
function checkId(req, res, next){
    if(req.user && req.user.id && req.user.id === req.params.id){
      next();
    } else {
      res.status(403).json({ message: `PERMISSION DENIED` })    
    }
}