"use strict";
module.exports = (sequelize, DataTypes) => {
  const follows = sequelize.define(
    "follows",
    {
      user_id: DataTypes.INTEGER,
      follows_user_id: DataTypes.INTEGER
    },
    {}
  );
  follows.associate = function(models) {
    // associations can be defined here
    // follows.belongsToMany(models.users, {
    //   through: "users",
    //   as: "following",
    //   foreignKey: "user_id"
    // });
    // follows.belongsToMany(models.users, {
    //   through: "users",
    //   as: "follower",
    //   foreignKey: ""
    // });
  };
  return follows;
};
