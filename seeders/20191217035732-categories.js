"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "categories",
      [
        {
          name: "Programming",
          is_published: true,
          is_archived: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Sport",
          is_published: true,
          is_archived: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Cooking",
          is_published: true,
          is_archived: false,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("categories", null, {});
  }
};
