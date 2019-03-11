const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const Server = require('./../lib/index');

chai.use(chaiHttp);

describe('getVideoUpdate method', () => {
	const port = 8080;
	const baseUrl = `http://localhost:${port}`;
	const server = new Server(port);

	before(() => server.start());
	after(() => server.stop());

	const video1 = {
		title: 'Video 1',
		url: 'https://example.com/video1'
	};
	const video2 = {
		title: 'Video 2',
		url: 'https://example.com/video2'
	};
	const video3 = {
		title: 'Video 3',
		url: 'https://example.com/video3'
	};

	describe('Initial state', () => {
		it('Getting infinite long response after start', (done) => {
			const timeout = 1500;

			chai
				.request(baseUrl)
				.get('/getVideoUpdate')
				.timeout(timeout)
				.end((err, res) => {
					expect(err).to.not.be.null;
					expect(err.timeout).to.be.equal(timeout);

					expect(res).to.be.undefined;

					done();
				});
		}).timeout(2000);
	});

	describe('Setting video1', () => {
		before(() => chai
			.request(baseUrl)
			.get('/setVideo')
			.query(video1)
		);

		it('Getting video1 when sending empty data', (done) => {
			chai
				.request(baseUrl)
				.get('/getVideoUpdate')
				.end((err, res) => {
					expect(err).to.be.null;

					expect(res).to.have.status(200);
					expect(res).to.be.json;
					expect(res.body).to.deep.equal(video1);

					done();
				});
		}).timeout(2000);

		it('Getting infinite long response when sending video1', (done) => {
			const timeout = 1500;

			chai
				.request(baseUrl)
				.get('/getVideoUpdate')
				.query(video1)
				.timeout(timeout)
				.end((err, res) => {
					expect(err).to.not.be.null;
					expect(err.timeout).to.be.equal(timeout);

					expect(res).to.be.undefined;

					done();
				});
		}).timeout(2000);

		it('Getting video1 when sending video2', (done) => {
			chai
				.request(baseUrl)
				.get('/getVideoUpdate')
				.query(video2)
				.end((err, res) => {
					expect(err).to.be.null;

					expect(res).to.have.status(200);
					expect(res).to.be.json;
					expect(res.body).to.deep.equal(video1);

					done();
				});
		}).timeout(2000);
	});

	describe('Setting video2', () => {
		before(() => chai
			.request(baseUrl)
			.get('/setVideo')
			.query(video2)
		);

		it('Getting video2 when sending empty data', (done) => {
			chai
				.request(baseUrl)
				.get('/getVideoUpdate')
				.end((err, res) => {
					expect(err).to.be.null;

					expect(res).to.have.status(200);
					expect(res).to.be.json;
					expect(res.body).to.deep.equal(video2);

					done();
				});
		}).timeout(2000);

		it('Getting infinite long response when sending video2', (done) => {
			const timeout = 1500;

			chai
				.request(baseUrl)
				.get('/getVideoUpdate')
				.query(video2)
				.timeout(timeout)
				.end((err, res) => {
					expect(err).to.not.be.null;
					expect(err.timeout).to.be.equal(timeout);

					expect(res).to.be.undefined;

					done();
				});
		}).timeout(2000);

		it('Getting video2 when sending video3', (done) => {
			chai
				.request(baseUrl)
				.get('/getVideoUpdate')
				.query(video3)
				.end((err, res) => {
					expect(err).to.be.null;

					expect(res).to.have.status(200);
					expect(res).to.be.json;
					expect(res.body).to.deep.equal(video2);

					done();
				});
		}).timeout(2000);
	});

	describe('Setting empty data', () => {
		before(() => chai
			.request(baseUrl)
			.get('/setVideo')
		);

		it('Getting infinite long response when sending empty data', (done) => {
			const timeout = 1500;

			chai
				.request(baseUrl)
				.get('/getVideoUpdate')
				.timeout(timeout)
				.end((err, res) => {
					expect(err).to.not.be.null;
					expect(err.timeout).to.be.equal(timeout);

					expect(res).to.be.undefined;

					done();
				});
		}).timeout(2000);

		it('Getting infinite long response when sending video1', (done) => {
			const timeout = 1500;

			chai
				.request(baseUrl)
				.get('/getVideoUpdate')
				.query(video1)
				.timeout(timeout)
				.end((err, res) => {
					expect(err).to.not.be.null;
					expect(err.timeout).to.be.equal(timeout);

					expect(res).to.be.undefined;

					done();
				});
		}).timeout(2000);
	});

	describe('Setting video3', () => {
		before(() => chai
			.request(baseUrl)
			.get('/setVideo')
			.query(video3)
		);

		it('Getting infinite long response when sending video3', (done) => {
			const timeout = 1500;

			chai
				.request(baseUrl)
				.get('/getVideoUpdate')
				.query(video3)
				.timeout(timeout)
				.end((err, res) => {
					expect(err).to.not.be.null;
					expect(err.timeout).to.be.equal(timeout);

					expect(res).to.be.undefined;

					done();
				});
		}).timeout(2000);

		it('Getting video3 when sending empty data', (done) => {
			chai
				.request(baseUrl)
				.get('/getVideoUpdate')
				.end((err, res) => {
					expect(err).to.be.null;

					expect(res).to.have.status(200);
					expect(res).to.be.json;
					expect(res.body).to.deep.equal(video3);

					done();
				});
		}).timeout(2000);

		it('Getting video3 when sending video1', (done) => {
			chai
				.request(baseUrl)
				.get('/getVideoUpdate')
				.query(video1)
				.end((err, res) => {
					expect(err).to.be.null;

					expect(res).to.have.status(200);
					expect(res).to.be.json;
					expect(res.body).to.deep.equal(video3);

					done();
				});
		}).timeout(2000);
	});
});
