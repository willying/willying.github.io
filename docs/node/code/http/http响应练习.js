const http = require("http");
const fs = require("fs");
const path = require("path");
const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname
  let content = "";
  if (pathname === '/favicon.ico') {
    res.statusCode = 404
  } else {
    const rs = fs.createReadStream(path.join(__dirname, pathname === '/' ? '/index.html': pathname));
    rs.on('data', chunk => {
      content += chunk
    })
    rs.on('end', () => {
      res.end(content)
    })
  }
});

server.listen(9000, function () {
  console.log("服务启动成功....");
});
