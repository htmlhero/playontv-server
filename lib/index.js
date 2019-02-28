const sanitizeHtml = require('sanitize-html');
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

	/**
	 * @override
	 */
	_shouldSetData(data) {
		if (!data) {
			return true;
		}

		if (!data.url) {
			return false;
		}

		if (!data.title) {
			return true;
		} else {
			return data.title === sanitizeHtml(data.title, {
				allowedTags: [],
				allowedAttributes: {}
			});
		}
	}
};
