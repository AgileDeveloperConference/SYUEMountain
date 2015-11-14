var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload'),
  jshint = require('gulp-jshint'),
  mocha = require('gulp-mocha');

var testFiles = 'test/*.js';;

gulp.task('hint',function(){
  return gulp.src('./src/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter());
});

gulp.task('test', function () {
    return gulp.src(testFiles, {read: false})
           .pipe(mocha({reporter: 'nyan'}))
<<<<<<< HEAD
					 .once('end', function () {
     				 process.exit();
				   });
=======
           .once('end', function () {
             process.exit();
           });
>>>>>>> develop
});

gulp.task('develop', function () {
  livereload.listen();
  nodemon({
    script: 'bin/www',
    ext: 'js jade coffee',
    stdout: false
  }).on('readable', function () {
    this.stdout.on('data', function (chunk) {
      if(/^Express server listening on port/.test(chunk)){
        livereload.changed(__dirname);
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});

gulp.task('default', [
  'develop'
]);