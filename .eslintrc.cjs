module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'plugin:react-hooks/recommended',
	],
	ignorePatterns: ['dist', '.eslintrc.cjs', '*.config.ts'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.app.json',
	},
	plugins: ['react-refresh', '@typescript-eslint', 'react-compiler'],
	rules: {
		'@typescript-eslint/no-explicit-any': ['error'],
		'react-compiler/react-compiler': ['error'],
		'react-refresh/only-export-components': [
			'warn',
			{ allowConstantExport: true },
		],
	},
};
