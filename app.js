const bodyParser = require("body-parser");

const app = require("express")();

const visitorsRoutes = require("./routes/visitors");
const adminRoutes = require("./routes/admin");

const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(adminRoutes);
app.use(visitorsRoutes);

app.use((req, res, next) => {
  res.status(404).send("This URL was not found.");
});

app.listen(PORT);
console.log(`http://localhost:${PORT}`);
