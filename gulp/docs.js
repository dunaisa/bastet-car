const gulp = require('gulp');

// Подключение всех html-страниц
const htmlInclude = require('gulp-file-include');

// Подключение всех стилей scss происходит через sass
const scss = require('gulp-sass')(require('sass'));

// Подключение live server
const liveServer = require('gulp-server-livereload');

// Удаление папки build при пересборке проекта
const deletebuild = require('gulp-clean');

// Менеджер для работы с file sistem
const fs = require('fs');

// Для верных ссылок в devTools к файлам scss
const sourceMaps = require('gulp-sourcemaps');

// const ghPages = require('gulp-gh-pages');

const webpack = require('webpack-stream');
const { config } = require('../webpack.config.js');

const babel = require('gulp-babel');

gulp.task('html:docs', function () {
  return gulp.src('./src/*.html')
    .pipe(htmlInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./docs/'))
})

gulp.task('scss:docs', function () {
  return gulp
    .src('./src/scss/*.scss')
    .pipe(sourceMaps.init())
    .pipe(scss())
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('./docs/css/'))
})

gulp.task('images:docs', function () {
  return gulp
    .src('./src/images/**/*')
    .pipe(gulp.dest('./docs/images/'))
})

gulp.task('fonts:docs', function () {
  return gulp
    .src('./src/fonts/**/*')
    .pipe(gulp.dest('./docs/fonts/'))
})

gulp.task('js:docs', function () {
  return gulp
    .src('./src/js/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(webpack(config))
    .pipe(gulp.dest('./docs/js/'))
})

gulp.task('startServer:docs', function () {
  return gulp
    .src('./docs/')
    .pipe(liveServer({
      livereload: true,
      open: true
    }))
})

gulp.task('clean:docs', function (done) {
  if (fs.existsSync('./docs/')) {
    return gulp
      .src('./docs/', { read: false })
      .pipe(deletebuild())
  }
  done()
})

gulp.task('watch:docs', function () {
  gulp.watch('./src/scss/**/*.scss', gulp.parallel('scss:docs'))
  gulp.watch('./src/**/*.html', gulp.parallel('html:docs'))
  gulp.watch('./src/images/**/*', gulp.parallel('images:docs'))
  gulp.watch('./src/fonts/**/*', gulp.parallel('fonts:docs'))
  gulp.watch('./src/js/**/*', gulp.parallel('js:docs'))
})


// gulp.task('ghPages', function () {
//   return gulp.src('./docs/**/*')
//     .pipe(ghPages())
// });