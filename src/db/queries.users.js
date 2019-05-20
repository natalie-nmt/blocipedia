const User = require("./models").User;
const bcrypt = require("bcryptjs");

module.exports = {
  createUser(newUser, callback) {
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(newUser.password, salt);

    return User.create({
      firstName: newUser.firstName,
      lastName: newUser.lastName,
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
    User.findByPk(id)
      .then((user) => {
        if (!user) {
          callback(404);
        } else {
          result["user"] = user;
        }
      })
  },

  upgradeUser(id, callback){
    return User.findByPk(id)
    .then((user) => {
      console.log("Debugging: This user's role is initially ", user)
      if(!user){
        return callback("User not found");
      } else {
        user.update({role: 2})
        .then((user) => {
          console.log("Debugging: This user's role is now ", user)
          callback(null, user);
        })
        .catch((err) => {
          callback(err);
        })
      }
    });
  },

}