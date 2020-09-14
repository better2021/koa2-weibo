/**
 * @description 登录验证中间件
 */

const { ErrorMolde } = require('../model/ResModel');
const { loginCheckFailInfo } = require('../model/ErrorInfo');
/**
 * 登录验证
 * @param {object} ctx
 * @param {function} next
 */
async function loginCheck(ctx, next) {
  if (ctx.session && ctx.session.userInfo) {
    // 一登录
    await next();
    return;
  }
  // 未登录
  ctx.body = new ErrorMolde(loginCheckFailInfo);
}

/**
 * 页面登录验证
 * @param {object} ctx
 * @param {function} next
 */
async function loginRedirect(ctx, next) {
  if (ctx.session && ctx.session.userInfo) {
    // 一登录
    await next();
    return;
  }
  // 未登录
  const curUrl = ctx.url;
  ctx.redirect('/login?url=' + encodeURIComponent(curUrl));
}

module.exports = {
  loginCheck,
  loginRedirect,
};
