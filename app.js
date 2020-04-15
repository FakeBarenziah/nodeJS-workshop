const bodyParser = require("body-parser");

const app = require("express")();

const visitorsRoutes = require("./routes/visitors");
const adminRoutes = require("./routes/admin");

const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(visitorsRoutes);

app.get("/", (req, res, next) => {
  res.send(
    "<h1>Welcome</h1><a href='/messages'>View Messages</a><br><a href='/send-message'>Send a Message</a>"
  );
});

app.listen(PORT);
console.log(`http://localhost:${PORT}`);
