"use strict";
module.exports = (sequelize, DataTypes) => {
  const follows = sequelize.define(
    "follows",
    {
      following: DataTypes.INTEGER,
      followers: DataTypes.INTEGER
    },
    {}
  );
  follows.associate = function(models) {
    // associations can be defined here
    follows.belongsTo(models.users, {
      foreignKey: "following",
      sourceKey: "id"
    });
    follows.belongsTo(models.users, {
      foreignKey: "followers",
      sourceKey: "id"
    });
  };
  return follows;
};
