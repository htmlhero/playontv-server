const LongPolling = require('./long-polling');


/**
 */
module.exports = class Server extends LongPolling {
	/**
	 * @param {number} port
	 */
	constructor(port) {
		super({
			port,
			routes: {
				setData: '/setVideo',
				getData: '/getVideo',
				getDataUpdate: '/getVideoUpdate'
			}
		});
	}
};
