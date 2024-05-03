const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');

gulp.task('server', function () {
   browserSync({
      server: {
         baseDir: 'dist',
      },
   });

   gulp.watch('src/*.html').on('change', browserSync.reload);
});

gulp.task('styles', function () {
   return gulp
      .src('src/sass/**/*.+(scss|sass)')
      .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
      .pipe(rename({ suffix: '.min', prefix: '' }))
      .pipe(autoprefixer())
      .pipe(cleanCSS({ compatibility: 'ie8' }))
      .pipe(gulp.dest('src/css'))
      .pipe(gulp.dest('dist/css'))
      .pipe(browserSync.stream());
});

gulp.task('watch', function () {
   gulp.watch('src/sass/**/*.+(scss|sass|css)', gulp.parallel('styles'));
   gulp.watch('src/*.html').on('change', gulp.series('html', browserSync.reload));
   gulp.watch('src/img/**/*', gulp.parallel('images'));
});

gulp.task('html', function () {
   return gulp
      .src('src/*.html')
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest('dist/'));
});

gulp.task('scripts', function () {
   return gulp.src('src/js/**/*.js').pipe(gulp.dest('dist/js'));
});

gulp.task('fonts', function () {
   return gulp.src('src/fonts/**/*').pipe(gulp.dest('dist/fonts'));
});

gulp.task('icons', function () {
   return gulp.src('src/icons/**/*').pipe(gulp.dest('dist/icons'));
});

gulp.task('mailer', function () {
   return gulp.src('src/mailer/**/*').pipe(gulp.dest('dist/mailer'));
});

gulp.task('images', function () {
   return gulp.src('src/img/**/*.+(jpg|png|jpeg)').pipe(imagemin()).pipe(gulp.dest('dist/img'));
});

// gulp.task('images', function () {
//    gulp
//       .src('src/img/**/*.+(jpg|png|jpeg)')
//       .pipe(tinypng('ZnVt8k5Tkdzp7px1lLNYtX4CFRctSrg8'))
//       .pipe(gulp.dest('dist/img'));
// });

gulp.task('svg', function () {
   return gulp.src('src/icons/**/*.+(svg|ico)').pipe(gulp.dest('dist/icons'));
});

gulp.task(
   'default',
   gulp.parallel('watch', 'server', 'styles', 'scripts', 'fonts', 'icons', 'mailer', 'html', 'images', 'svg')
);
