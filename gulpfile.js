var syntax        = 'sass';

var gulp          = require('gulp'),
		gutil         = require('gulp-util' ),
		sass          = require('gulp-sass'),
		browsersync   = require('browser-sync'),
		concat        = require('gulp-concat'),
		uglify        = require('gulp-uglify'),
		cleancss      = require('gulp-clean-css'),
		rename        = require('gulp-rename'),
		autoprefixer  = require('gulp-autoprefixer'),
		notify        = require("gulp-notify"),
		rsync         = require('gulp-rsync'),
		pug           = require('gulp-pug'),
		htmlmin       = require('gulp-htmlmin'),
		imagemin      = require('gulp-imagemin'),
		gulpSequence  = require('gulp-sequence'),
		wait          = require('gulp-wait');

gulp.task('browser-sync', function() {
	browsersync({
		server: {
			baseDir: 'app'
		},
		notify: false,
		// open: false,
		// tunnel: true,
		// tunnel: "projectname", //Demonstration page: http://projectname.localtunnel.me
	})
});

gulp.task('pug', function() {
	return gulp.src('app/pug/pages/*.pug')
	.pipe(pug({
		pretty: true
	}))
	.pipe(gulp.dest('app'))
});

gulp.task('styles', function() {
	return gulp.src('app/sass/main.sass')
	.pipe(wait(1000))
	.pipe(sass({ 'include css': true }).on("error", notify.onError()))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
	.pipe(gulp.dest('app/css'))
	.pipe(browsersync.reload( {stream: true} ))
});

gulp.task('js', function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/libs/slick/slick.min.js',
		'app/js/common.js', // Always at the end
		])
	.pipe(concat('scripts.min.js'))
	// .pipe(uglify()) // Mifify js (opt.)
	.pipe(gulp.dest('app/js'))
	.pipe(browsersync.reload({ stream: true }))
});

gulp.task('transfer', function(){
    return gulp.src([
		"app/**",
		"!app/pug",
		"!app/sass",
		"!app/js/common.js",
	])
        .pipe(gulp.dest("dist"))
});

gulp.task('imgmin', () =>
  gulp.src('app/img/**/*')
	  .pipe(imagemin())
	  .pipe(gulp.dest('dist/img'))
);

gulp.task('build', gulpSequence('transfer', 'imgmin'));

gulp.task('rsync', function() {
	return gulp.src('app/**')
	.pipe(rsync({
		root: 'app/',
		hostname: 'username@yousite.com',
		destination: 'yousite/public_html/',
		// include: ['*.htaccess'], // Includes files to deploy
		exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excludes files from deploy
		recursive: true,
		archive: true,
		silent: false,
		compress: true
	}))
});

gulp.task('watch', ['pug', 'styles', 'js', 'browser-sync'], function() {
	gulp.watch('app/'+syntax+'/**/*.'+syntax+'', ['styles']);
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']);
	gulp.watch('app/pug/*/*.pug', ['pug']);
	gulp.watch('app/*.html', browsersync.reload);
});

gulp.task('default', ['watch']);
