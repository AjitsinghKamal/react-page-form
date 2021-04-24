import path from 'path';
import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [reactRefresh()],
	esbuild: {
		jsxInject: `import React from "react"`,
	},
	resolve: {
		alias: {
			app: path.resolve(__dirname, './src/app/'),
		},
	},
});
