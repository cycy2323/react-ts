import * as gulp from 'gulp';
import * as gulpUtil from 'gulp-util';
import * as webpack from 'webpack';
import testConfig from './webpack.test';
import betaConfig from './webpack.beta';
import prodConfig from './webpack.pord';
import gulpHashPlugin from './gulpHashPlugin';

function buildWebpack(webpackConfig: any, cb?: () => any): any {
  return webpack(webpackConfig, (err, stats) => {
    if (err) {
      throw new gulpUtil.PluginError('webpack', err);
    }
    gulpUtil.log(
      '[webpack]',
      stats.toString({
        colors: true,
        chunks: false
      })
    );
    if (cb) {
      cb();
    }
  }) as any;
}

// 测试环境webpack构建
gulp.task('webpack-test', cb => {
  return buildWebpack(testConfig, cb);
});

// 隔离环境webpack构建
gulp.task('webpack-beta', cb => {
  return buildWebpack(betaConfig, cb);
});

// 生产环境webpack构建
gulp.task('webpack-prod', cb => {
  return buildWebpack(prodConfig, cb);
});

// 为静态资源添加hash，防止cdn缓存
gulp.task('assets-cache-hash', cb => {
  gulp
    .src('../dist/**/*.*')
    .pipe(gulpHashPlugin(['.jpg', '.jepg', '.png', '.webp']))
    .pipe(gulp.dest('../dist'));
  cb();
});

// 测试环境打包
gulp.task('test', gulp.series('webpack-test', 'assets-cache-hash'));

// 隔离环境打包
gulp.task('beta', gulp.series('webpack-beta', 'assets-cache-hash'));

// 生产环境打包
gulp.task('prod', gulp.series('webpack-prod', 'assets-cache-hash'));
