// jest.config.js
module.exports = {
	moduleFileExtensions: ['js', 'ts', 'tsx'],
	transform: {
		'^.+\\.ts': 'ts-jest',
	},
	globals: {
		'ts-jest': {
			tsconfig: './tsconfig.json',
		},
	},
};
