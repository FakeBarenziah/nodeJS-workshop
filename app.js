const bodyParser = require("body-parser");

const app = require("express")();

const path = require("path");

const visitorsRoutes = require("./routes/visitors");
const adminRoutes = require("./routes/admin");

const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(adminRoutes);
app.use(visitorsRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(PORT);
console.log(`http://localhost:${PORT}`);
