const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');

const { isProd } = require('./src/utils/env');

// 路由注册
const index = require('./src/routes/index');
const users = require('./src/routes/users');
const errorViewRouter = require('./src/routes/view/error');

// error handler
let onerrorConf = {};
if (isProd) {
  onerrorConf = {
    redirect: '/error',
  };
}
onerror(app, onerrorConf);

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
  })
);
app.use(json());
app.use(logger());

// 静态化后的目录可以直接访问，例如：http://localhost:3000/stylesheets/style.css
app.use(require('koa-static')(__dirname + '/src/public'));

app.use(
  views(__dirname + '/src/views', {
    extension: 'ejs',
  })
);

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes

app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods()); // 404的路由要注册在最底部

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
