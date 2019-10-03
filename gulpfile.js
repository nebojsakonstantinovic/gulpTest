var gulp = require('gulp');
var uglify = require('gulp-uglify');

// Styles
gulp.task('styles', async () => {
  console.log('starting styles task');
});

// Scripts
gulp.task('scripts', () => {
  console.log('starting scripts task');
  return gulp.src('public/scripts/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('public/dist'));
});

// Images
gulp.task('images', async () => {
  console.log('starting images task');
});

// default
gulp.task('default', async () => {
  console.log('starting default task');
});
