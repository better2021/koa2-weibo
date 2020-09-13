/**
 * @description user service
 */

const { User } = require('../db/model/index');
const { formatUser } = require('./_format');

/**
 * 获取用户信息
 * @param {string} userName
 * @param {string} password
 */
async function getUserInfo(userName, password) {
  // 查询条件
  const whereOpt = {
    userName,
  };

  if (password) {
    Object.assign(whereOpt, { password });
  }

  // 查询
  const result = await User.findOne({
    attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
    where: whereOpt,
  });

  if (result == null) {
    // 用户名未找到
    return result;
  }
  // 格式化
  const formatRes = formatUser(result.dataValues);
  return formatRes;
}

module.exports = {
  getUserInfo,
};
