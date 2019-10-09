var gulp = require('gulp');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var del = require('del');
var zip = require('gulp-zip');

//less plugins
var less = require('gulp-less');
var LessAutoprefixer = require('less-plugin-autoprefix');
var lessAutoprefixer = new LessAutoprefixer({
  browsers: ['last 2 versions'],
});

//Handlebars plugins
var handlebars = require('gulp-handlebars');
var handlebarsLib = require('handlebars');
var declare = require('gulp-declare');
var wrap = require('gulp-wrap');

// Image compression
var imagemin = require('gulp-imagemin');
var imageminPngquant = require('imagemin-pngquant');
var imageJpegRecompress = require('imagemin-jpeg-recompress');

// File paths
var DIST_PATH = 'public/dist';
var SRIPTS_PATH = 'public/scripts/**/*.js';
var CSS_PATH = 'public/css/**/*.css';
var TEMPLATES_PATH = 'templates/**/*.hbs';
var IMAGES_PATH = 'public/images/**/*.{png,jpeg,jpg,svg,gif}';

// // Styles
// gulp.task('styles', async () => {
//   console.log('starting styles task');
//   return gulp
//     .src(['public/css/reset.css', CSS_PATH])
//     .pipe(
//       plumber(function(err) {
//         console.log('Styles Task Error');
//         console.log(err);
//         this.emit('end');
//       })
//     )
//     .pipe(sourcemaps.init())
//     .pipe(
//       autoprefixer({
//         browsers: ['last 2 versions'],
//       })
//     )
//     .pipe(concat('style.css'))
//     .pipe(minifyCss())
//     .pipe(sourcemaps.write())
//     .pipe(gulp.dest(DIST_PATH))
//     .pipe(livereload());
// });

// // Styles SCSS
// gulp.task('styles', async () => {
//   console.log('starting styles task');
//   return (
//     gulp
//       .src('public/scss/styles.scss')
//       .pipe(
//         plumber(function(err) {
//           console.log('Styles Task Error');
//           console.log(err);
//           this.emit('end');
//         })
//       )
//       .pipe(sourcemaps.init())
//       .pipe(
//         autoprefixer({
//           browsers: ['last 2 versions'],
//         })
//       )
//       // .pipe(concat('style.css'))
//       // .pipe(minifyCss())
//       .pipe(
//         sass({
//           outputStyle: 'compressed',
//         })
//       )
//       .pipe(sourcemaps.write())
//       .pipe(gulp.dest(DIST_PATH))
//       .pipe(livereload())
//   );
// });

// Styles LESS
gulp.task('styles', async () => {
  console.log('starting styles task');
  return (
    gulp
      .src('public/less/styles.less')
      .pipe(
        plumber(function(err) {
          console.log('Styles Task Error');
          console.log(err);
          this.emit('end');
        })
      )
      .pipe(sourcemaps.init())
      // .pipe(
      //   autoprefixer({
      //     browsers: ['last 2 versions'],
      //   })
      // )
      // .pipe(concat('style.css'))
      // .pipe(minifyCss())
      // .pipe(
      //   sass({
      //     outputStyle: 'compressed',
      //   })
      // )
      .pipe(
        less({
          plugins: [lessAutoprefixer],
        })
      )
      .pipe(minifyCss())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(DIST_PATH))
      .pipe(livereload())
  );
});

// Scripts
gulp.task('scripts', () => {
  console.log('starting scripts task');
  return gulp
    .src(SRIPTS_PATH)
    .pipe(
      plumber(function(err) {
        console.log('Scripts Task Error');
        console.log(err);
        this.emit('end');
      })
    )
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ['@babel/env'],
      })
    )
    .pipe(uglify())
    .pipe(concat('scripts.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DIST_PATH))
    .pipe(livereload());
});

// Images
gulp.task('images', async () => {
  console.log('starting images task');
  return gulp
    .src(IMAGES_PATH)
    .pipe(
      imagemin([
        imagemin.gifsicle(),
        imagemin.jpegtran(),
        imagemin.optipng(),
        imagemin.svgo(),
        imageminPngquant(),
        imageJpegRecompress(),
      ])
    )
    .pipe(gulp.dest(DIST_PATH + '/images'));
});

// templates
gulp.task('templates', () => {
  return gulp
    .src(TEMPLATES_PATH)
    .pipe(
      handlebars({
        handlebars: handlebarsLib,
      })
    )
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(
      declare({
        namespace: 'templates',
        noRedeclare: true,
      })
    )
    .pipe(concat('templates.js'))
    .pipe(gulp.dest(DIST_PATH))
    .pipe(livereload());
});

// watch
gulp.task('watch', async () => {
  console.log('starting watch task');
  require('./server.js');
  livereload.listen();
  gulp.watch(SRIPTS_PATH, gulp.series('scripts'));
  // gulp.watch(CSS_PATH, gulp.series('styles'));
  // gulp.watch('public/scss/**/*.scss', gulp.series('styles')); // SASS
  gulp.watch('public/less/**/*.less', gulp.series('styles')); // LESS
  gulp.watch(TEMPLATES_PATH, gulp.series('templates')); // LESS
});

// clean
gulp.task('clean', async () => {
  return del.sync([DIST_PATH]);
});

// default
gulp.task(
  'default',
  gulp.series(
    'clean',
    gulp.parallel('images', 'templates', 'styles', 'scripts'),
    'watch'
  ),
  function() {
    console.log('starting default task');
  }
);

// export
gulp.task('export', () => {
  return gulp
    .src('public/**/*')
    .pipe(zip('website.zip'))
    .pipe(gulp.dest('./'));
});
