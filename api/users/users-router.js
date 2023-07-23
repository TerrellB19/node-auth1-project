// Require the `restricted` middleware from `auth-middleware.js`. You will need it here!
const express = require('express')
const router = express.Router()
const Users = require('./users-model')
const { restricted } = require('../auth/auth-middleware')
const bcrypt = require('bcryptjs')


/**
  [GET] /api/users

  This endpoint is RESTRICTED: only authenticated clients
  should have access.

  response:
  status 200
  [
    {
      "user_id": 1,
      "username": "bob"
    },
    // etc
  ]

  response on non-authenticated:
  status 401
  {
    "message": "You shall not pass!"
  }
 */

  router.get('/', restricted, async (req, res, next) => {
    try{
      const data = await Users.find()
      res.status(200).json(data)
    }catch(err){
      next(err)
    }
    
  })

  router.get('/:id', restricted, async (req, res, next) => {
    try{
      const data = await Users.findById(req.params.id)
      res.status(200).json(data)
    }catch(err){
      next(err)
    }
    
  })


// Don't forget to add the router to the `exports` object so it can be required in other modules

module.exports = router
