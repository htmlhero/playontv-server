#!/usr/bin/env node

const argv = require('yargs').argv;
const ip = require('ip');
const chalk = require('chalk');
const Server = require('./lib/index');

const port = argv.port || process.env.PORT || 8080;
const server = new Server(port);
server
	.start()
	.then(() => console.log(
		chalk`PlayOnTV server available on {yellow http://${ip.address()}:${port}}`
	));
