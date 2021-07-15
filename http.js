var http = require('http')
var url = require('url')
var path = require('path')
var fs = require('fs')

var root = path.resolve(process.argv[2] || '.')

http.createServer((request, response) => {
    // 回调函数接收request和response对象,
    // 获得HTTP请求的method和url:
    console.log(request.method + ': ' + request.url);
    // 获取URL的path
    var pathName = url.parse(request.url).pathname
    console.log('pathName', pathName)
    // 获取文件路径
    var filePath = path.join(root, pathName)
    // 获取文件
    fs.stat(filePath, function (err, stats) {
        if (!err && stats.isFile()) {
            // 没有出错并且文件存在
            // 发送 http 头部，http 状态值：200 ：0k
            response.writeHead(200)
            // 将文件流导向response，response本身是一个writeableStream，可以直接用pipe
            fs.createReadStream(filePath).pipe(response)
        } else {
            // 出错了或者文件不存在:
            console.log('404 ' + request.url);
            // 发送404响应:
            response.writeHead(404);
            response.end('404 Not Found');
        }
    })
}).listen(8088)

// 终端打印如下信息
console.log('Server running at http://localhost:8088/');

/**
 * 文件服务器
 * 只需要解析request.url中的路径，然后在本地找到对应的文件，把内容发送出去就可以了
 * 解析url需要用到url模块，通过parse()将一个字符串解析为一个url对象
 */

var workDir = path.resolve('.') // 解析当前目录，/Users/zhangxiaohui/Desktop/codeLibrary/learn_NodeJS
var filePath = path.join(workDir, 'ztfn.jpg') // 组合完整的文件路径
