const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const Server = require('./../lib/index');

chai.use(chaiHttp);

describe('getVideo method', () => {
	const port = 8080;
	const baseUrl = `http://localhost:${port}`;
	const server = new Server(port);

	before(() => server.start());
	after(() => server.stop());

	it('Getting empty data after start', (done) => {
		chai
			.request(baseUrl)
			.get('/getVideo')
			.end((err, res) => {
				expect(err).to.be.null;

				expect(res).to.have.status(200);
				expect(res).to.be.json;
				expect(res.body).to.be.equal(null);

				done();
			});
	}).timeout(2000);

	it('Setting video1 and getting it back', (done) => {
		const video = {
			title: 'Video 1',
			url: 'https://example.com/video1'
		};

		chai
			.request(baseUrl)
			.get('/setVideo')
			.query(video)
			.then(() => {
				chai
					.request(baseUrl)
					.get('/getVideo')
					.end((err, res) => {
						expect(err).to.be.null;

						expect(res).to.have.status(200);
						expect(res).to.be.json;
						expect(res.body).to.deep.equal(video);

						done();
					});
			});
	}).timeout(2000);

	it('Setting video2 and getting it back', (done) => {
		const video = {
			title: 'Второе видео',
			url: 'https://example.com/videos/Second-Video_File.720.mp4?name=Второе видео&hash=pK1utFwqzWfTX'
		};

		chai
			.request(baseUrl)
			.get('/setVideo')
			.query(video)
			.then(() => {
				chai
					.request(baseUrl)
					.get('/getVideo')
					.end((err, res) => {
						expect(err).to.be.null;

						expect(res).to.have.status(200);
						expect(res).to.be.json;
						expect(res.body).to.deep.equal(video);

						done();
					});
			});
	}).timeout(2000);

	it('Setting empty data and get it back', (done) => {
		chai
			.request(baseUrl)
			.get('/setVideo')
			.then(() => {
				chai
					.request(baseUrl)
					.get('/getVideo')
					.end((err, res) => {
						expect(err).to.be.null;

						expect(res).to.have.status(200);
						expect(res).to.be.json;
						expect(res.body).to.be.equal(null);

						done();
					});
			});
	}).timeout(2000);

	it('Setting video3 and getting it back', (done) => {
		const video = {
			title: 'Video 3',
			url: 'https://example.com/video3'
		};

		chai
			.request(baseUrl)
			.get('/setVideo')
			.query(video)
			.then(() => {
				chai
					.request(baseUrl)
					.get('/getVideo')
					.end((err, res) => {
						expect(err).to.be.null;

						expect(res).to.have.status(200);
						expect(res).to.be.json;
						expect(res.body).to.deep.equal(video);

						done();
					});
			});
	}).timeout(2000);

	it('Getting error when setting data with another type', (done) => {
		const data = {
			id: '1234',
			name: 'John Doe',
			children: ['James', 'Judy']
		};

		chai
			.request(baseUrl)
			.get('/setVideo')
			.query(data)
			.end((err, res) => {
				expect(err).to.be.null;

				expect(res).to.have.status(400);

				done();
			});
	}).timeout(2000);

	it('Getting error when setting XSS data', (done) => {
		const video = {
			title: 'Dangerous <script>alert("!")</script> video',
			url: 'https://example.com/xss'
		};

		chai
			.request(baseUrl)
			.get('/setVideo')
			.query(video)
			.end((err, res) => {
				expect(err).to.be.null;

				expect(res).to.have.status(400);

				done();
			});
	}).timeout(2000);
});
