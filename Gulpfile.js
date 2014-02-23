// Load Gulp and your plugins
var gulp = require('gulp'),
    connect = require('gulp-connect'),
    stylus = require('gulp-stylus'),
    plumber = require('gulp-plumber');

var paths = {
    styles: 'stylus/**/*',
    html: '*.html',
    js: 'assets/js/*.js'
};

// Connect task
gulp.task('connect', connect.server({
    root: __dirname + '/',
    port: 9001,
    livereload: true,
    open: {
        browser: 'Google Chrome'
    }
}));

// HTML task
gulp.task('html', function () {
    gulp.src(paths.html)
        .pipe(connect.reload());
});

// JS task
gulp.task('js', function () {
    gulp.src(paths.js)
        .pipe(connect.reload());
});

// Stylus task
gulp.task('stylus', function () {
    gulp.src(paths.styles)
        .pipe(plumber())
        .pipe(stylus({
            use: ['nib'], 
            set: ['compress']
        }))
        .pipe(gulp.dest('./assets/css'))
        .pipe(connect.reload());
});

// Default gulp task to run
gulp.task('default', ['stylus']);

// Gulp watch
gulp.task('s', function () {
    gulp.run('connect');
    gulp.watch(paths.styles, ['stylus']);
    gulp.watch(paths.html, ['html']);
    gulp.watch(paths.js, ['js']);
});