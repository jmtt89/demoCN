import gulp from 'gulp';
import {config} from './gulp.config';
import del from 'del';
import mainBowerFiles from 'main-bower-files';
import rename from "gulp-rename";
import * as gutil from 'gulp-util';

const clean = () => {
	gutil.log('Cleaning workspace directory');

	return del([
		config.dist,
		config.temp.base
	]);
};

const bowerify = () => {
	var index = 0;
	return gulp.src(mainBowerFiles())
		.pipe(rename(function (path) {
	    path.basename = (index++)+"-"+path.basename;
 		}))
		.pipe(gulp.dest(config.temp.libs));
};

module.exports = {
	bowerify: bowerify,
	clean: clean
};
