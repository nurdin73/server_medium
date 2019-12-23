const jwt = require("jsonwebtoken");
const Users = require("../models").users;
exports.index = (req, res) => {
  try {
    const { username, password } = req.body;
    if (username === null) {
      return res.status(404).json({
        message: "field username is required"
      });
    }
    Users.findOne({
      where: {
        username: username,
        password: password
      }
    }).then(user => {
      if (user != null) {
        const token = jwt.sign(
          {
            id: user.id
          },
          "thisismysecretkey"
        );
        res.status(200).json({
          email: user.email,
          token: token
        });
      } else {
        res.send({
          message: "invalid login!"
        });
      }
    });
  } catch (error) {
    res.status(403).json({
      message: "send request is wrong"
    });
  }
};

exports.register = (req, res) => {
  Users.findOne().then(user => {
    if (user.username != req.body.username) {
      if (user.email != req.body.email) {
        Users.create(req.body).then(data => {
          const token = jwt.sign(
            {
              id: data.id
            },
            "thisismysecretkey"
          );
          res.status(200).json({
            email: data.email,
            token: token
          });
        });
      } else {
        return res.status(404).json({
          message: "email already exist"
        });
      }
    } else {
      return res.status(404).json({
        message: "username already exist"
      });
    }
  });
};
