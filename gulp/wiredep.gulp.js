'use strict';

var gulp = require('gulp'),
	wiredep = require('wiredep').stream;

// inject bower components
gulp.task('wiredep', function () {
  return gulp.src(['src/*.html', 'src/pages/*.html'])
    .pipe(wiredep({
    	directory: './src/bower_components'
    }))
    .pipe(gulp.dest('src'));
});