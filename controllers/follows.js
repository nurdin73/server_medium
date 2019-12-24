const Articles = require("../models/").articles;
const Users = require("../models/").users;
const Follows = require("../models/").follows;

exports.index = (req, res) => {
  Follows.findAll({
    include: [
      {
        model: Users
      },
      {
        model: Users
      }
    ]
  }).then(data => {
    res.status(200).json(data);
  });
};

exports.post = (req, res) => {
  if (req.body.following === req.user_id) {
    return res.status(403).send({
      message: "you cant follow your ID"
    });
  }
  Users.findOne({
    where: {
      id: req.body.following
    }
  }).then(user => {
    Follows.create({
      following: req.body.following,
      followers: req.user_id
    }).then(data => {
      res.status(200).json({
        id: data.id,
        user: {
          id: user.id,
          email: user.email
        }
      });
    });
  });
};
