const fs = require("fs");
const rs = fs.createReadStream("./毛不易-无名的人.mggl", "utf-8");

rs.on("data", (data) => {
  console.log(data.length);
});

rs.on("end", () => {
  console.log("文件读取完毕"); // 65536Byte === 64KB
  rs.close();
});

// fs.readFile('./观书有感.txt','utf-8', (err,data) => {
//   if(!err) {
//     console.log(data)
//   }
// })
// const data = fs.readFileSync('./观书有感.txt','utf-8')
// console.log(data)
