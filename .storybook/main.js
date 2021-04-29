const path = require('path');
module.exports = {
	webpackFinal: (config) => {
		const fileLoaderRule = config.module.rules.find((rule) =>
			rule.test.test('.svg')
		);
		fileLoaderRule.exclude = /\.svg$/;
		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack', 'url-loader'],
		});
		return {
			...config,
			resolve: {
				...config.resolve,
				alias: {
					src: path.resolve(__dirname, '../src'),
					app: path.resolve(__dirname, '../src/app/'),
				},
			},
		};
	},
	stories: [
		'../src/**/*.stories.mdx',
		'../src/**/*.stories.@(js|jsx|ts|tsx)',
	],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		{
			name: '@storybook/preset-scss',
			options: {
				cssLoaderOptions: {
					modules: {
						auto: true,
					},
				},
			},
		},
	],
};
