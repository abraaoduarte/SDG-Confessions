'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');


gulp.task('searchChapters', function() {
  return gulp.src('src/resources/assets/js/search-chapters.js')
    .pipe(babel())
    .pipe(gulp.dest('public/js/'));
});

gulp.task('default', function() {
  gulp.watch('src/resources/assets/js/search-chapters.js', gulp.series('searchChapters'));
});


