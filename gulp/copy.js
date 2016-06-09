import gulp from 'gulp';
import {config} from './gulp.config';

const copy = () => {
  return gulp.src(config.files)
    .pipe(gulp.dest(config.dist));
};

const images = () =>{
	return gulp.src(config.images.src)
		.pipe(gulp.dest(config.images.dest));
}

module.exports = {
	copy: copy,
	images: images
};
