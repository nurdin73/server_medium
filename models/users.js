"use strict";
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    "users",
    {
      fullname: DataTypes.STRING,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      is_active: DataTypes.BOOLEAN
    },
    {}
  );
  users.associate = function(models) {
    users.hasMany(models.articles, {
      as: "user",
      foreignKey: "author_id"
    });

    users.belongsToMany(models.users, {
      foreignKey: "user_id",
      through: models.follows,
      as: "following",
      sourceKey: "id"
    });

    // users.belongsToMany(models.users, {
    //   foreignKey: "follows_user_id",
    //   through: "follows",
    //   as: "followed",
    //   sourceKey: "id"
    // });
  };
  return users;
};
