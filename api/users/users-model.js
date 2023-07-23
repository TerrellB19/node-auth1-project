const db = require('../../data/db-config')

/**
  resolves to an ARRAY with all users, each user having { user_id, username }
 */
 const find = () => {
  return db.select('user_id', 'username').from('users')
}

/**
  resolves to an ARRAY with all users that match the filter condition
 */
const findBy = (filter) => {
return null
}

/**
  resolves to the user { user_id, username } with the given user_id
 */
const findById = (user_id) => {

  return null
}

/**
  resolves to the newly inserted user { user_id, username }
 */
const add = (user) => {
return null 
}

// Don't forget to add these to the `exports` object so they can be required in other modules

module.exports = {
  find,
  findBy,
  findById,
  add,
}
