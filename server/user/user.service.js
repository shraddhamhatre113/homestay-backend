const User = require("./user.model");

/**
 * Get user
 * @returns {User}
 */
 function get(id) {
  return  User.get(id);
}

/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
async function create(user) {
  const newUser = new User({
    email: user.email,
    password: user.password,
  });

  return await newUser.save();
}

/**
 * Update existing user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
 function update(updateUser) {
console.log(updateUser)
  return User.get(updateUser.id)
    .then((user) => {
      user.dob = updateUser.dob;
      user.first_name = updateUser.first_name;
      user.last_name = updateUser.last_name;
      user.gender = updateUser.gender;
      user.hobbies = updateUser.hobbies;
      user.interest = updateUser.interest;
      user.about = updateUser.about;
      user.address = updateUser.address_id;
      return user.save();
    });
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
async function list(query) {
  const { limit = 50, skip = 0 } = query;
  return await User.list({ limit, skip });
}

/**
 * Delete user.
 * @returns {User}
 */
async function remove(id) {
  return await User.get(id).remove();
}

module.exports = { get, create, update, list, remove };
