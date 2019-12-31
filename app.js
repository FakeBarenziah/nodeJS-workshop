const http = require("http");

const routes = require("./routes");

const server = http.createServer(routes);

const PORT = 5000

server.listen(PORT);
console.log(`http://localhost:${PORT}`)