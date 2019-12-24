const Articles = require("../models/").articles;
const Users = require("../models/").users;
const Follows = require("../models/").follows;

exports.index = (req, res) => {
  Follows.findAll({
    include: [
      {
        model: Users,
        as: "following"
      }
    ]
  }).then(data => {
    res.status(200).json(data);
  });
};
