const bodyParser = require("body-parser");

const express = require("express");
const app = express();

app.set("view engine", "pug");
app.set("views", "assignment4/views");

const path = require("path");

const routeData = require("./routes");

const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routeData.routes);

app.use((req, res, next) => {
  res.status(404).render("404", { docTitle: "Page Not Found" });
});

app.listen(PORT);
console.log(`http://localhost:${PORT}`);
