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
    follows.hasMany(models.users, {
      foreignKey: "user_id",
      as: "following"
    });
  };
  return follows;
};
