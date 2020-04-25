const bodyParser = require("body-parser");

const express = require("express");
const app = express();

const noMatch = require("./controllers/404.js");

app.set("view engine", "ejs");
app.set("views", "views");

const path = require("path");

const visitorsRoutes = require("./routes/visitors");
const adminRoutes = require("./routes/admin");

const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(visitorsRoutes);

app.use(noMatch);

app.listen(PORT);
console.log(`http://localhost:${PORT}`);
