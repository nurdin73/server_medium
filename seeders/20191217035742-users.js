"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "users",
      [
        {
          fullname: "John Doe",
          username: "@john_doe",
          email: "john_doe@gmail.com",
          password: 12345,
          is_active: true
        },
        {
          fullname: "Lisa",
          username: "@lisa",
          email: "lisa@gmail.com",
          password: 12345,
          is_active: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          fullname: "justin",
          username: "@justin",
          email: "justin@gmail.com",
          password: 12345,
          is_active: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  }
};
