const http = require("http");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text'html");

  res.write("<html>");
  res.write("<head><title>Hi</title></head>");
  res.write(`I appreciate the ${req.method} request`);
  res.write("</html>");

  res.end();
});

server.listen(5000);
