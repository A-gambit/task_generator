var gulp = require('gulp')
var del = require('del')
var webpack = require('webpack')
var watch = require('gulp-watch')

gulp.task('clean', function(cb) {
  del(['dist/'], cb)
})

gulp.task('client',function (done) {
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
          loaders: ['babel?optional=runtime&stage=0']
        }
      ]
    },
    devtool: 'source-map'
  }
  config.module.loaders[0].loaders.unshift('react-hot')
  webpack(config, function () { done() })
})

gulp.task('watch', function() {
  watch('./src/**/*.js',function () {
    gulp.start('client')
  })
})


gulp.task('default', ['clean','client', 'watch'])
