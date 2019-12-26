const Categories = require("../models").categories;
const Articles = require("../models").articles;
const Users = require("../models").users;

// get all articles by user
const articles = data => {
  const newArticle = data.map(item => {
    let newItem = {
      id: item.id,
      title: item.title,
      content: item.content,
      image: item.image,
      category: item.category.name,
      user: item.user.fullname,
      username: item.user.username,
      dateCreated: item.createdAt
    };
    return newItem;
  });
  return newArticle;
};

exports.articles = (req, res) => {
  const { username } = req.params;
  Articles.findAll({
    attributes: {
      exclude: [
        "updatedAt",
        "category_id",
        "author_id",
        "is_published",
        "is_archived"
      ]
    },
    include: [
      {
        model: Categories,
        as: "category",
        attributes: {
          exclude: ["createdAt", "updatedAt", "is_published", "is_archived"]
        },
        where: {
          is_published: true,
          is_archived: false
        }
      },
      {
        model: Users,
        as: "user",
        where: {
          username: username
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "is_active", "password"]
        }
      }
    ]
  }).then(data => {
    res.status(200), res.send(articles(data));
  });
};

exports.user = (req, res) => {
  Users.findOne({
    where: {
      username: req.params.username
    }
  }).then(data => {
    res.status(200).json({
      fullname: data.fullname,
      username: data.username,
      email: data.email
    });
  });
};

exports.profile = (req, res) => {
  Users.findOne({
    where: {
      id: req.user_id
    }
  }).then(data => {
    res.status(200).json({
      id: data.id,
      username: data.username,
      fullname: data.fullname,
      initial: data.fullname[0],
      email: data.fullname
    });
  });
};

exports.userArticle = (req, res) => {
  Articles.findAll({
    where: {
      author_id: req.user_id,
      is_published: req.body.publish,
      is_archived: req.body.archive
    },
    include: [
      {
        model: Categories,
        as: "category"
      },
      {
        model: Users,
        as: "user"
      }
    ]
  }).then(article => {
    if (article != null) {
      res.status(200).json(articles(article));
    } else {
      res.status(404).json({
        message: "You have no article"
      });
    }
  });
};
