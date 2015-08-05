'use strict'; 

var gulp = require('gulp'),
	watch = require('gulp-watch');

gulp.task('watch', function () {
	watch('src/sass/**/*.scss', function () {
		gulp.start('sass');
	});
	watch('src/jade/**/*.jade', function () {
		gulp.start('jade');
	});

	watch('bower.json', function () {
		gulp.start('wiredep');
	});
});