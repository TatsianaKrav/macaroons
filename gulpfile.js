'use strict'

const less = require('gulp-less');
const gulp = require("gulp");
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');

gulp.task('less', function () {
    return gulp.src('./src/css/styles.less')
        .pipe(less({}))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function(){
    return gulp.watch('./src/css/styles.less', gulp.series('less'));
});

gulp.task('default', gulp.series('less', 'watch'));