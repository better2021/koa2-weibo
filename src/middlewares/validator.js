/**
 * @description josn schema 验证中间件
 */

const { ErrorModel, ErrorMolde } = require('../model/ResModel');
const { jsonSchemaFileInfo } = require('../model/ErrorInfo');
/**
 *  josn schema 验证中间件
 * @param {function} validateFn 验证函数
 */
function genValidator(validateFn) {
  // 定义中间件函数
  async function validator(ctx, next) {
    // 用户信息校验
    const data = ctx.request.body;
    const error = validateFn(data);
    if (error) {
      // 验证失败
      ctx.body = new ErrorMolde(jsonSchemaFileInfo);
      return;
    }
    // 验证成功继续
    await next();
  }
  // 返回中间件
  return validator;
}

module.exports = {
  genValidator,
};
