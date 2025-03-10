import react from '@vitejs/plugin-react';
import { defineConfig } from 'cypress';
import vitePreprocessor from 'cypress-vite';
import { defineConfig as defineViteConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const viteConfig = defineViteConfig({
	server: {
		warmup: {
			clientFiles: ['src/client/**/*.ts', 'src/client/**/*.tsx', 'cypress/**'],
		},
	},
	plugins: [
		tsconfigPaths(),
		react({
			jsxImportSource: '@emotion/react',
		}),
	],
});

export default defineConfig({
	projectId: 'ucnqdt',
	video: false,
	requestTimeout: 10000,
	defaultCommandTimeout: 10000,
	experimentalMemoryManagement: true,

	retries: {
		runMode: 2,
		openMode: 0,
	},

	e2e: {
		excludeSpecPattern: process.env.CI ? ['cypress/e2e/all.test.ts'] : [],
		setupNodeEvents(on, _config) {
			on('file:preprocessor', vitePreprocessor(viteConfig));
		},
		baseUrl: 'http://localhost:9042',
		specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
	},

	component: {
		// experimentalJustInTimeCompile: true,
		supportFile: './cypress/support/component.tsx',
		devServer: {
			framework: 'react',
			bundler: 'vite',
			viteConfig,
		},
	},
});
