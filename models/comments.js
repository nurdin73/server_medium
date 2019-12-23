"use strict";
module.exports = (sequelize, DataTypes) => {
  const comments = sequelize.define(
    "comments",
    {
      article_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      comment: DataTypes.TEXT
    },
    {}
  );
  comments.associate = function(models) {
    // associations can be defined here
    comments.belongsTo(models.articles, {
      foreignKey: "article_id",
      as: "article",
      sourceKey: "id"
    });
    comments.belongsTo(models.users, {
      foreignKey: "user_id",
      as: "user"
    });
  };
  return comments;
};
