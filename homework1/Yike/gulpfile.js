//引入本地安装的gulp
var gulp = require('gulp');
//引入本地安装的gulp-less
var less = require('gulp-less');
//引入本地安装的gulp-cssmin 压缩css
var cssmin = require('gulp-cssmin');
//引入本地安装的gulp-imagemin 压缩图片
var imagemin = require('gulp-imagemin');
//引入本地安装的gulp-uglify 压缩js
var uglify = require('gulp-uglify');
//引入本地安装的gulp-concat 合并js
var concat = require('gulp-concat');
//引入本地安装的gulp-htmlmin 压缩html
var htmlmin = require('gulp-htmlmin');
//引入本地安装的gulp-autoprefix  添加css私有前缀
var autoprefixer = require('gulp-autoprefixer');
//引入本地安装的gulp-rev  添加版本号
var rev = require('gulp-rev');
//引入本地安装的gulp-rev-collector  实现文本替换
var revCollector = require('gulp-rev-collector');
//合并文件
var useref = require('gulp-useref');
//对符合条件的内容进行 xx 操作
var gulpif = require('gulp-if');
//返回值gulp是一个对象，借助此对象的方法实现任务清单的定制
//通过一系列的方法实现

//定义任务(将less文件转成css)
//
//gulp4.0报错Did you forget to signal async completion?
//解决办法；添加一个done参数，并执行done();
//
gulp.task('less',function(done){
	/*console.log('学习gulp');*/
	// 借助gulp.src来指定less文件位置
	gulp.src('./public/less/*.less')
	// 借助gulp插件实现less文件转css的操作
		.pipe(less())
		//压缩css
		.pipe(cssmin())
		//添加css私有前缀
		.pipe(autoprefixer())
		.pipe(rev())
		//通过gulp.dest进行存储
		.pipe(gulp.dest('./release/public'))
		//收集版本更新前、后的名称变化 生成一个.json文件
		.pipe(rev.manifest())
		.pipe(gulp.dest('./release/rev'))
		done();
});

//压缩处理图片
gulp.task('image',function(done){
	// 借助gulp.src来指定images文件位置
	gulp.src('./public/images/**')
		.pipe(imagemin())
		.pipe(gulp.dest('./release/public/images'))
		done();
})

//合并js 压缩js
gulp.task('js',function(done){
	// 借助gulp.src来指定images文件位置
	gulp.src('./scripts/*.js')
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./release/public/js'))
		done();
})

//压缩html
gulp.task('html',function(done){
	// 借助gulp.src来指定文件位置
	gulp.src(['./index.html','./views/*.html'],{base:'./'})
		.pipe(htmlmin({ collapseWhitespace: true ,removeComments: true}))
		.pipe(gulp.dest('./release'))
		done();
})

//将html中引用的css文件，进行替换版本操作
//利用记录了版本变化信息的.json文件，进行替换版本操作
gulp.task('rev',function(done){
	gulp.src(['./release/rev/*.json','./release/**/*.html'],{base:'./release'})
		.pipe(revCollector())
		.pipe(gulp.dest('./release'))
		done();
})

gulp.task('useref',function(done){
	gulp.src('./index.html')
		.pipe(useref())
		//对符合条件的内容进行 xx 操作
		//把html中引用的js文件进行压缩操作
		.pipe(gulpif('*.js',uglify()))
		.pipe(gulp.dest('./release'))
		done();
})




