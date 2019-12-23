"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "comments",
      [
        {
          article_id: 1,
          user_id: 1,
          comment:
            "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          article_id: 1,
          user_id: 2,
          comment:
            "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("comments", null, {});
  }
};
