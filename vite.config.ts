import path from 'path';
import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import svgr from 'vite-plugin-svgr';
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [reactRefresh(), svgr()],
	esbuild: {
		jsxInject: `import React from "react"`,
	},
	resolve: {
		alias: {
			src: path.resolve(__dirname, './src/'),
			app: path.resolve(__dirname, './src/app/'),
		},
	},
});
