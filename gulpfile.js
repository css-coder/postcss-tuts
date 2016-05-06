var gulp = require('gulp');
var rename = require('gulp-rename');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var lost = require('lost');
var browserSync = require('browser-sync');


gulp.task('css', function () {
    var processors = [
    		lost,
        autoprefixer,
        cssnano
    ];
    return gulp.src('app/css/style.css')
        .pipe(postcss(processors))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream : true}))
});

gulp.task('browser-sync', function() {
	browserSync({
		server : {
			baseDir : 'app'
		}
	});
});

gulp.task('build', function() {

	var buildCss = gulp.src([
		'app/css/style.min.css'
		])
	.pipe(gulp.dest('dist/css'))

	var buildHtml = gulp.src('app/*.html')
	.pipe(gulp.dest('dist'));

	var buildHtml = gulp.src('app/img/**/*')
	.pipe(gulp.dest('dist/img'));
});

gulp.task('watch', ['browser-sync', 'css', ], function() {
		gulp.watch('app/css/**/*.css', ['css']);
		gulp.watch('app/*.html', browserSync.reload);
})

