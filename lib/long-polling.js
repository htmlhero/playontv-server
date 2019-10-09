const EventEmitter = require('events');
const express = require('express');
const isEmpty = require('lodash/isEmpty');
const isEqual = require('lodash/isEqual');


/**
 */
module.exports = class LongPolling extends EventEmitter {
	/**
	 * @param {{
	 *     port: number,
	 *     routes: {
	 *         setData: string,
	 *         getData: string,
	 *         getDataUpdate: string
	 *     }
	 * }} params
	 */
	constructor(params) {
		super();

		/**
		 * Fired with: nothing
		 * @const {string}
		 */
		this.EVENT_DATA_SAVED = 'data-saved';

		/**
		 * @type {number}
		 * @protected
		 */
		this._port = params.port;

		/**
		 * @type {?http.Server}
		 * @protected
		 */
		this._server = null;

		/**
		 * @type {?Object}
		 * @protected
		 */
		this._data = null;

		/**
		 * @type {Object}
		 * @protected
		 */
		this._connectionList = {};

		/**
		 * @type {Function}
		 * @protected
		 */
		this._app = express();
		this._app.disable('x-powered-by');

		this._app.get(params.routes.setData, this._onSetData.bind(this));
		this._app.get(params.routes.getData, this._onGetData.bind(this));
		this._app.get(params.routes.getDataUpdate, this._onGetDataUpdate.bind(this));
	}

	/**
	 * @return {Promise}
	 */
	start() {
		return new Promise((resolve) => {
			this._server = this._app.listen(this._port, resolve);

			this._server.on('connection', (connection) => {
				const id = connection.remoteAddress + ':' + connection.remotePort;
				this._connectionList[id] = connection;

				connection.on('close', () => {
					delete this._connectionList[id];
				});
			});
		});
	}

	/**
	 * @return {Promise}
	 */
	stop() {
		return new Promise((resolve, reject) => {
			if (this._server) {
				Object
					.values(this._connectionList)
					.forEach((connection) => connection.destroy());

				this._server.close(resolve);
			} else {
				reject(new Error('Server does not started yet'));
			}
		});
	}

	/**
	 * @abstract
	 * @param {?Object} data
	 * @return {boolean}
	 * @protected
	 */
	_shouldSetData(data) {
		return true;
	}

	/**
	 * @param {?Object} getterData
	 * @param {?Object} savedData
	 * @return {boolean}
	 * @protected
	 */
	_shouldUpdateData(getterData, savedData) {
		return Boolean(
			(!getterData && savedData) ||
			(getterData && savedData && !isEqual(getterData, savedData))
		);
	}

	/**
	 * @param {*} req
	 * @param {*} res
	 * @protected
	 */
	_onSetData(req, res) {
		let data = req.query;
		data = isEmpty(data) ? null : data;

		if (this._shouldSetData(data)) {
			console.log(`Data accepted: ${JSON.stringify(data)}`);

			this._data = data;
			this.emit(this.EVENT_DATA_SAVED);
		} else {
			console.log(`Data declined: ${JSON.stringify(data)}`);

			res.status(400);
		}

		res.end();
	}

	/**
	 * @param {*} req
	 * @param {*} res
	 * @protected
	 */
	_onGetData(req, res) {
		res.json(this._data);
	}

	/**
	 * @param {*} req
	 * @param {*} res
	 * @protected
	 */
	_onGetDataUpdate(req, res) {
		let data = req.query;
		data = isEmpty(data) ? null : data;

		const updateData = () => {
			res.json(this._data);
		};

		if (this._shouldUpdateData(data, this._data)) {
			updateData();
		} else {
			this.once(this.EVENT_DATA_SAVED, () => {
				if (this._shouldUpdateData(data, this._data)) {
					updateData();
				}
			});
		}
	}
};
