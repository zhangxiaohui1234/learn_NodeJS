const fs = require('fs')

//读取
// 阻塞型，同步
const txt = fs.readFileSync('input.txt')

console.log('txt.toString', txt.toString());

// 非阻塞型，异步
fs.readFile('input.txt', 'utf-8', function (err, data) {
    if (err) return console.error(err)
    console.log('txt.toString', data.toString())
})
console.log('程序执行结束!')

if (typeof (window) === 'undefined') {
    console.log('node.js')
} else {
    console.log('browser')
}

// 写入
var str = 'Hello node.js'
fs.writeFile('output.txt', str, function (err) {
    if (err) {
        console.log('writeFile', err)
    }
})
// writeFile()的参数依次为文件名，需要写入的数据和回调函数。
// 如果传入的值是String，默认按照utf-8编码写入文件，如果传入buffer，则写入二进制文件。

// 读取图片等二进制文件
fs.readFile('ztfn.jpg', function (err, data) {
    if (err) {
        console.log(err)
    } else {
        console.log('ztfn.jpg', data)
        console.log(data.length + 'bytes')
        fs.writeFile('ztfn-2.jpg', data, function (err) {
            if (err) {
                console.log(err)
            }
        })
    }
})

// 获取文件大小，创建时间等信息
fs.stat('input.txt', function (err, stat) {
    if (err) {
        console.log(err)
    } else {
        // 是否是文件:
        console.log('isFile: ' + stat.isFile());
        // 是否是目录:
        console.log('isDirectory: ' + stat.isDirectory());
        if (stat.isFile()) {
            // 文件大小:
            console.log('size: ' + stat.size);
            // 创建时间, Date对象:
            console.log('birth time: ' + stat.birthtime);
            // 修改时间, Date对象:
            console.log('modified time: ' + stat.mtime);
        }
    }
})