var gulp = require('gulp');
//var sass = require('gulp-sass');
var sass = require('gulp-ruby-sass');
//var csso = require('gulp-csso');
var minifyCss = require('gulp-minify-css');
//var jshint = require('gulp-jshint');
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
var path = require('path');

gulp.task('style', function() {
  gulp.src('public/stylesheets/style.scss')
    //.pipe(plumber())
    .on('data', function(file) {
      if (process.platform == "win32") {
        file.path = path.relative(".", file.path);
        file.path = file.path.replace(/\\/g, "/");
      }
    })
    // .pipe(sass({ sourceComments: 'map' }))
    .pipe(sass({sourcemap: true, style: 'compact'})) // gulp-ruby-sass
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('public/compiled/stylesheets'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifyCss())
    .pipe(gulp.dest('public/compiled/stylesheets'))
    //.pipe(notify({ message: 'Style task complete' }));
});

gulp.task('scripts', function() {
  gulp.src([
    'public/javascripts/main.js',
    'public/javascripts/lib/*.js'
  ])
    //.pipe(jshint('.jshintrc'))
    //.pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('public/compiled/javascripts'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('public/compiled/javascripts'))
    //.pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('images', function() {
  return gulp.src('public/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('public/compiled/images'))
    //.pipe(notify({ message: 'Images task complete' }));
});

// gulp.task('clean', function(cb) {
//     del(['public/compiled/stylesheets', 'public/compiled/javascripts', 'public/compiled/images'], cb)
// });

gulp.task('watch', function() {
  gulp.watch('public/stylesheets/**/*.scss', ['style']);
  gulp.watch(['public/**/*.js', '!public/app.min.js', '!public/vendor'], ['scripts']);
  gulp.watch('public/images/*', ['images']);

  // Create LiveReload server
  livereload.listen();
  // Watch any files in dist/, reload on change
  gulp.watch(['public/**']).on('change', livereload.changed);
});

gulp.task('default', ['style', 'scripts', 'images']);
