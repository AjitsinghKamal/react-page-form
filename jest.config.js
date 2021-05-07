// jest.config.js
module.exports = {
	preset: 'ts-jest/presets/default-esm',
	transform: {
		'.+\\.ts[x]$': 'ts-jest',
	},
	globals: {
		'ts-jest': {
			useESM: true,
			babelConfig: {
				presets: ['babel-preset-vite'],
			},
		},
	},
	moduleNameMapper: {
		'^.+\\.(css|scss|png|jpg)$': 'identity-obj-proxy',
		'\\.svg$': '<rootDir>/__mocks__/svgr.ts',
		'^src(.*)$': '<rootDir>/src$1',
		'^app/components': '<rootDir>/src/app/components/',
	},
	resetMocks: true,
	testEnvironment: 'jsdom',
};
