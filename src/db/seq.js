/**
 * @description sequelize 实例
 * @time 2020/09/08
 */

const Sequelize = require('sequelize');
const { MYSQL_CONF } = require('../conf/db');
const { isProd } = require('../utils/env');

const { host, user, password, database } = MYSQL_CONF;
const conf = {
  host,
  dialect: 'mysql',
};

//  线上环境使用连接池
if (isProd) {
  conf.pool = {
    max: 5, // 连接池中最大连接数
    min: 0, // 最小连接数
    idle: 10000, // 如果一个连接池10秒钟之内没有被使用，则释放
  };
}

const seq = new Sequelize(database, user, password, conf);

module.exports = seq;
