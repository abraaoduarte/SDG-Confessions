'use strict';

const { src, dest, parallel } = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');

const node_module = './node_modules';

const paths = {
  'select2': node_module + '/select2/dist',
};

/*gulp.task('global-libs', function() {
  return src('src/resources/assets/js/global.libs.js')
    .pipe(babel())
    .pipe(dest('public/js/global.libs.js'));
});

gulp.task('search-chapters', function() {
  return src('src/resources/assets/js/search-chapters.js')
    .pipe(babel())
    .pipe(dest('public/js/search-chapters.js'));
});

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
});*/

/*function globalLibs() {
  return src('src/resources/assets/js/global.libs.js')
    .pipe(babel())
    .pipe(dest('public/js/'));
}*/

function searchChapters() {
  return src('src/resources/assets/js/search-chapters.js')
    .pipe(babel())
    .pipe(dest('public/js/'));
}

exports.searchChapters = searchChapters;
exports.default = parallel(searchChapters);
