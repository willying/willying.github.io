const http = require('http')
const server = http.createServer((req,res) => {
  let body = ""
  // 获取请求方法
  console.log('method', req.method)
  // 获取请求url
  console.log('url', req.url)
  // 获取请求头
  console.log('header', req.headers)
  // 获取URL路径
  console.log('url路径', require('url').parse(req.url).pathname)
  // 获取查询字符串参数
  console.log('query', require('url').parse(req.url, true).query)
  // 获取请求版本
  console.log('httpVersion', req.httpVersion)

  req.on('data', (data) => {
    body += data
  })
  req.on('end', function() {
    console.log('body', body.toString())
    console.log('请求体获取完毕')
  })
  res.setHeader('Content-Type', 'text/plan;charset=utf-8')
  res.end('你好，世界')
})

server.listen(9000, function() {
  console.log('服务器启动成功...')
})