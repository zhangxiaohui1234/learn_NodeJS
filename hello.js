const http = require('http')

http.createServer((request, response) => {
  // 发送 http 头部
  // http 状态值：200 ：0k
  // 内容类型：text/plain
  response.writeHead(200, { 'Content-Type': 'text/plain' })

  // 发送响应数据 “Hello World”
  response.end('Hello World !')
}).listen(8088)

// 终端打印如下信息
console.log('Server running at http://localhost:8088/');