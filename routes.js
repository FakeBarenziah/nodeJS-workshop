const fs = require("fs");

function requestHandler(req, res) {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Hi</title></head>");
    res.write("<body><form action='/message' method='POST'>");
    res.write(
      "<input type='text' name='formContent'><button type='submit'>Send</button>"
    );
    res.write("</form></body>");
    res.write("</html>");

    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", data => {
      body.push(data);
    });

    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      fs.writeFile(
        `message_logs/${Date.now()}.txt`,
        `${new Date()}: ${parsedBody.split("=")[1]}`,
        err => {
          if (err) throw Error(err);
          res.writeHead(302, { Location: "/" });
          return res.end();
        }
      );
    });
  }
  res.setHeader("Content-Type", "text'html");

  res.write("<html>");
  res.write("<head><title>Hi</title></head>");
  res.write(`I appreciate the ${req.method} request`);
  res.write("</html>");

  res.end();
}

module.exports = requestHandler;
