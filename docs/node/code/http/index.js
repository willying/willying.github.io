const http = require('http')
const server = http.createServer((request, response) => {
  // request 请求报文的封装
  // response 响应报文的封装
  response.setHeader('Content-Type', 'text/plan;charset=utf-8')
  response.end('你好')
})

server.listen(9000, function() {
  console.log('服务器启动成功...')
})