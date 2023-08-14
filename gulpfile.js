const gulp = require('gulp');

// Подключение всех html-страниц
const htmlInclude = require('gulp-file-include');

// Подключение всех стилей scss происходит через sass
const scss = require('gulp-sass')(require('sass'));

// Подключение live server
const liveServer = require('gulp-server-livereload');

// Удаление папки dist при пересборке проекта
const deleteDist = require('gulp-clean');

// Менеджер для работы с file sistem
const fs = require('fs');

// Для верных ссылок в devTools к файлам scss
const sourceMaps = require('gulp-sourcemaps');

gulp.task('html', function () {
  return gulp.src('./src/*.html')
    .pipe(htmlInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./dist/'))
})

gulp.task('scss', function () {
  return gulp
    .src('./src/scss/*.scss')
    .pipe(sourceMaps.init())
    .pipe(scss())
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('./dist/css/'))
})

gulp.task('images', function () {
  return gulp
    .src('./src/images/**/*')
    .pipe(gulp.dest('./dist/images/'))
})

gulp.task('startServer', function () {
  return gulp
    .src('./dist/')
    .pipe(liveServer({
      livereload: true,
      open: true
    }))
})

gulp.task('clean', function (done) {
  if (fs.existsSync('./dist/')) {
    return gulp
      .src('./dist/', { read: false })
      .pipe(deleteDist())
  }
  done()
})

gulp.task('watch', function () {
  gulp.watch('./src/scss/**/*.scss', gulp.parallel('scss'))
  gulp.watch('./src/**/*.html', gulp.parallel('html'))
  gulp.watch('./src/images/**/*', gulp.parallel('images'))
})

gulp.task('default', gulp.series(
  'clean',
  gulp.parallel('scss', 'html', 'images'),
  gulp.parallel('startServer', 'watch')
))