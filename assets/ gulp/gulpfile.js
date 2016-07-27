var gulp=require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

var styleIn = ['./sass/**/*.scss', './sass/*.scss'];
var styleOut = 'build/css';
var scriptIn = ['js/*.js'];
var scriptOut = 'build/js';

gulp.task('compress', function() {
  gulp.src(scriptIn)
    .pipe(uglify())
    .pipe(gulp.dest(scriptOut));
});

gulp.task('sass', function() {
   gulp.src(styleIn)
      .pipe(sass())
      .pipe(autoprefixer({
         browsers: ['last 2 versions']
      }))
      .pipe(gulp.dest(styleOut))
      .pipe(cssnano())
      .pipe(rename('min.css'))
      .pipe(gulp.dest(styleOut));
});

gulp.task('watch', function() {
   gulp.watch(styleIn, ['sass']);
   gulp.watch(scriptIn, ['compress']); /* take a file or array files then the tasks */
});

gulp.task('default', ['compress','sass','watch']);
