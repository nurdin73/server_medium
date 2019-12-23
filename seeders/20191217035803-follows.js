"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "follows",
      [
        {
          user_id: 1,
          follows_user_id: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          user_id: 1,
          follows_user_id: 3,
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
