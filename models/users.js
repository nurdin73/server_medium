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

    // users.hasMany(models.follows, {
    //   as: "followers",
    //   foreignKey: "followers"
    // });

    users.belongsToMany(models.users, {
      through: "follows",
      foreignKey: "following",
      as: "following",
      sourceKey: "id"
    });

    users.belongsToMany(models.users, {
      through: "follows",
      foreignKey: "followers",
      as: "followed",
      sourceKey: "id"
    });
  };
  return users;
};
