const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const session = require('koa-generic-session');
const redisStore = require('koa-redis');

const { isProd } = require('./utils/env');
const { REDIS_CONF } = require('./conf/db');

// 路由引用
const index = require('./routes/index');
const userViewRouter = require('./routes/view/user');
const userAPIRouter = require('./routes/api/user');
const errorViewRouter = require('./routes/view/error');

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
app.use(require('koa-static')(__dirname + '/public'));

app.use(
  views(__dirname + '/views', {
    extension: 'ejs',
  })
);

// session 配置
app.keys = ['UIsdf_*1212#s'];
app.use(
  session({
    key: 'weibo.sid', // cookie name 默认为 koa.sid
    prefix: 'weibo:sess:', // redis key 的前缀，默认是 koa:sess:
    cookie: {
      path: '/', // `/`表示所有地址
      httpOnly: true, // 为true时表示只能通过服务端去改cookie
      maxAge: 24 * 60 * 60 * 1000, //过期时间单位ms
    },
    store: redisStore({
      all: `${REDIS_CONF.host}:${REDIS_CONF.port}`,
    }),
  })
);

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes 路由注册
app.use(index.routes(), index.allowedMethods());
app.use(userViewRouter.routes(), userViewRouter.allowedMethods());
app.use(userAPIRouter.routes(), userAPIRouter.allowedMethods());
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods()); // 404的路由要注册在最底部

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
