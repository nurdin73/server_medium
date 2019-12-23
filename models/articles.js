"use strict";
module.exports = (sequelize, DataTypes) => {
  const articles = sequelize.define(
    "articles",
    {
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      image: DataTypes.STRING,
      category_id: DataTypes.INTEGER,
      author_id: DataTypes.INTEGER,
      is_published: DataTypes.BOOLEAN,
      is_archived: DataTypes.BOOLEAN
    },
    {}
  );
  articles.associate = function(models) {
    articles.belongsTo(models.categories, {
      foreignKey: "category_id",
      sourceKey: "name"
    });
    articles.belongsTo(models.users, {
      foreignKey: "author_id",
      sourceKey: "fullname"
    });
    articles.hasMany(models.comments, {
      foreignKey: "article_id",
      as: "comment"
    });
  };
  return articles;
};
