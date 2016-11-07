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

var copy = function (prod) {
	var bootstrap = gulp.src('node_modules/bootstrap/dist/**')
	.pipe(gulp.dest('public/vendor/bootstrap'));
	var jquery = gulp.src('node_modules/jquery/dist/**')
	.pipe(gulp.dest('public/vendor/jquery'));
	var tether = gulp.src('node_modules/tether/dist/**')
	.pipe(gulp.dest('public/vendor/tether'));
	var react = gulp.src('node_modules/react/dist/**')
	.pipe(gulp.dest('public/vendor/react'));
	var reactDom = gulp.src('node_modules/react-dom/dist/**')
	.pipe(gulp.dest('public/vendor/react-dom'));
	var reactRouter = gulp.src('node_modules/react-router/umd/**')
	.pipe(gulp.dest('public/vendor/react-router'));
	var auth0Lock = gulp.src('bower_components/auth0-lock/build/**')
	.pipe(gulp.dest('public/vendor/auth0-lock'));

	return merge(bootstrap,jquery,tether,react,reactDom,reactRouter,auth0Lock);

}

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

var jsBundle = function (prod, filename){
	var Browserify;

	var bundle = browserify({entries: 'src/' + filename + '.js', debug: !prod});
	if (watch) bundle = watchify(bundle);
	bundle.transform(babelify)
	.on('log', gutil.log)
	.on('update', createBundle);

	function createBundle() {
		Browserify = bundle.bundle()
		.on('error', function(err){gutil.log("Watchify: " + err)})
		.pipe(source(filename + '.js'))
		.pipe(gulp.dest("public/js"));
	}

	if (prod) {
		Browserify = bundle.bundle()
			.on('error', function(err){gutil.log("Browserify: " + err)})
			.pipe(source(filename + '.js'))
			.pipe(buffer())
			.pipe(uglify())
			.pipe(gulp.dest('public/js'));
	} else createBundle();

	return Browserify;
}

var buildProject = function (prod, filename="web") {
	jsStream = jsBundle(prod, filename);
	copyStream = copy();
	styleStream = styles();

	if(watch) {
		console.log("Watching...")
		gulp.watch(['styles/**/*.scss','!./styles/common.scss'], function(event){
			styles(prod);
		});
	}
	return merge(jsStream, copyStream, styleStream);
}

gulp.task('dev',['set-dev'], function(){
	return buildProject(false);
});

gulp.task('devLanding',['set-dev'], function(){
	return buildProject(false, 'landing');
});

gulp.task('deploy',['set-prod'], function(){
	return merge(buildProject(true), buildProject(true, 'landing'));
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

gulp.task('copy', function(){
	return copy();
});
