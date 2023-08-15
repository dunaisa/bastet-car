const gulp = require('gulp');

require('./gulp/dev.js');
require('./gulp/docs.js');

gulp.task('default', gulp.series(
  'clean:dev',
  gulp.parallel('scss:dev', 'html:dev', 'images:dev', 'fonts:dev', 'js:dev'),
  gulp.parallel('startServer:dev', 'watch:dev')
))

gulp.task('docs', gulp.series(
  'clean:docs',
  gulp.parallel('scss:docs', 'html:docs', 'images:docs', 'fonts:docs', 'js:docs'),
  gulp.parallel('startServer:docs', 'watch:docs')
))
