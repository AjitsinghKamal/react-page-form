// jest.config.js
module.exports = {
	moduleFileExtensions: ['js', 'ts', 'tsx'],
	transform: {
		'^.+\\.tsx': 'ts-jest',
	},
	moduleNameMapper: {
		'^.+\\.(css|scss|svg|png|jpg)$': 'identity-obj-proxy',
	},
	globals: {
		'ts-jest': {
			babelConfig: true,
		},
	},
};
