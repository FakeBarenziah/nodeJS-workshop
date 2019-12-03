const http = require("http");

const htmlSamples = require("./htmlSamples.js");

const rootHTML = htmlSamples.root;
const usersHTML = htmlSamples.users;

const server = http.createServer((req, res) => {
  console.log(req.headers.cookie);
  if (req.url === "/") {
    res.write(rootHTML);
    return res.end();
  }
  if (req.url === "/users") {
    res.write(usersHTML);
    return res.end();
  }
  if (req.url === "/create-user" && req.method === "POST") {
    const body = [];
    req.on("data", data => {
      body.push(data);
    });
    return req.on("end", () => {
      const parse = Buffer.concat(body).toString();
      console.log(parse.split("=")[1]);
      res.writeHead(302, { Location: "/" });
      return res.end();
    });
  }
});

server.listen(3000);
