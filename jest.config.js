// jest.config.js
module.exports = {
	moduleFileExtensions: ['js', 'ts', 'tsx'],
	transform: {
		'^.+\\.tsx': 'ts-jest',
	},
	moduleNameMapper: {
		'^.+\\.(css|scss)$': 'identity-obj-proxy',
	},
	globals: {
		'ts-jest': {
			babelConfig: true,
		},
	},
};
