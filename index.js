require("express-group-routes");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const port = process.env.PORT || 5000;

app.use(express.json());

const { authorized, authenticated, validate } = require("./middelware");

const categoryControllers = require("./controllers/categories");
const articleControllers = require("./controllers/articles");
const userControllers = require("./controllers/user");
const commentControllers = require("./controllers/comment");
const followsControllers = require("./controllers/follows");
const authControllers = require("./controllers/auth");

app.get("/", (req, res) => {
  res.status(200).json("welcome to my api");
});

app.group("/api/v1", router => {
  // categories
  router.get("/categories", categoryControllers.index);
  router.get("/category/:id", categoryControllers.category);
  router.get("/category/:name/articles", categoryControllers.detail);
  router.post("/category", authenticated, categoryControllers.addCategory);
  router.patch(
    "/category/:id",
    authenticated,
    categoryControllers.editCategory
  );
  router.delete("/category/:id", authenticated, categoryControllers.delete);

  // article
  router.get("/articles", articleControllers.index);
  router.get("/articles/latest", articleControllers.popular);
  router.get("/article/:title", articleControllers.article);
  router.get("/article/:title/related", articleControllers.relatedArticle);
  router.post("/article", authenticated, articleControllers.post);
  router.patch("/article/:id", authenticated, articleControllers.patch);
  router.delete("/article/:id", authenticated, articleControllers.delete);

  // user
  router.get("/user/:username/articles", userControllers.articles);

  // comment
  router.get("/article/:title/comments", commentControllers.index);
  router.post("/comment", authenticated, commentControllers.addComment);
  router.patch(
    "/article/:title/comment/:id",
    authenticated,
    commentControllers.update
  );
  router.delete(
    "/article/:title/comment/:id",
    authenticated,
    commentControllers.delete
  );

  // follow
  router.get("/follows", authenticated, followsControllers.index);
  router.post("/follow", authenticated, followsControllers.post);

  // auth
  router.post("/login", authControllers.index);
  router.post("/register", authControllers.register);
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
