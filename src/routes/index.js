const router = require('koa-router')();

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
    msg: '你好',
    name: 'xiaoming',
    isMe: true,
    blogList: [
      {
        id: 1,
        title: 'aaa',
      },
      {
        id: 2,
        title: 'bbb',
      },
      {
        id: 3,
        title: 'ccc',
      },
      {
        id: 4,
        title: 'ddd',
      },
    ],
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
