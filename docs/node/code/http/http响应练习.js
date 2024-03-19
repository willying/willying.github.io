const http = require("http");
const fs = require("fs");
const path = require("path");
const server = http.createServer((req, res) => {
  const filepath = path.resolve(__dirname, "./index.html");
  const rs = fs.createReadStream(filepath);
  let content = "";
  rs.on("data", (chunk) => {
    content += chunk.toString();
  });
  rs.on("end", function () {
    res.end(content);
    rs.close();
  });
});

server.listen(9000, function () {
  console.log("服务启动成功....");
});
