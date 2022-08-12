"use strict";

var gulp = require('gulp'),
    del = require('del'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    rev = require('gulp-rev'),
    cleanCss = require('gulp-clean-css'),
    flatmap = require('gulp-flatmap'),
    htmlmin = require('gulp-htmlmin');

gulp.task('clean', function() {
    return del(['dist']);
});

gulp.task('copyfonts',function(){
    return gulp.src('./node_modules/font-awesome/fonts/**/*.{tff,woff,eof,svg}*')
        .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('usemin', function() {
    return gulp.src('./*.html')
    .pipe(flatmap(function(stream, file){
        return stream
          .pipe(usemin({
              css: [ rev() ],
              html: [ function() { return htmlmin({ collapseWhitespace: true })} ],
              js: [ uglify(), rev() ],
              inlinejs: [ uglify() ],
              inlinecss: [ cleanCss(), 'concat' ]
          }))
      }))
      .pipe(gulp.dest('dist/'));
  });
  
  gulp.task('build', gulp.series('clean','copyfonts','usemin'));