var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	minifycss = require('gulp-minify-css'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	htmlmin = require('gulp-htmlmin'),
	rename = require('gulp-rename'),
	clean = require('gulp-clean'),
	concat = require('gulp-concat'),
	notify = require('gulp-notify'),
	cache = require('gulp-cache'),
	livereload = require('gulp-livereload'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload;


gulp.task('styles',function(){
	return sass('src/scss/all.scss',{style:'expanded',compass:true})
	.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9','Firefox > 20', 'opera 12.1', 'ios 6', 'android 4'))
	.pipe(gulp.dest('src/css'))
	.pipe(reload({stream:true}));

});


gulp.task('compile-css',function(){
	return gulp.src('src/css/*.css')
	.pipe(concat("all.css"))
	.pipe(gulp.dest('dist/css'))
	.pipe(rename({suffix:'.min'}))
	.pipe(minifycss())
	.pipe(gulp.dest('dist/css'))
	.pipe(notify({message:'Style task complete'}));
});

gulp.task('htmlminfy',function(){
	return gulp.src('src/*.html')
	.pipe(htmlmin({collapseWhitesapce:true}))
	.pipe(gulp.dest('dist'))
	.pipe(notify({message:'htmlminfy task complete'}));
});


gulp.task('js',function(){
	return gulp.src('src/js/*.js')
	.pipe(jshint('.jshintrc'))
	.pipe(jshint.reporter('default'))
	.pipe(gulp.dest('dist/js'))
	.pipe(reload({stream:true}));
});


gulp.task('scripts',function(){
	return gulp.src('src/scripts/**/*.js')
	.pipe(jshint('.jshintrc'))
	.pipe(jshint.reporter('default'))
	.pipe(concat('main.js'))
	.pipe(gulp.dest('dist/assets/js'))
	.pipe(rename({suffix:'.min'}))
	.pipe(uglify())
	.pipe(gulp.dest('dist/assets/js'))
	.pipe(notify({message:'Script task complete'}));
});

gulp.task('images',function(){
	return gulp.src('src/images/**/*')
	.pipe(cache(imagemin({optimizationLevel:3,progressive:true,interlaced:true})))
	.pipe(gulp.dest('dist/images'))
	.pipe(notify({message:'Images task complete'}));
});

gulp.task("clean",function(){
	return gulp.src(['src/css','src/js','src/img'],{read:false})
	.pipe(clean());
});



gulp.task('watch',['styles'],function(){
	browserSync({
		server:{
			baseDir:'./',
			tunnel:true
		}
	});
	gulp.watch('src/*.html',reload);
	gulp.watch('src/scss/*.scss',['styles'], reload);
});




