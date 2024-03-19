const http = require('http')
const server = http.createServer((req,res) => {
  const url = new URL(`http://${req.headers.host}${req.url}`)
  console.log(url)
  res.end('hello http')
})
server.listen(9000,function() {
  console.log('服务启动成功....')
})