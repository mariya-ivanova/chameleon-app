var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del'),
	csslint = require('gulp-csslint');
 
gulp.task('css', function() {
  gulp.src('css/*.css')
    .pipe(csslint())
    .pipe(csslint.reporter())
	.pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', function() {
  return gulp.src('app/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('default', function() {
    gulp.start('css', 'scripts');
});

gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('css/*.css', ['css']);

  // Watch .js files
  //gulp.watch('src/scripts/**/*.js', ['scripts']);
  gulp.watch('app/**/**/*.js', ['scripts']);
  
  // Create LiveReload server
  //livereload.listen();

  // Watch any files in dist/, reload on change
  //gulp.watch(['css/*.css']).on('change', livereload.changed);

});