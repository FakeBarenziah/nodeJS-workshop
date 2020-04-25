const router = require("express").Router();

const path = require("path");

const userList = [];

router.get("/", (req, res, next) => {
  res.render("home", {
    docTitle: "New User Form",
    path: "/",
  });
});

router.post("/create-user", (req, res, next) => {
  const newUser = req.body.name;

  userList.push(newUser);

  res.redirect("/users");
});

router.get("/users", (req, res, next) => {
  console.log(userList);

  res.render("users", {
    docTitle: "Users",
    userList: userList,
    userListLength: userList.length,
    path: "/users",
  });
});

exports.routes = router;
exports.users = userList;
