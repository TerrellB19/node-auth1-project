// Require `checkUsernameFree`, `checkUsernameExists` and `checkPasswordLength`
// middleware functions from `auth-middleware.js`. You will need them here!
const express = require('express')
const router = express.Router()
const { 
  checkPasswordLength, 
  checkUsernameFree, 
  checkUsernameExists } = require('./auth-middleware')
const User = require('../users/users-model')
const bcrypt = require('bcryptjs')


/**
  1 [POST] /api/auth/register { "username": "sue", "password": "1234" }

  response:
  status 200
  {
    "user_id": 2,
    "username": "sue"
  }

  response on username taken:
  status 422
  {
    "message": "Username taken"
  }

  response on password three chars or less:
  status 422
  {
    "message": "Password must be longer than 3 chars"
  }
 */
router.post('/register', checkPasswordLength, checkUsernameFree, async (req, res, next) => {
  try{
    let { username, password } = req.body

    const hash = bcrypt.hashSync(password, 10)
    password = hash

    const newUser = await User.add({username, password})

    res.status(201).json(newUser)
  } catch(err){
    next(err)
  }
  
})


/**
  2 [POST] /api/auth/login { "username": "sue", "password": "1234" }

  response:
  status 200
  {
    "message": "Welcome sue!"
  }

  response on invalid credentials:
  status 401
  {
    "message": "Invalid credentials"
  }
 */
  router.post('/login', checkUsernameExists, (req, res, next) => {
    res.json('login')
  })

/**
  3 [GET] /api/auth/logout

  response for logged-in users:
  status 200
  {
    "message": "logged out"
  }

  response for not-logged-in users:
  status 200
  {
    "message": "no session"
  }
 */
  router.get('/logout', (req, res, next) => {
    res.json('auth')
  })

 
// Don't forget to add the router to the `exports` object so it can be required in other modules
module.exports = router