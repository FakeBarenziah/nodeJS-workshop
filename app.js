const fs = require("fs");
const { promisify } = require("util");
const bodyParser = require("body-parser");

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const app = require("express")();

const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: false }));

const readMessageLogs = async () => {
  const data = {};

  const files = await readdir("message_logs");

  for (let i = 0; i < files.length; i++) {
    data[files[i]] = await readFile(`message_logs/${files[i]}`, "utf8");
  }

  return data;
};

app.use("/send-message", (req, res, next) => {
  res.send(
    "<h1>Message Form</h1><a href='/'>Home</a><h4>Type a Message</h4><form action='/create-message' method='POST'><input type='text' name='message'><button type='submit'>Submit</button></form>"
  );
});

app.use("/users", (req, res, next) => {
  readMessageLogs().then(data => {
    console.log(data);
    res.json(data);
  });
});

app.use("/", (req, res, next) => {
  res.send(
    "<h1>Welcome</h1><a href='/messages'>View Messages</a><br><a href='/send-message'>Send a Message</a>"
  );
});

app.listen(PORT);
console.log(`http://localhost:${PORT}`);
