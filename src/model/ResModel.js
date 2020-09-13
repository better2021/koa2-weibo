/**
 * @description res 的数据模型
 */

/**
 * 基础模块
 */
class BaseModel {
  constructor({ errno, data, message }) {
    this.errno = errno;
    if (data) {
      this.data = data;
    }
    if (message) {
      this.message = message;
    }
  }
}

/**
 * 成功后的数据模型
 */
class SuccessModel extends BaseModel {
  constructor(data = {}) {
    super({
      errno: 0,
      message: '用户名可用',
      data,
    });
  }
}

/**
 * 失败后的数据模型
 */
class ErrorMolde extends BaseModel {
  constructor({ errno, message }) {
    super({
      errno,
      message,
    });
  }
}

module.exports = {
  SuccessModel,
  ErrorMolde,
};
