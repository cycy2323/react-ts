import * as express from 'express';
import * as webpackDevMiddleware from 'webpack-dev-middleware';
import * as webpackHotMiddleware from 'webpack-hot-middleware';
import * as webpack from 'webpack';
import { createProxyMiddleware } from 'http-proxy-middleware';
import * as colors from 'colors-console';
import * as path from 'path';
import webpackConfig from './webpack.dev';
import { PORT, proxyURI } from './config';

const app = express();
const compiler: webpack.Compiler = webpack(webpackConfig); // 初始化编译

// 跨域代理中间件
Object.keys(proxyURI).map(key => {
  app.use(
    key,
    createProxyMiddleware({ target: proxyURI[key], changeOrigin: true })
  );
});

// 使用webpack-dev-middleware中间件
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath
  })
);

// 使用webpack-hot-middleware中间件，配置在console台输出日志
app.use(
  webpackHotMiddleware(compiler, {
    log: console.log,
    path: '/__what',
    heartbeat: 10 * 1000
  })
);

// 使用静态资源目录
app.use(express.static(webpackConfig.output.path));

// 访问不存在路由全部指向html文件
app.use('*', function (req, res, next) {
  var filename = path.join(compiler.outputPath, 'index.html');
  (compiler.outputFileSystem as any).readFile(filename, function (err, result) {
    if (err) {
      return next(err);
    }
    res.set('content-type', 'text/html');
    res.send(result);
    res.end();
  });
});

app.listen(PORT, () => {
  console.log(colors('green', `成功启动：http://localhost:${PORT}`));
});
