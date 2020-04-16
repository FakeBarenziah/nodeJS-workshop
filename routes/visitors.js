const router = require("express").Router();

const fs = require("fs");
const { promisify } = require("util");
const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);

const path = require("path");

const readMessageLogs = async () => {
  const data = {};

  const folders = await readdir("message_logs");

  for (let j = 0; j < folders.length; j++) {
    const files = await readdir(`message_logs/${folders[j]}`);
    for (let i = 0; i < files.length; i++) {
      data[files[i]] = await readFile(
        `message_logs/${folders[j]}/${files[i]}`,
        "utf8"
      );
    }
  }

  return data;
};

router.get("/send-message", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "views", "create-message.html"));
});

router.post("/create-message", (req, res, next) => {
  const thisDate = new Date();
  const directory = `message_logs/${thisDate.getDate()}-${thisDate.getMonth() +
    1}-${thisDate.getFullYear()}`;

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }

  fs.writeFile(
    `${directory}/${thisDate.valueOf()}.txt`,
    `${thisDate}: ${req.body.message}`,
    err => {
      if (err) throw Error(err);
    }
  );
  res.redirect("/messages");
});

router.get("/messages", (req, res, next) => {
  readMessageLogs().then(data => {
    const dataTable = Object.keys(data)
      .map(each => {
        const time = data[each].match(/^.*:.*:.*:/).toString();
        return `<tr><td>${each}</td><td>${time}</td><td>${data[each].slice(
          time.length
        )}</td></tr>`;
      })
      .join("");
    res.send(
      `<h1>Message Logs</h1><a href='/'>Home</a><br><a href='/send-message'>Send a Message</a><br>${
        dataTable.length
          ? `<table style='width:90%'><tr><th>File</th><th>Time</th><th>Content</th>${dataTable}</table>`
          : "<p>Message log is empty</p>"
      }`
    );
  });
});

router.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "views", "home.html"));
});

module.exports = router;
