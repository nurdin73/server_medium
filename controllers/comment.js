const Articles = require("../models/").articles;
const Users = require("../models/").users;
const Comments = require("../models/").comments;

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

const comments = data => {
  const newComment = data.map(item => {
    let newItem = {
      id: item.id,
      article: {
        id: item.article.id,
        title: item.article.title
      },
      user: {
        id: item.user.id,
        name: item.user.username
      },
      comment: item.comment
    };
    return newItem;
  });
  return newComment;
};

exports.index = (req, res) => {
  Comments.findAll({
    include: [
      {
        model: Articles,
        as: "article",
        where: {
          title: slugPrev(req.params.title)
        }
      },
      {
        model: Users,
        as: "user"
      }
    ]
  }).then(data => {
    res.status(200).json(comments(data));
  });
};

exports.addComment = (req, res) => {
  Articles.findOne({
    where: {
      id: req.body.article_id
    }
  }).then(article => {
    Comments.create({
      article_id: req.body.article_id,
      user_id: req.user_id,
      comment: req.body.comment
    }).then(data =>
      res.status(200).json({
        id: data.id,
        comment: data.comment,
        article: {
          id: article.id,
          title: article.title
        }
      })
    );
  });
};

exports.update = (req, res) => {
  Comments.findOne({
    where: {
      id: req.params.id
    }
  }).then(comment => {
    if (comment.user_id != req.user_id) {
      return res.status(403).json({
        message: "you are forbidden to update this comment"
      });
    } else {
      Comments.update(req.body, {
        where: {
          id: req.params.id
        }
      }).then(data => {
        Articles.findOne({
          where: {
            title: slugPrev(req.params.title)
          }
        }).then(article => {
          res.status(200).json({
            id: comment.id,
            data: req.body.comment,
            article: {
              id: article.id,
              title: article.title
            }
          });
        });
      });
    }
  });
};

exports.delete = (req, res) => {
  Comments.findOne({
    where: {
      id: req.params.id
    }
  }).then(comment => {
    if (comment.user_id != req.user_id) {
      return res.status(403).json({
        message: "you are forbidden to delete this comment"
      });
    } else {
      Comments.destroy({
        where: {
          id: req.params.id
        }
      }).then(data => {
        if (data === 0) {
          res.status(404).json({
            message: `Error`,
            status: data
          });
        } else {
          res.status(200).json({
            message: `Delete comment id: ${comment.id} is success`,
            status: data
          });
        }
      });
    }
  });
};
