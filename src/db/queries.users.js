const User = require("./models").User;
const bcrypt = require("bcryptjs");

module.exports = {
  createUser(newUser, callback) {
    console.log("Debugging: createUser is being called in queries.users");
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(newUser.password, salt);

    return User.create({
      email: newUser.email,
      password: hashedPassword
    })
      .then((user) => {
        callback(null, user);
      })
      .catch((err) => {
        callback(err);
      })
  },

  getUser(id, callback) {

    let result = {};
    User.findById(id)
      .then((user) => {
        if (!user) {
          callback(404);
        } else {
          result["user"] = user;
        }
      })
  }

}





