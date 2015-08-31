var gulp=require('gulp'),
	less=require('gulp-less');

gulp.task('testLess',function(){
	gulp.src(['less/*.less'])
		.pipe(less())
		.pipe(gulp.dest('css'));
});

gulp.task('watch',function(){
	gulp.watch('less/*.less',['testLess']);
});