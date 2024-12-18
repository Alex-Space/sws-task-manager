module.exports = {
	env: {
		es2021: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
		'prettier',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint', 'prettier'],
	rules: {
		'no-var': 'error',
		'@typescript-eslint/no-empty-interface': 0,
		'@typescript-eslint/no-unused-vars': ['off'],
		'@typescript-eslint/ban-types': 'off',
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/ban-ts-ignore': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/explicit-function-return-type': ['warn'],
		'@typescript-eslint/no-empty-object-type': ['off'],
		'prettier/prettier': [
			'error',
			{
				semi: true,
				singleQuote: true,
				tabWidth: 4,
				useTabs: true,
				trailingComma: 'all',
				bracketSpacing: true,
				printWidth: 100,
				endOfLine: 'auto',
			},
		],
	},
};
