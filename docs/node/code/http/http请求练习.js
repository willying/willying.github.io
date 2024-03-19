const http = require('http')
const server = http.createServer((req, res) => {
  const url = new URL(`http://${req.headers.host}${req.url}`)
  const method = req.method
  const pathname = url.pathname
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  if (pathname === '/login' && method === 'GET') {
    res.end('登录页面')
  } else if(pathname === '/reg' && method === 'GET') {
    res.end('注册页面')
  } else {
    res.writeHead(404)
    res.end('404 Not Found')
  }
})
server.listen(9000, function() {
  console.log('服务启动成功...')
})