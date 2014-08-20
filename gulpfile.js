var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var csso = require('gulp-csso');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var notify = require('gulp-notify');
var cache = require('gulp-cache');
var livereload = require('gulp-livereload');
var del = require('del');

gulp.task('style', function() {
  gulp.src('public/stylesheets/style.scss')
    .pipe(plumber())
    .pipe(sass({ style: 'expanded' }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('public/stylesheets'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(csso())
    .pipe(gulp.dest('public/stylesheets'))
    .pipe(notify({ message: 'Style task complete' }));
});

gulp.task('scripts', function() {
  gulp.src([
    'public/javascripts/main.js',
    'public/javascripts/lib/*.js'
  ])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('public/javascripts'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('public/javascripts'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/assets/img'))
    .pipe(notify({ message: 'Images task complete' }));
});

// gulp.task('clean', function(cb) {
//     del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img'], cb)
// });

gulp.task('watch', function() {
  gulp.watch('public/stylesheets/*.scss', ['style']);
  gulp.watch(['public/**/*.js', '!public/app.min.js', '!public/vendor'], ['scripts']);
  gulp.watch('public/images/*', ['images']);

  // Create LiveReload server
  livereload.listen();
  // Watch any files in dist/, reload on change
  gulp.watch(['public/**']).on('change', livereload.changed);
});

gulp.task('default', ['style', 'scripts', 'images', 'watch']);
