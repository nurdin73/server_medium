const Articles = require("../models/").articles;
const Users = require("../models/").users;
const Categories = require("../models/").categories;

const slug = text => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

const slugPrev = text => {
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

const articles = data => {
  const newArticle = data.map(item => {
    let newItem = {
      id: item.id,
      title: item.title,
      content: item.content,
      image: item.image,
      category: {
        id: item.category.id,
        name: item.category.name
      },
      user: {
        id: item.user.id,
        username: item.user.username
      },
      dateCreated: item.createdAt,
      slug: slug(item.title)
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
    category: {
      id: data.category.id,
      name: data.category.name
    },
    user: {
      id: data.user.id,
      username: data.user.username
    },
    dateCreated: data.createdAt,
    slug: slug(data.title)
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

exports.article = (req, res) => {
  console.log(slugPrev(req.params.title));
  Articles.findOne({
    where: {
      title: slugPrev(req.params.title),
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
          message: "success add article",
          data: data
        });
      });
    } else {
      return res.status(403).json({
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
