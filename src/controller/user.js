/**
 * @description user 的控制层
 */

const { getUserInfo, createUser } = require('../service/user');
const { SuccessModel, ErrorMolde } = require('../model/ResModel');
const {
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo,
  loginFailInfo,
} = require('../model/ErrorInfo');
const doCrypto = require('../utils/cryp');

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
    return new ErrorMolde(registerUserNameNotExistInfo);
  }
}

/**
 * 注册
 * @param {string} userName
 * @param {string} password
 * @param {number} gender 性别(1 男，2 女 ，3 保密)
 */
async function register({ userName, password, gender }) {
  const userInfo = await getUserInfo(userName);
  if (userInfo) {
    // 用户名已存在
    return ErrorMolde(registerUserNameExistInfo);
  }

  try {
    await createUser({
      userName,
      password: doCrypto(password),
      gender,
    });
    return new SuccessModel();
  } catch (err) {
    console.error(err.message, err.stack);
    return new ErrorMolde(registerFailInfo);
  }
}

/**
 *
 * @param {object} ctx
 * @param {string} userName
 * @param {sting} password
 */
async function login(ctx, userName, password) {
  const userInfo = await getUserInfo(userName, password);
  if (!userInfo) {
    // 登录失败
    return new ErrorMolde(loginFailInfo);
  }

  // 登录成功
  if (ctx.session.userInfo == null) {
    ctx.session.userInfo = userInfo;
  }
  return new SuccessModel();
}

module.exports = {
  isExist,
  register,
  login,
};
