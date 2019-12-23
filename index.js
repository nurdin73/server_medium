require("express-group-routes");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const port = process.env.PORT || 5000;

app.use(express.json());

const { authorized, authenticated, validate } = require("./middelware");

const categoryControllers = require("./controllers/categories");
const authControllers = require("./controllers/auth");

app.get("/", (req, res) => {
  res.status(200).json("welcome to my api");
});

app.group("/api/v1", router => {
  router.get("/categories", categoryControllers.index);
  router.get("/category", categoryControllers.category);

  // auth
  router.post("/login", authControllers.index);
  router.post("/register", authControllers.register);
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
