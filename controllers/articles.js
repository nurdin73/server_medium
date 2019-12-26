const Articles = require("../models/").articles;
const Users = require("../models/").users;
const Categories = require("../models/").categories;
const Sequelize = require("sequelize");
const slugify = require("slugify");

const articles = data => {
  const newArticle = data.map(item => {
    let newItem = {
      id: item.id,
      title: item.title,
      content: item.content,
      image: item.image,
      category_name: item.category.name,
      fullname: item.user.fullname,
      category: {
        id: item.category.id,
        name: item.category.name
      },
      user: {
        id: item.user.id,
        username: item.user.username
      },
      dateCreated: item.createdAt,
      slug: slugify(item.title)
    };
    return newItem;
  });
  return newArticle;
};

const detailArticle = data => {
  let newItem = {
    id: data.id,
    title: data.title,
    content: data.content,
    image: data.image,
    category_id: data.category.id,
    category_name: data.category.name,
    user_id: data.user.id,
    fullName: data.user.fullname,
    username: data.user.username,
    dateCreated: data.createdAt,
    slug: slugify(data.title)
  };
  return newItem;
};

exports.index = (req, res) => {
  Articles.findAll({
    where: {
      is_published: true,
      is_archived: false
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
  }).then(data => {
    if (data === null) {
      res.status(404).json({
        message: "data article not found"
      });
    } else {
      res.status(200).json(articles(data));
    }
  });
};

exports.popular = (req, res) => {
  Articles.findAll({
    limit: 10,
    order: [["id", "DESC"]],
    where: {
      is_published: true,
      is_archived: false
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
  }).then(data => {
    if (data === null) {
      res.status(404).json({
        message: "data article not found"
      });
    } else {
      res.status(200).json(articles(data));
    }
  });
};

exports.relatedArticle = (req, res) => {
  let listArticle = [];
  let allRelated = [];
  Articles.findOne({
    where: {
      title: slugify(req.params.title, " "),
      is_published: true,
      is_archived: false
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
    Articles.findAll({
      where: {
        category_id: article.category_id,
        is_published: true,
        is_archived: false
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
    }).then(related => {
      related.map(data => {
        allRelated.push(data.id);
      });
      Articles.findAll({
        where: {
          category_id: article.category_id,
          is_published: true,
          is_archived: false
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
        ],
        limit: 3,
        order: [Sequelize.fn("RAND")]
      }).then(related1 => {
        related1.map(data => {
          listArticle.push(data.id);
        });
        res.status(200).json(articles(related1));
      });
    });
  });
};

exports.article = (req, res) => {
  Articles.findOne({
    where: {
      title: slugify(req.params.title, " "),
      is_published: true,
      is_archived: false
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
  }).then(data => res.status(200).json(detailArticle(data)));
};

exports.post = (req, res) => {
  Articles.findOne().then(article => {
    if (req.body.title != article.title) {
      Articles.create({
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        category_id: req.body.category_id,
        author_id: req.user_id,
        is_published: true,
        is_archived: false
      }).then(data => {
        res.status(200).json({
          success: true,
          data: data
        });
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "title already exist"
      });
    }
  });
};

exports.patch = (req, res) => {
  const { id } = req.params;
  Articles.findOne().then(data => {
    if (data.author_id != req.user_id) {
      res.status(403).json({
        message: "you are forbidden to update this article"
      });
    } else {
      Articles.update(req.body, {
        where: {
          id: id
        }
      }).then(data =>
        res.send({
          message: "update success",
          Update: data
        })
      );
    }
  });
};

exports.delete = (req, res) => {
  const { id } = req.params;
  Articles.findOne({
    where: {
      id: id
    }
  }).then(data => {
    if (data.author_id != req.user_id) {
      res.status(403).json({
        message: "you are forbidden to update this article"
      });
    } else {
      Articles.destroy({
        where: {
          id: id
        }
      }).then(data => {
        res.send({
          message: "delete success",
          data
        });
      });
    }
  });
};
