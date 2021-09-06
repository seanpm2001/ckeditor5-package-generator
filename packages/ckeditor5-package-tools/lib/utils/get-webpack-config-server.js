'use strict';

/* eslint-env node */

const path = require( 'path' );
const { getPostCssConfig } = require( '@ckeditor/ckeditor5-dev-utils' ).styles;

module.exports = options => {
	return {
		mode: 'development',

		performance: {
			hints: false
		},

		entry: path.join( options.cwd, 'sample', 'script.js' ),

		output: {
			filename: 'script.dist.js',
			path: path.join( options.cwd, 'sample' )
		},

		optimization: {
			minimize: false
		},

		devServer: {
			static: {
				directory: path.join( options.cwd, 'sample' )
			},
			compress: true
		},

		module: {
			rules: [
				{
					test: /\.svg$/,
					use: [ 'raw-loader' ]
				},
				{
					test: /\.css$/,
					use: [
						{
							loader: 'style-loader',
							options: {
								injectType: 'singletonStyleTag',
								attributes: {
									'data-cke': true
								}
							}
						},
						'css-loader',
						{
							loader: 'postcss-loader',
							options: getPostCssConfig( {
								themeImporter: {
									themePath: require.resolve(
										path.join( options.cwd, 'node_modules', '@ckeditor', 'ckeditor5-theme-lark' )
									)
								},
								minify: true
							} )
						}
					]
				}
			]
		}
	};
};