var gulp = require('gulp'),
less = require('gulp-less'),
autoprefixer = require('gulp-autoprefixer'),
minifycss = require('gulp-minify-css'),
// newer = require('gulp-newer'),
// imagemin = require('gulp-imagemin'),
concat = require('gulp-concat'),
uglify = require('gulp-uglify'),
gzip = require('gulp-gzip');
//livereload = require('gulp-livereload');

gulp.task('javascript', function() {
	gulp.src('js/*.js')
	.pipe(concat('main.js'))
	.pipe(uglify())
	.pipe(gulp.dest(''))
	//.pipe(gzip())
	.pipe(gulp.dest(''));
});

gulp.task('styles', function(){
	gulp.src('less/style.less')
	.pipe(less())
	.pipe(autoprefixer())
	.pipe(gulp.dest(''))
	.pipe(minifycss())
//	.pipe(gzip())
	.pipe(gulp.dest(''));
});
gulp.task('default',['styles']);

gulp.task('watch', function() {
	//livereload.listen();
	// Watch .scss files
	gulp.watch('less/*.less', ['styles']);
	gulp.watch('js/*.js', ['javascript']);

});