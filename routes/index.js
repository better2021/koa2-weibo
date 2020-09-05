const router = require('koa-router')();

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
  });
});

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string';
});

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json',
  };
});

router.get('/profile/:userName/:pageIndex', async (ctx, next) => {
  const { userName, pageIndex } = ctx.params;
  ctx.body = {
    tltle: 'this is profile page',
    userName,
    pageIndex,
  };
});

router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body;
  // 登录验证的逻辑
  ctx.body = {
    tag: 100,
    userName,
    password,
  };
});

module.exports = router;
