const fs = require("fs");
const process = require('process')
const fileName = "Matilda-Ghost.mggl";
const path = require("path");
const rs = fs.createReadStream(path.resolve(__dirname, fileName));
const directoryPath = "../资料";
const filePath = path.join(directoryPath, fileName);

fs.mkdir(directoryPath, { recursive: true }, (err) => {
  if (err) throw err;
  const ws = fs.createWriteStream(filePath);
  rs.on("data", (chunk) => {
    ws.write(chunk);
  });
  rs.on("end", () => {
    console.log("file write over");
    ws.close(); // 结束文件写入流
    rs.close(); // 结束文件读取流
    console.log(process.memoryUsage()); // 查看内存占用
  });
  rs.on("error", (err) => {
    console.log("文件写入失败", err);
  });
});
