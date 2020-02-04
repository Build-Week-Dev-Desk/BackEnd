module.exports = {
    restricted,
    validateTicketReq,
    validateSolutionReq
}

function restricted(role){
    return function(req, res, next) {
      if(req.user && req.user.role && req.user.role.toLowerCase() === role) {
        next();
      } else {
        res.status(403).json({ message: `PERMISSION DENIED` })    
      }
    }
  }


  function validateTicketReq(req, res, next){
    if (!req.body.title) {
        res.status(400).json({ message: `Please make sure that TITLE field is not empty` })
      } else if (!req.body.status){
        res.status(400).json({ message: `Please make sure that STATUS field is not empty` })
      } else if (!req.body.description){
        res.status(400).json({ message: `Please make sure that DESCRIPTION field is not empty` })
      } else if (!req.body.attemptedSolutions){
        res.status(400).json({ message: `Please select ATTEMPTEDSOLUTIONS` })
      } if (!req.body.category){
        res.status(400).json({ message: `Please make sure that CATEGORY field is not empty` })
      } else {
        next()
      }
}

function validateSolutionReq(req, res, next){
  if (!req.body.body) {
    res.status(400).json({ message: `Please make sure that BODY field is not empty` })
  } else {
    next()
  }
}

