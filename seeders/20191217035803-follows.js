"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "follows",
      [
        {
          following: 1,
          followers: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          following: 1,
          followers: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("follows", null, {});
  }
};
