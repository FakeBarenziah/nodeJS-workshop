const fs = require("fs");

const path = require("path");

const { promisify } = require("util");
const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);

const directory = path.join(
  path.dirname(process.mainModule.filename),
  "message_logs",
  "log.json"
);

module.exports = class Message {
  constructor(content) {
    this.message = content;
    this.time = new Date();
  }

  save() {
    fs.readFile(directory, (err, data) => {
      let logs = [];
      if (!err) {
        logs = JSON.parse(data);
      }
      logs.push(this);
      fs.writeFile(directory, JSON.stringify(logs), (err) =>
        console.error(err)
      );
    });
  }

  static fetchAll(cb) {
    fs.readFile(directory, (err, logs) => {
      if (err) {
        cb([]);
      } else {
        cb(JSON.parse(logs));
      }
    });
  }
};
