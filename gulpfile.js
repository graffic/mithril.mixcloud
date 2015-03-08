'use strict';

var gulp = require('gulp');
var gulpIgnore = require('gulp-ignore');
var webpackBuild = require('gulp-webpack-build');
var webpack = require('webpack');
var path = require('path');
var WebpackDevServer = require("webpack-dev-server");

var config = {
  webpack: path.join(__dirname, webpackBuild.config.CONFIG_FILENAME),
  src: path.join(__dirname, 'src'),
  dest: path.join(__dirname, 'dist')
};

gulp.task('webpack', function() {
    return gulp.src(config.webpack)
        .pipe(webpackBuild.compile())
        .pipe(gulpIgnore.exclude(config.webpack))
        .pipe(gulp.dest(__dirname));
});

gulp.task('index', function() {
    return gulp.src(path.join(config.src, 'index.html'))
        .pipe(gulp.dest(config.dest));
});

gulp.task('dist',['webpack', 'index']);

gulp.task('serve', function() {
    var webpackConfig = require(config.webpack);
  new WebpackDevServer(webpack(webpackConfig), {
    contentBase: config.src
  }).listen(8080, "localhost",function(err) {
      console.log(err);
  });
});
