const Articles = require("../models/").articles;
const Users = require("../models/").users;
const Follows = require("../models/").follows;

const follows = data => {
  const newFollows = data.followers.map(following => {
    let newItem = {};
  });
};

exports.index = (req, res) => {
  Users.findAll({
    include: [
      {
        model: Users,
        as: "followers"
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
    Follows.findOne({
      where: {
        following: req.body.following
      }
    }).then(follow => {
      if (follow === null) {
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
      } else {
        res.status(403).json({
          message: "You have followed this user!"
        });
      }
    });
  });
};

exports.delete = (req, res) => {
  Follows.findOne({
    where: {
      id: req.params.id
    }
  }).then(follow => {
    if (follow.followers != req.user_id) {
      res.status(403).json({
        message: "You forbidden on this action"
      });
    } else {
      Follows.destroy({
        where: {
          id: req.params.id
        }
      }).then(data => {
        if (data === 0) {
          res.status(404).json({
            message: "error",
            status: data
          });
        } else {
          res.status(200).json({
            message: `Unfollow user id: ${follow.id} is success`,
            status: data
          });
        }
      });
    }
  });
};
