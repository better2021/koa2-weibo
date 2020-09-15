/**
 * @description utils api 路由
 */

const router = require('koa-router')();
const koaFrom = require('formidable-upload-koa');

const { loginCheck } = require('../../middlewares/loginChecks');
const { saveFile } = require('../../controller/utils');

router.prefix('/api/utils'); // 路由前缀

// 上传图片
router.post('/upload', loginCheck, koaFrom(), async (ctx, next) => {
  const file = ctx.req.files['file'];
  if (!file) return;
  const { size, path, name, type } = file;
  // controll
  ctx.body = await saveFile({ size, filePath: path, name, type });
});

module.exports = router;
