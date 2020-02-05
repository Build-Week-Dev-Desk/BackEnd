const bcrypt = require("bcryptjs")
const express = require("express")
const jwt = require("jsonwebtoken")

const { jwtSecret } = require("../../config/secrets")

const router = express.Router()
const { validateLogin, validateRequest } = require("../../middlware/authMiddleware")
const db = require("./model")


router.post("/register", validateRequest, async ( req, res) => {

  try {
    res.status(201).json( await db.addUser(req.body))
  }
  catch(err){
    res.status(500).json({message: `ERROR 500 ${err}`})
  }

});


router.post("/login", validateLogin, async (req, res) => {

  try {
        const { email, password, role } = req.body
        const user = await db.findBy({ email })
        const passwordValid = await bcrypt.compareSync(password, user.password)
        if (role !== user.role){
          res.status(400).json({ message: `ROLE input does not match the system`})
        } else {
        if (user && passwordValid){
            const token = signToken(user)
            res.status(200).json( {token,  message: `Welcome ${user.name}`, name: user.name, role: user.role })
        } else {
            res.status(401).json({ message: "INVALID CREDENTIALS, please try again" });
        }
      }
    }

    catch(err){
        res.status(500).json({ message: `ERROR 500 ${err}` })
    }
});



function signToken(user) {
  const payload = {
      role : user.role,
      id: user.id,
      name: user.name
  }
  const options = {
      expiresIn: '1d'
  }

  return jwt.sign(payload, jwtSecret, options);
}


module.exports = router;
