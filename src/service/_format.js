/**
 * @description 数据格式化
 */
const { DEFAULT_PICTURE } = require('../conf/constant');
/**
 * 用户默认头像
 * @param {Object} obj
 */
function _formatUserPicture(obj) {
  if (obj.picture == null) {
    obj.picture = DEFAULT_PICTURE;
  }
  return obj;
}

/**
 * 格式化用户信息
 * @param {*} list
 */
function formatUser(list) {
  if (list == null) {
    return list;
  }
  if (list instanceof Array) {
    return list.map(_formatUserPicture);
  }

  // 单个对象
  return _formatUserPicture(list);
}

module.exports = {
  formatUser,
};
