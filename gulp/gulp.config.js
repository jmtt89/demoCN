import path from 'path';

const src = path.join(__dirname, '../app');
const dist = path.join(__dirname, '../dist');
const temp = path.join(__dirname, '../.tmp');

const AUTOPREFIXER = [
  'last 2 versions',
  'safari >= 7',
  'ie >= 9',
  'ff >= 30',
  'ios 6',
  'android 4'
];

const config = {
  src: src,
  dist: dist,
  temp: {
    base: temp,
    libs: path.join(temp, 'libs'),
    sass: path.join(temp, 'styles'),
    js: path.join(temp, 'scripts'),
    styles: [
      path.join(temp, 'libs', '*.css'),
      path.join(temp, 'styles', '*.css')
    ],
    scripts: [
      path.join(temp, 'libs', '*.js'),
      path.join(temp, 'scripts', '*.js')
    ],
    images: [
      path.join(temp, 'images', '*.jpg'),
      path.join(temp, 'images', '*.png'),
      path.join(temp, 'images', '*.gif')
    ]
  },
  bowers: path.join(src, 'bower_components'),
  autoprefixer: AUTOPREFIXER,
  files: [
    path.join(src, '*.html')
  ],
  images:{
    src: [
      path.join(src, 'images/**/*.jpg'),
      path.join(src, 'images/**/*.jpeg'),
      path.join(src, 'images/**/*.png'),
      path.join(src, 'images/**/*.gif'),
    ],
    dest: path.join(dist, 'images')
  },
  styles: {
    src: path.join(src, 'sass/**/*.scss'),
    dest: path.join(dist, 'styles')
  },
  scripts: {
    src: path.join(src, 'scripts/**/*.js'),
    webpack: path.join(__dirname, '../webpack.config.js'),
    dest: path.join(dist, 'scripts')
  }
};

var env = {
  env: 'DEV'
};

module.exports = {
  config: config,
  env: env
};
