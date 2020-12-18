import * as through2 from 'through2';

export default function gulpHashPlugin(exp: Array<string>) {
  return through2.obj((file, encoding, cb) => {
    // 将文件内容转成字符串
    const content = file.contents.toString('utf8');
    // 传进来的扩展名数组连接起来
    const joinEep = exp.join('|');
    // 生成替换文本正则
    const rep = new RegExp(`(${joinEep})([\'|\"|\)])`, 'g');
    // 替换内容
    const repContent = content.replace(rep, `$1?v=${new Date().getTime()}$2`);

    // 重新赋值文件内容
    file.contents = new Buffer(repContent);
    return cb(null, file);
  });
}
