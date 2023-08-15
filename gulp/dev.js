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

gulp.task('html:dev', function () {
  return gulp.src('./src/*.html')
    .pipe(htmlInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./build/'))
})

gulp.task('scss:dev', function () {
  return gulp
    .src('./src/scss/*.scss')
    .pipe(sourceMaps.init())
    .pipe(scss())
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('./build/css/'))
})

gulp.task('images:dev', function () {
  return gulp
    .src('./src/images/**/*')
    .pipe(gulp.dest('./build/images/'))
})

gulp.task('fonts:dev', function () {
  return gulp
    .src('./src/fonts/**/*')
    .pipe(gulp.dest('./build/fonts/'))
})

gulp.task('js:dev', function () {
  return gulp
    .src('./src/js/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(webpack(config))
    .pipe(gulp.dest('./build/js/'))
})

gulp.task('startServer:dev', function () {
  return gulp
    .src('./build/')
    .pipe(liveServer({
      livereload: true,
      open: true
    }))
})

gulp.task('clean:dev', function (done) {
  if (fs.existsSync('./build/')) {
    return gulp
      .src('./build/', { read: false })
      .pipe(deletebuild())
  }
  done()
})

gulp.task('watch:dev', function () {
  gulp.watch('./src/scss/**/*.scss', gulp.parallel('scss:dev'))
  gulp.watch('./src/**/*.html', gulp.parallel('html:dev'))
  gulp.watch('./src/images/**/*', gulp.parallel('images:dev'))
  gulp.watch('./src/fonts/**/*', gulp.parallel('fonts:dev'))
  gulp.watch('./src/js/**/*', gulp.parallel('js:dev'))
})


// gulp.task('ghPages', function () {
//   return gulp.src('./build/**/*')
//     .pipe(ghPages())
// });