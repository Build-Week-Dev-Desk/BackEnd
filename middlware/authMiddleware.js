const jwt = require("jsonwebtoken")
const { jwtSecret } = require("../config/secrets")

module.exports = {
  authenticate,
  validateLogin,
  validateRequest
}

function authenticate(req, res, next) {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if(err) {
              res.status(401).json({ message: "LEAVE NOW AND NEVER COME BACK!!"})
            } else {
              req.user = { userType: decodedToken.userType };
              next();
            }
          })
        } else {
          res.status(401).json({ message: 'This is a restricted area, may I please ask you politely to not proceed?' })
        }
}

function validateLogin(req, res, next){
  if (!req.body){
      res.status(400).json({ message: `Please make sure the REQUEST BODY is not empty` })
    } else if (!req.body.username) {
      res.status(400).json({ message: `Please make sure that USERNAME field is not empty` })
    } else if (!req.body.password){
      res.status(400).json({ message: `Please make sure that PASSWORD field is not empty` })
    } else {
      next()
    }
}

function validateRequest(req, res, next){
    if (!req.body){
        res.status(400).json({ message: `Please make sure the REQUEST BODY is not empty` })
      } else if (!req.body.username) {
        res.status(400).json({ message: `Please make sure that USERNAME field is not empty` })
      } else if (!req.body.password){
        res.status(400).json({ message: `Please make sure that PASSWORD field is not empty` })
      } else if (!req.body.email){
        res.status(400).json({ message: `Please make sure that EMAIL field is not empty` })
      } else if (!req.body.name){
        res.status(400).json({ message: `Please make sure that NAME field is not empty` })
      } else if (!req.body.usertypeId){
        res.status(400).json({ message: `Please select USERTYPE` })
      } else {
        next()
      }
  }
