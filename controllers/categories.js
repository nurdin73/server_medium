const Categories = require("../models").categories;
exports.index = (req, res) => {
  Categories.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"]
    },
    where: {
      is_published: true,
      is_archived: false
    }
  }).then(data => {
    try {
      res.status(200).json({
        message: "success",
        data: data
      });
    } catch (error) {
      res.status(403).json({
        message: "bad request"
      });
    }
  });
};

exports.category = (req, res) => {
  Categories.findOne({
    where: {}
  });
};
