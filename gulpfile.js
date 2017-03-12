var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('copyFiles', function () {
    return gulp.src(['src/**', '!src/**/*.js'])
        .pipe(gulp.dest('dist'));
});

gulp.task('build', ['copyFiles'], function () {
    return gulp.src('src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('dist'));
});