const express = require("express");
const app = express();

app.use((req, res, next) => {
  const something = req.rawHeaders;
  res.send(something);
  next();
});

const PORT = 5000;

app.listen(PORT);
console.log(`http://localhost:${PORT}`);
