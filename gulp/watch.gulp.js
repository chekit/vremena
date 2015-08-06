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
	watch('src/js/**/*.js', function () {
		gulp.start('scripts');
	});
	watch('src/images/**/*.*', function () {
		gulp.start('images');
	});

	watch('bower.json', function () {
		gulp.start('wiredep');
	});
});