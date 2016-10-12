var gulp = require('gulp');
var gutil = require('gulp-util');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var bower = require('gulp-bower');
var merge = require('merge-stream');
var browserify = require("browserify");
var babelify = require("babelify");
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var argv = require('yargs').argv;

var watch = false;
if (argv.watch) watch = true;

// var copy = function (prod) {
// 	if (prod){
// 		var bootstrap = gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
// 		.pipe(rename("bootstrap.css"))
// 		.pipe(gulp.dest('public/vendor'));
// 	} else {
// 		var bootstrap = gulp.src('node_modules/bootstrap/dist/css/bootstrap.css')
// 		.pipe(gulp.dest('public/vendor'));
// 	}
// 	var bootstrap = gulp.src('node_modules/bootstrap/dist/css/bootstrap.css')
// 	.pipe(gulp.dest('public/vendor'));
// 	return bootstrap;
// }

var styles = function(){
	var cssMini = gulp.src(['./styles/**/*.scss','!./styles/common.scss'])
   .pipe(sass({outputStyle:'compressed'}).on('error', sass.logError))
	.pipe(rename("app.min.css"))
   .pipe(gulp.dest('./public/css'));

	var css = gulp.src(['./styles/**/*.scss','!./styles/common.scss'])
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('./public/css'));

	return merge(css, cssMini);
}

var jsBundle = function (prod){
	var Browserify;

	var bundle = browserify({entries: 'src/web.js', debug: !prod});
	if (watch) bundle = watchify(bundle);
	bundle.transform(babelify)
	.on('log', gutil.log)
	.on('update', createBundle);

	function createBundle() {
		Browserify = bundle.bundle()
		.on('error', function(err){gutil.log("Watchify: " + err)})
		.pipe(source('bundle.js'))
		.pipe(gulp.dest("public/js"));
	}

	if (prod) {
		Browserify = bundle.bundle()
			.on('error', function(err){gutil.log("Browserify: " + err)})
			.pipe(source('bundle.js'))
			.pipe(buffer())
			.pipe(uglify())
			.pipe(gulp.dest('public/js'));
	} else createBundle();

	return Browserify;
}

var buildProject = function (prod) {
	jsStream = jsBundle(prod);
	// copyStream = copy(prod);
	styleStream = styles();

	if(watch) {
		console.log("Watching...")
		gulp.watch(['styles/**/*.scss','!./styles/common.scss'], function(event){
			styles(prod);
		});
	}
	return merge(jsStream, styleStream);
}

gulp.task('dev',['set-dev'], function(){
	return buildProject(false);
});

gulp.task('deploy',['set-prod'], function(){
	return buildProject(true);
});

gulp.task('set-dev', function() {
	return process.env.NODE_ENV = 'development';
});

gulp.task('set-prod', function() {
	return process.env.NODE_ENV = 'production';
});

gulp.task('bower', function() {
	return bower({cwd: './public' });
});
