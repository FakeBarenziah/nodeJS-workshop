const fs = require("fs");
const { promisify } = require("util");
const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const rmdir = promisify(fs.rmdir);

const readMessageLogs = async (filename) => {
  const data = {};

  const folders = await readdir("message_logs");

  for (let j = 0; j < folders.length; j++) {
    const path = `message_logs/${folders[j]}`;
    const files = await readdir(path);
    for (let i = 0; i < files.length; i++) {
      if (files[i] === filename) {
        try {
          fs.unlinkSync(path + `/${files[i]}`);
        } catch (err) {
          throw Error(err);
        }
        return;
      } else {
        data[files[i]] = await readFile(path + `/${files[i]}`, "utf8");
      }
    }
    if (files.length === 0) {
      await rmdir(path);
    }
  }

  return data;
};

module.exports = class Message {
  constructor(content) {
    this.content = content;
  }

  save() {
    const thisDate = new Date();
    const directory = `message_logs/${thisDate.getDate()}-${
      thisDate.getMonth() + 1
    }-${thisDate.getFullYear()}`;

    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory);
    }

    fs.writeFile(
      `${directory}/${thisDate.valueOf()}.txt`,
      `${thisDate}: ${this.content}`,
      (err) => {
        if (err) throw Error(err);
      }
    );
  }

  static async fetchAll() {
    const data = await readMessageLogs();
    const messageList = Object.keys(data)
      .map((each) => {
        const time = data[each].match(/^.*:.*:.*:/).toString();
        return {
          title: each,
          time: time.slice(0, time.length - 34),
          message: data[each].slice(time.length),
        };
      })
      .sort((a, b) => {
        const first = Number(a.title.match(/^[0-9]+/));
        const second = Number(b.title.match(/^[0-9]+/));
        return first - second;
      });
    return messageList;
  }

  static async removeFile(filename) {
    await readMessageLogs(filename);
  }
};
