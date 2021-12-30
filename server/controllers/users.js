const User = require("../models/user");

module.exports = class UserAPI {
  static async createUser(req, res) {
    const { email, fullName, password } = req.body;
    const user = new User({
      email: email,
      fullName: fullName,
      password: password,
    });

    user
      .save()
      .then((result) => res.send(result))
      .catch((err) => console.log(err));
  }

  static async readUserByEmail(req, res) {
    User.find({ email: req.body.email })
      .then((result) => res.send(result))
      .catch((err) => console.log(err));
  }

  static async readUserById(req, res) {
    User.findById(req.body._id)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static async updateUser(req, res) {
    const { _id, email, fullName, password } = req.body;
    User.findByIdAndUpdate(
      { _id },
      {
        email: email,
        fullName: fullName,
        password: password,
      }
    )
      .then((result) => res.send(result))
      .catch((err) => console.log(err));
  }

  static async deleteUser(req, res) {
    User.findByIdAndDelete({ _id: req.body._id })
      .then((result) => res.send(result))
      .catch((err) => console.log(err));
  }
};
