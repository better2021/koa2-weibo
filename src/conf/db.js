/**
 * @description 存储配置
 * @time 2020/09/08
 */

const { isProd } = require('../utils/env');

let REDIS_CONF = {
  port: 6379,
  host: '127.0.0.1',
};

let MYSQL_CONF = {
  host: 'localhost',
  user: 'root',
  password: '709463253',
  port: '3306',
  database: 'koa2-weibo',
};

if (isProd) {
  // 线上的 redis 配置
  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1',
  };

  // 线上的 mysql 配置
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '709463253',
    port: '3306',
    database: 'koa2-weibo',
  };
}

module.exports = {
  REDIS_CONF,
  MYSQL_CONF,
};
