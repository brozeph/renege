'use strict';

var
	gulp = require('gulp'),
	jshint = require('gulp-jshint');


gulp.task('jshint', function () {
	return gulp
		.src(['*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
});
