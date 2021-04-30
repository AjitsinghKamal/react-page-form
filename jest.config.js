// jest.config.js
module.exports = {
	preset: 'ts-jest',
	transform: {
		'.+\\.ts[x]$': 'ts-jest',
	},
	moduleFileExtensions: ['js', 'ts', 'tsx'],
	globals: {
		'ts-jest': {
			babelConfig: {
				presets: [
					[
						'@babel/preset-env',
						{
							targets: {
								node: 'current',
							},
						},
					],
					'babel-preset-vite',
				],
			},
		},
	},
	moduleNameMapper: {
		'^.+\\.(css|scss|png|jpg)$': 'identity-obj-proxy',
		'\\.svg$': '<rootDir>/__mocks__/svgr.ts',
	},
};
