"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "articles",
      [
        {
          title: "8 books every manager should get their hands on",
          content:
            "Whether you are a new manager seeking to learn best practices or a seasoned professional who wants to optimize their team’s performance, there’s a book for you on this list.",
          image: "https://placeimg.com/640/480/any",
          category_id: 1,
          author_id: 1,
          is_published: true,
          is_archived: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "React: Communication Between Components",
          content:
            "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less",
          image: "https://placeimg.com/700/480/any",
          category_id: 2,
          author_id: 1,
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
    return queryInterface.bulkDelete("articles", null, {});
  }
};
