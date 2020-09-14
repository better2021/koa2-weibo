/**
 * @description user 页面的路由配置
 */

const router = require('koa-router')();
const { loginRedirect } = require('../../middlewares/loginChecks');

/**
 * 获取登录信息
 * @param {object} ctx
 */
function getLoginInfo(ctx) {
  const data = {
    isLogin: false, //  默认未登录
  };
  const userInfo = ctx.session.userInfo;
  if (userInfo) {
    data = {
      isLogin: true,
      userName: userInfo.userName,
    };
  }
  return data;
}

router.get('/login', async (ctx, next) => {
  await ctx.render('login', getLoginInfo(ctx));
});

router.get('/register', async (ctx, next) => {
  await ctx.render('register', getLoginInfo(ctx));
});

router.get('/setting', loginRedirect, async (ctx, next) => {
  await ctx.render('setting', ctx.session.userInfo);
});

module.exports = router;
