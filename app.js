const fs = require("fs");
const { promisify } = require("util");

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const app = require("express")();

const PORT = 5000;

const readMessageLogs = async () => {
  const data = {};

  const files = await readdir("message_logs");

  for (let i = 0; i < files.length; i++) {
    const text = await readFile(`message_logs/${files[i]}`, "utf8");
    data[files[i]] = text;
  }

  return data;
};

app.use("/send-message", (req, res, next) => {
  res.send("<h1>Send a Message Here</h1>");
});

app.use("/users", (req, res, next) => {
  readMessageLogs().then(data => {
    console.log(data);
    res.json(data);
  });
});

app.use("/", (req, res, next) => {
  res.send("<h1>Welcome</h1>");
});

app.listen(PORT);
console.log(`http://localhost:${PORT}`);
