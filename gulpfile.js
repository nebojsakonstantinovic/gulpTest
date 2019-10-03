var gulp = require('gulp');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');

// File paths
var SRIPTS_PATH = 'public/scripts/**/*.js';

// Styles
gulp.task('styles', async () => {
  console.log('starting styles task');
});

// Scripts
gulp.task('scripts', () => {
  console.log('starting scripts task');
  return gulp.src(SRIPTS_PATH)
    .pipe(uglify())
    .pipe(gulp.dest('public/dist'))
    .pipe(livereload());
});

// Images
gulp.task('images', async () => {
  console.log('starting images task');
});

// watch
gulp.task('watch', async () => {
  console.log('starting watch task');
  require('./server.js');
  livereload.listen();
  gulp.watch(SRIPTS_PATH, gulp.series('scripts'));
});

// default
gulp.task('default', async () => {
  console.log('starting default task');
});
