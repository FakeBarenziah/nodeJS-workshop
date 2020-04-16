const bodyParser = require("body-parser");

const express = require("express");
const app = express();

app.set("view engine", "pug");
app.set("views", "views");

const path = require("path");

const visitorsRoutes = require("./routes/visitors");
const adminRoutes = require("./routes/admin");

const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(adminRoutes);
app.use(visitorsRoutes);

app.use((req, res, next) => {
  res.status(404).render("404");
});

app.listen(PORT);
console.log(`http://localhost:${PORT}`);
