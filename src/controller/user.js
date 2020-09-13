/**
 * @description user 的控制层
 */

const { getUserInfo } = require('../service/user');
const { SuccessModel, ErrorMolde } = require('../model/ResModel');

/**
 * 用户名是否存在
 * @param {string} userName
 */
async function isExist(userName) {
  // 业务逻辑处理
  const userInfo = await getUserInfo(userName);
  if (!userInfo) {
    return new SuccessModel(userInfo);
  } else {
    return new ErrorMolde({
      errno: 1003,
      message: '用户已存在',
    });
  }
}

module.exports = {
  isExist,
};
