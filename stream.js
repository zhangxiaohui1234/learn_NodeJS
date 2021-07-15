var fs = require('fs')

/**
 * 流也是一个对象，我们只需要响应流的事件就可以了，流的特点是数据是有序的，必须依次读取，依次写入。
 */
// 打开一个流
var rs = fs.createReadStream('input.txt', 'utf-8')
// data事件表示流的数据已经可以读取了，data可能会触发多次，每次传递的chunk是流的一部分数据
rs.on('data', function (chunk) {
    console.log('data: ', chunk)
})
// end事件表示流已经到末尾了
rs.on('end', function () {
    console.log('END')
})
// error事件表示中间出错了
rs.on('error', function (err) {
    console.log('err', err)
})

// 写入一个流
var ws = fs.createWriteStream('streamOutput.txt', 'utf-8')
ws.write('使用Stream写入文本数据...\n')
ws.write('END.\n')
// ws.end()

/**
 * 将一个文件流和另一个文件流串起来，一个Readable流和一个Writable流串起来后，所有的数据自动从Readable流进入Writable流
 * 翻译一下就是把rs读出来的数据复制进ws创建的文件中
 */
rs.pipe(ws)