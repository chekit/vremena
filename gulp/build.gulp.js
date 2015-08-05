var gulp = require('gulp'),
	del = require('del'),
	wiredep = require('wiredep').stream,
	browserSync = require('browser-sync').create(),
	$ = require('gulp-load-plugins')({
		rename: {
			'gulp-ruby-sass': 'sass'
		}
	});

var path = {
	jade: ['./src/jade/*.jade', './src/jade/pages/*.jade', '!./src/jade/_config.jade'],
	sass: ['./src/sass/styles.scss'] 
}

var errorHandler = function (error) {
	console.error(error);
	this.emit('end');
}

gulp.task('clean', function (cb) {
	del(['./dist', './src/index.html'], cb);
});

gulp.task('sass', function () {
	return $.sass(path.sass, {
			sourcemap: true,
			style: 'expanded'
		})
		.on('error', errorHandler)
		.pipe($.sourcemaps.write('.'))
		.pipe(gulp.dest('./src/css/'))
		.pipe($.notify({
			title: 'Sass',
			message: 'Sass Done!'
		}));		
});

gulp.task('jade', function () {
	return gulp.src(path.jade)
		.pipe($.jade({
			pretty: true
		}))
		.pipe(wiredep({
	    	directory: 'src/bower_components'
	    }))
		.pipe(gulp.dest('./src/'))
		.pipe($.notify({
			title: 'Jade',
			message: 'Jade Done!'
		}));
});