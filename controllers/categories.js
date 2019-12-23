const Categories = require("../models").categories;
const Users = require("../models").users;
const Articles = require("../models").articles;

const slug = text => {
  let text1 = text.split("-");
  for (let i = 0; i <= text1.length; i++) {
    return text1
      .toString()
      .toLowerCase()
      .replace("-", " ")
      .replace(/[^\w\-]+/g, " ")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  }
};

const details = data => {
  const newArticles = data.map(item => {
    let newItems = {
      id: item.id,
      title: item.title,
      content: item.content,
      image: item.image,
      category: slug(item.category.name),
      user: item.user.fullname
    };
    return newItems;
  });
  return newArticles;
};

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
      res.status(200).json(data);
    } catch (error) {
      res.status(403).json({
        message: "bad request"
      });
    }
  });
};

exports.category = (req, res) => {
  Categories.findOne({
    where: {
      id: req.params.id,
      is_published: true,
      is_archived: false
    },
    attributes: {
      exclude: ["createdAt", "updatedAt"]
    }
  }).then(data => {
    if (data === null) {
      return res.status(404).json({
        message: "data not found!"
      });
    }
    res.status(200).json(data);
  });
};

exports.detail = (req, res) => {
  Articles.findAll({
    include: [
      {
        model: Categories,
        as: "category",
        where: {
          name: slug(req.params.name)
        }
      },
      {
        model: Users,
        as: "user"
      }
    ]
  }).then(data => {
    if (data === null) {
      res.status(404).json({
        message: "data not found"
      });
    } else {
      res.status(200).json(details(data));
    }
  });
};

exports.addCategory = (req, res) => {
  Categories.create(req.body).then(data =>
    res.status(200).json({
      message: "success add category",
      data: {
        id: data.id,
        name: data.name
      }
    })
  );
};

exports.editCategory = (req, res) => {
  Categories.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(data => {
    if (data === 0) {
      res.status(406).json({
        message: "error something wrong"
      });
    }
    res.status(200).json({
      message: "update success",
      data
    });
  });
};

exports.delete = (req, res) => {
  Categories.destroy({
    where: {
      id: req.params.id
    }
  }).then(data => {
    if (data === 0) {
      res.status(406).json({
        message: "error something wrong"
      });
    }
    res.status(200).json({
      message: "delete success",
      data
    });
  });
};
