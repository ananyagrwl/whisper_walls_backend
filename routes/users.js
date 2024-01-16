var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const Secret = require('../modals/userSchema');

/* GET users listing. */
router.post('/signup', async function (req, res, next) {
  const prevuser = await Secret.findOne({ UID: req.body.uid });
  if (!prevuser) {
    const newUser = new Secret({
      UID: req.body.uid,
      Email: req.body.email,
      Name: req.body.name
    })
    await newUser.save();
    const user = await Secret.findOne({ UID: req.body.uid });
    console.log("inner",user);
    
    return res.send({token: jwt.sign({ id: user._id, token: user.UID}, process.env.TOKEN_SECRET),  name: user.Name });
  }
  console.log("outer",prevuser);
  // return res.send("Res")
  return res.send({token: jwt.sign({ id: prevuser._id, token: prevuser.UID}, process.env.TOKEN_SECRET),  name: prevuser.Name });

});

router.post('/login', async function (req, res, next) {
  const user = await Secret.findOne({ UID: req.body.uid });
  console.log(user);
  // return res.send("Login error")
  res.send({token: jwt.sign({ id: user._id, token: user.UID}, process.env.TOKEN_SECRET),  name: user.Name });
});

module.exports = router;