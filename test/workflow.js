const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const Server = require('./../lib/index');

chai.use(chaiHttp);

describe('Workflow', () => {
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

	it('Async response, when at first was null', (done) => {
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

		setTimeout(() => {
			chai
				.request(baseUrl)
				.get('/setVideo')
				.query(video1)
				.end();
		}, 1000);
	}).timeout(2000);

	it('Async response, when at first was same data', (done) => {
		chai
			.request(baseUrl)
			.get('/getVideoUpdate')
			.query(video1)
			.end((err, res) => {
				expect(err).to.be.null;

				expect(res).to.have.status(200);
				expect(res).to.be.json;
				expect(res.body).to.deep.equal(video2);

				done();
			});

		setTimeout(() => {
			chai
				.request(baseUrl)
				.get('/setVideo')
				.query(video2)
				.end();
		}, 1000);
	}).timeout(2000);

	it('Immediately response, when data is new', (done) => {
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
});
