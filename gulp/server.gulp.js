'use strict';

var gulp = require('gulp'),
	browserSync = require('browser-sync').create();

var files = [
	'./src/css/**/*.css',
	'./src/*.html'
];

gulp.task('browser-sync', function () {
	browserSync.init({
		startPath: '/',
		server: {
			baseDir: './src/'
		},
		files: files
	});
});