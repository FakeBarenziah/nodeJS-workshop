const fs = require("fs");
const { promisify } = require("util");
const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);

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
          time: time.slice(0, time.length - 1),
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
};
