const bodyParser = require("body-parser");

const express = require("express");
const app = express();

const expressHbs = require("express-handlebars");

app.engine("hbs", expressHbs());
// app.set("view engine", "pug");
app.set("view engine", "hbs");
app.set("views", "views/hbs");

const path = require("path");

const visitorsRoutes = require("./routes/visitors");
const adminRoutes = require("./routes/admin");

const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(adminRoutes);
app.use(visitorsRoutes);

app.use((req, res, next) => {
  res.status(404).render("404", { docTitle: "Page Not Found" });
});

app.listen(PORT);
console.log(`http://localhost:${PORT}`);
