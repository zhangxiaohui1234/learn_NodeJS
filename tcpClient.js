var net = require('net')

var client = net.connect({ port: 8124 }, function () {
    console.log('服务器端连接成功')
    client.write('我连接上你了！\r\n')
})
client.on('data', function (data) {
    console.log('接收服务器端发送的信息：', data.toString())
})
client.on('end', function () {
    console.log('服务器端连接断开')
})