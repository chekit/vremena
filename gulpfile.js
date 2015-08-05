'use strict';

var gulp = require('gulp');

require('require-dir')('./gulp');

gulp.task('default', function () {
	gulp.start('build');
});

gulp.task('build', ['clean'], function () {
	gulp.start('fonts', 'sass', 'jade');
});

gulp.task('server', ['build'], function () {
	gulp.start('browser-sync', 'watch');
});