var express = require('express');
var router = express.Router();
// require db models
const db = require('../models')
const bcrypt = require('bcrypt')

// Register Route
router.post('/register', function(req, res, next) {
  // take username, password
  if (!req.body.username || ! req.body.password){
    res.status(400).json({
      error: 'please include username and password'
    })
    return
  }
  // create a new user (returns a promise)
  db.User.findOne({
    where: {
      username: req.body.username
    }
  })// check if username is taken
    .then((user) => {
      if(user) {
        res.status(400).json({
          error: 'username already in use'
        })
        return 
      }
    // bycrypt hash password
    bcrypt.hash(req.body.password, 10)
      .then((hash) => {
        // store in db
        db.User.create({
          username: req.body.username,
          password: hash
        })
          .then((user) => {
            // respond with success
            res.status(201).json({
              success: 'User created'
            })

          })
      })
    
  
    })
    
});

// Login Route
router.post('/login', async (req, res) => {
  // check if username and password
  if (!req.body.username || ! req.body.password){
    res.status(400).json({
      error: 'please include username and password'
    })
    return
  }

  // find user by username
  const user = await db.User.findOne({
    where: {
      username:req.body.username
    }
  })
  // If no user
  if(!user) {
    res.status(400).json({
      error: "could not find user with that username"
    })
    return
  }
  // If user 
  // check password
  const success = await bcrypt.compare(req.body.password, user.password)

  // If password is incorrect
  if (!success) {
    res.status(401).json({
      error: 'incorrect password'
    })
    return
  }

  // login 
  req.session.user = user
  // respond with success
  res.json({
    success: 'Successfully logged in'
  })
})
// Register Route
// Logout route 



module.exports = router;
