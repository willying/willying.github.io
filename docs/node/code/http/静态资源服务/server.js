const http = require("http");
const fs = require("fs");
const path = require("path");
const mimeType = {
  html: "text/html",
  css: "text/css",
  js: "text/javascript",
  png: "image/png",
  jpg: "image/jpg",
  gif: "image/gif",
  mp4: "video/mp4",
  mp3: "audio/mpeg",
  json: "application/json",
};
const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;
  const ext = path.extname(pathname).slice(1);
  const mime = mimeType[ext] || "application/octet-stream";
  res.writeHead(200, { "Content-Type": mime + ";charset=utf-8" });
  let content = "";
  let filepath = "";
  if (pathname === "/") {
    res.writeHead(303, { Location: "/index.html" });
  } else {
    filepath = path.join(__dirname, `/page/${pathname}`);
  }
  const rs = fs.createReadStream(filepath);
  rs.on("data", (chunk) => {
    content += chunk;
  });
  rs.on("end", () => {
    res.end(content);
  });
  rs.on("error", function () {
    res.statusCode = 500;
    res.end("文件读取失败");
  });
});
server.listen(9000, function () {
  console.log("服务启动成功....");
});
