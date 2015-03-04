/**
'use strict';

var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var JS_DEST = 'app/static/js';
var CSS_DEST = 'app/static/js';

gulp.task('default', function() {

  return gulp.src('foo.js')
    // This will output the non-minified version
    .pipe(gulp.dest(JS_DEST))
    // This will minify and rename to foo.min.js
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest(JS_DEST));
});
**/

var gulp = require('gulp');
var header = require('gulp-header');
var footer = require('gulp-footer');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var cached = require('gulp-cached');
var uglify = require('gulp-uglify');
var remember = require('gulp-remember');
var sass = require('gulp-sass');

var scriptsGlob = 'src/**/*.js';

gulp.task('scripts', function () {
  return gulp.src(scriptsGlob)
      .pipe(cached('scripts'))        // only pass through changed files
      .pipe(jshint())                 // do special things to the changed files...
      .pipe(uglify())
      //.pipe(header('(function () {')) // e.g. jshinting ^^^
      //.pipe(footer('})();'))          // and some kind of module wrapping
      .pipe(remember('scripts'))      // add back all files to the stream
      .pipe(concat('app.js'))         // do things that require all files

      .pipe(gulp.dest('app/static/js/'));
});

gulp.task('sass', function () {
  gulp.src('src/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/static/css'));
});

gulp.task('watch', function () {
  var watcher = gulp.watch(scriptsGlob, ['scripts']); // watch the same files in our scripts task
  watcher.on('change', function (event) {
    if (event.type === 'deleted') {                   // if a file is deleted, forget about it
      delete cached.caches.scripts[event.path];       // gulp-cached remove api
      remember.forget('scripts', event.path);         // gulp-remember remove api
    }
  });
});