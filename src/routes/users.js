const router = require('koa-router')();

router.prefix('/users');

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!';
});

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response';
});

// 用户登录
router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body;
  if (userName === 'zhangsan' && password === 'abc') {
    ctx.body = '登录成功';
  } else {
    ctx.body = '登录失败';
  }
});

module.exports = router;
