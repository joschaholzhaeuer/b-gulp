// Include Gulp
var gulp = require('gulp');

// Include Plugins
var jshint       = require('gulp-jshint');
var sass         = require('gulp-sass');
var concat       = require('gulp-concat');
var uglify       = require('gulp-uglify');
var plumber      = require('gulp-plumber');
var gulpUtil     = require('gulp-util');
var rename       = require('gulp-rename');
var htmlmin      = require('gulp-htmlmin');
var sourcemaps   = require('gulp-sourcemaps');
var postcss      = require('gulp-postcss');
var imagemin     = require('gulp-imagemin');
var autoprefixer = require('autoprefixer');
var pixrem       = require('pixrem');
var cssnano      = require('cssnano');
var browserSync  = require('browser-sync').create();

// make noise on js and scss errors
function errorHandler(error) {
    gulpUtil.beep();
    return true;
}

// Copy folders
gulp.task('copy-folders', function() {
    return gulp
        .src(['src/fonts/**/*'], {base: 'src/'})
        .pipe(gulp.dest('dist/'));
});


// Lint JS-Files
gulp.task('lint', function() {
    return gulp
        .src('src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp
        .src('src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename('main.min.js'))
        .pipe(plumber(errorHandler))
        .pipe(uglify())
        .pipe(plumber.stop())
        .pipe(gulp.dest('dist/js'));
});

// Compile Sass
gulp.task('sass', function() {
    return gulp
        .src('src/scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe(plumber(errorHandler))
        .pipe(sass({
            outputStyle: 'expanded',
            errLogToConsole: true
        }).on('error', sass.logError))
        .pipe(plumber.stop())
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

// Minify & Autoprefix CSS
gulp.task('css', function () {
    var processors = [
        pixrem(),
        autoprefixer({
            browsers: ['last 4 versions', 'android 4', 'opera 12']
        }),
        cssnano(),
    ];
    return gulp
        .src('dist/css/style.css')
        .pipe(postcss(processors))
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('dist/css/'));
});

// Create HTML Files
gulp.task('html', function() {
    return gulp
        .src('src/*.html')
        .pipe(gulp.dest('dist'));
});

// Minify HTML Files
gulp.task('htmlmin', function() {
    return gulp
        .src('src/*.html')
        .pipe(htmlmin({
            removeComments: true,
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('dist'));
});

// Copy Images
gulp.task('image', function() {
    return gulp
        .src('src/img/*')
        .pipe(gulp.dest('dist/img'));
});

// Compress Images
gulp.task('imagemin', function() {
    return gulp
        .src('dist/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    browserSync.init({
      proxy: 'b-gulp.dev'
    });
    gulp.watch('src/js/*.js', ['lint', 'scripts']).on('change', browserSync.reload);
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/*.html', ['html']).on('change', browserSync.reload);
});

// Default Tasks
gulp.task('default', ['sass', 'lint', 'scripts', 'html', 'image', 'copy-folders', 'watch']);

// Default Tasks
gulp.task('build', ['sass', 'css', 'lint', 'scripts', 'htmlmin', 'imagemin', 'copy-folders']);
