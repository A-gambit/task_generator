var gulp = require('gulp')
var del = require('del')
var webpack = require('webpack')
var watch = require('gulp-watch')

var config = {
  entry: './src/index.js',
  output: {
    path: 'dist',
    filename: 'bundle.js',
    devtoolModuleFilenameTemplate: '[resource-path]',
    publicPath: '/js/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['react-hot','babel?optional=runtime&stage=0']
      }
    ]
  },
  devtool: 'source-map'
}

gulp.task('clean', function (cb) {
  del(['dist/'], cb)
})

gulp.task('client',function (done) {
  webpack(config, function () { done() })
})

gulp.task('watch', function () {
  watch('./src/**/*.js',function () {
    gulp.start('client')
  })
})


gulp.task('default', ['clean','client', 'watch'])
