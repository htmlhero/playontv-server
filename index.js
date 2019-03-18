#!/usr/bin/env node

const Server = require('./lib/index');

const port = process.env.PORT || 8080;
const server = new Server(port);
server
	.start()
	.then(() => console.log(`PlayOnTV server started at port ${port}`));
