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
    // users.hasMany(models.users, {
    //   as: "following",
    //   foreignKey: "following"
    // });
    users.belongsToMany(models.users, {
      through: models.follows,
      as: "user1",
      foreignKey: "following"
    });
    users.belongsToMany(models.users, {
      through: models.follows,
      as: "followers",
      foreignKey: "followers"
    });
  };
  return users;
};
