/**
 * @description utils controll
 */
const fse = require('fs-extra');
const path = require('path');
const { ErrorMolde, SuccessModel } = require('../model/ResModel');
const { uploadFileSizeFailInfo } = require('../model/ErrorInfo');
const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles');
const MAX_SIZE = 5 * 1024 * 1024; // 5MB 5兆

/**
 * 保存文件
 * @param {string} name 文件名
 * @param {number} size 文件大小
 * @param {string} type 文件类型
 * @param {string} filePath 文件路劲
 */
async function saveFile({ name, size, type, filePath }) {
  if (size > MAX_SIZE) {
    await fse.remove(filePath);
    return new ErrorMolde(uploadFileSizeFailInfo);
  }

  // 移动文件
  const fileName = Date.now() + '.' + name; // 防止重名
  const distFilePath = path.join(DIST_FOLDER_PATH, fileName);
  await fse.remove(filePath, distFilePath);

  // 返回信息
  return new SuccessModel({
    url: '/' + fileName,
  });
}

module.exports = {
  saveFile,
};
