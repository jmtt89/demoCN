import gulp from 'gulp';
import {config, env} from './gulp.config';
import webpackStream from 'webpack-stream';
import sort from 'gulp-sort';
import webpack from 'webpack';
import sourcemaps from 'gulp-sourcemaps';
import concat from 'gulp-concat';

/**
 * @todo: file version, js linting before running webpack
 */

const _concat = () => {
  return gulp.src(config.temp.scripts)
    .pipe(sort({
        comparator: function(file1, file2) {
          console.log(file1.relative)
          console.log(file2.relative)
          var num1 = parseInt(file1.relative)
          var num2 = parseInt(file2.relative)

          if(!num1)
            return -1

          if(!num2)
            return -1

          return num1 - num2
        }
    }))
    .pipe(sourcemaps.init())
    .pipe(concat('main.min.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.scripts.dest));
};

const _webpack = () => {

  return gulp.src(config.scripts.src)
    .pipe(webpackStream({
      output: {
        filename: env.env === 'PROD' ? 'bundle.min.js' : 'bundle.js'
      },
      plugins: env.env === 'PROD' ? [
        new webpack.optimize.UglifyJsPlugin({minimize: true})
      ] : [],
      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
          }
        ]
      }
    }))
    .pipe(gulp.dest(config.temp.js));
};

const scripts = gulp.series(_webpack, _concat);

module.exports = scripts;
