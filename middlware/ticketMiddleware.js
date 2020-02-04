module.exports = {
    restricted
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
  