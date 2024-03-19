const http = require('http')
const server = http.createServer((req, res) => {
  // 设置响应状态码
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.setHeader('Server-List', 'WillYingServer')
  res.end('hello will')
})
server.listen(9000, function() {
  console.log('服务启动成功...')
})