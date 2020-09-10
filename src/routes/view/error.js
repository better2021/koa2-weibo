/**
 * @description 404 路由
 */

const router = require('koa-router')();

// error
router.get('/error', async (ctx, next) => {
  await ctx.render('error');
});

// 404 没有匹配到路由就会返回到404页面
router.get('*', async (ctx, next) => {
  await ctx.render('404');
});

module.exports = router;
