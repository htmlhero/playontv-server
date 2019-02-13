const Server = require('./lib/index');

const port = process.env.PORT || 8080;
const server = new Server(port);
server.start();
