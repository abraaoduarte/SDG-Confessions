'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');

const node_module = './node_modules';

const paths = {
  'select2': node_module + '/select2/dist',
};

gulp.task('styles', function () {
  return gulp.src([
    paths.select2 + '/css/select2.min.css',
  ])
    .pipe(concat('libs.min.css'))
    .pipe(gulp.dest('public/css'))
    .pipe(rename('libs.min.css'))
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(gulp.dest('public/css/'));
});