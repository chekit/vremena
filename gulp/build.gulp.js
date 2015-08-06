var gulp = require('gulp'),
	del = require('del'),
	wiredep = require('wiredep').stream,
	browserSync = require('browser-sync').create(),
	$ = require('gulp-load-plugins')({
		rename: {
			'gulp-ruby-sass': 'sass',
			'gulp-autoprefixer': 'prefixer'
		}
	});

var path = {
	jade: ['./src/jade/*.jade', './src/jade/pages/*.jade', '!./src/jade/_config.jade'],
	sass: ['./src/sass/styles.scss'],
	fonts: ['./src/sass/base/fonts/**/*'],
	scripts: ['./src/js/*.js'],
	images: ['./src/images/**/*.{png,jpg,gif,svg,xml,ico,json}']
}

var errorHandler = function (error) {
	console.error(error);
	this.emit('end');
}

gulp.task('clean', function (cb) {
	del(['./dist', './src/*.html'], cb);
});

gulp.task('fonts', function () {
	return gulp.src(path.fonts)
		.pipe(gulp.dest('./src/css/fonts/'))
		.pipe(gulp.dest('./dist/css/fonts/'))
		.pipe($.notify({
			title: 'Fonts',
			message: 'Fonts Copied!'
		}));		
});

gulp.task('sass', function () {
	return $.sass(path.sass, {
			sourcemap: true,
			style: 'expanded'
		})
		.on('error', errorHandler)
		.pipe($.csscomb())
        .pipe($.prefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
		.pipe($.sourcemaps.write('.'))
		.pipe(gulp.dest('./src/css/'))
		.pipe(gulp.dest('./dist/css/'))
		.pipe($.notify({
			title: 'Sass',
			message: 'Sass Done!'
		}));		
});

gulp.task('jade', function () {
	var assets = $.useref.assets();

	return gulp.src(path.jade)
		.pipe($.jade({
			pretty: true
		}))
		.pipe(gulp.dest('./src/'))
		.pipe(wiredep({
	    	directory: './src/bower_components'
	    }))
		.pipe(gulp.dest('./src/'))
		.pipe(assets)
		.pipe($.if('*.js', $.uglify()))
		.pipe(assets.restore())
        .pipe($.useref())
		.pipe(gulp.dest('./dist/'))
		.pipe($.notify({
			title: 'Jade',
			message: 'Jade Done!'
		}));
});

gulp.task('scripts', function () {
	return gulp.src(path.scripts)
		.pipe($.jshint())
		.on('error', errorHandler)
		.pipe($.jshint.reporter('jshint-stylish'))
		.pipe($.stripDebug())
		.pipe(gulp.dest('./dist/js/'))
		.pipe($.notify({
			title: 'Scripts',
			message: 'Scripts Done!'
		}));
});

gulp.task('images', function () {
	return gulp.src(path.images)
		.pipe($.cache($.imagemin({
				optimizationLevel: 5,
				progressive: true,
				interlaced: true
			})
		))
		.pipe(gulp.dest('./dist/images/'))
		.pipe($.notify({
			title: 'Images',
			message: 'Images Done!'
		}));
});