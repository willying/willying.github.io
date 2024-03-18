const fs = require("fs");
const path = require("path");
const directoryPath = path.join(__dirname, "./page/js/util");

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.log("读取文件夹错误", err);
    throw err;
  }
  let idx = 1;
  files.forEach(file => {
    const pathName = path.join(directoryPath, file);
    fs.stat(pathName, (err, stats) => {
      if (err) {
        console.log("读取文件状态错误");
        throw err;
      }
      if (stats.isDirectory()) return;
      const fileExt = path.extname(pathName);
      const fileExtWithoutDot = fileExt.slice(1);
      if (fileExtWithoutDot !== "js") return;
      const newFileName = path.join(
        directoryPath,
        `${idx}${path.basename(pathName)}`
      );
      idx++
      fs.rename(pathName, newFileName, (err) => {
        if (!err) {
          console.log("修改成功");
        } else {
          console.log(err);
        }
      });
    });
  });
});
