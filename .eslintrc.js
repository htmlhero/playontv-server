module.exports = {
	extends: 'interfaced',
	overrides: [{
		files: ['lib/**', 'test/**', 'index.js'],
		extends: 'interfaced/node',
		rules: {
			'no-else-return': 'off',
			'padded-blocks': 'off',
			'interfaced/props-order': 'off',
		}
	}, {
		files: ['test/**'],
		extends: 'interfaced/mocha-chai'
	}]
};
