const configInterfacedNode = require('eslint-config-interfaced/overrides/node');
const configInterfacedMochaChai = require('eslint-config-interfaced/overrides/mocha-chai');

module.exports = {
	extends: 'eslint-config-interfaced',
	rules: {
		'no-else-return': 'off',
		'padded-blocks': 'off',
		'interfaced/props-order': 'off'
	},
	overrides: [
		{
			...configInterfacedNode,
			files: ['lib/**', 'test/**', 'index.js'],
			rules: {
				...configInterfacedNode.rules,
				'node/no-unpublished-require': 'off'
			}
		},
		{
			...configInterfacedMochaChai,
			files: ['test/**']
		}
	]
};
