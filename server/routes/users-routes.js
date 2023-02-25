const express = require('express');
const router = express.Router();
const User = require("../models/user")

router.post("/register", async (req, res) => {

  const newuser = new User(req.body)

  try {
      const user = await newuser.save()
      res.send("User registed SuccessFully")
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/login", async(req, res) =>{

  const {email , password} = req.body

  try {
    const user = User.findOne({email : email , password : password})
    if(user) {
      const temp = {
        name : user.name,
        email : user.email,
        admin : user.admin,
        _id : user._id,
      }
      res.send(temp)
    }
    else{
      return res.status(400).json({ message : 'login failed' });
    }
  } catch (error) {
      return res.status(400).json({ error });
  }
});

module.exports = router;