var net = require('net')

/**
 * TCP全名为传输控制协议，在七层模型中属于传输层协议
 * TCP是面向连接的协议，其显著的特征是在传输之前需要3次握手形成会话
 * 会话完成之后，服务器端和客户端之间才能互相发送数据
 * 在创建会话的过程中，服务器端和客户端分别提供一个套接字，共同形成一个连接
 */
/**
 * 创建TCP服务器端
 */
var server = net.createServer(function (socket) {
    // 新的连接
    socket.on('data', function (data) {
        console.log('接收客户端发送的信息：', data.toString())
        socket.write('你好，' + data.toString())
    })
    socket.on('end', function () {
        console.log('连接断开')
    })
    socket.on('error', function (error) {
        console.log('出现错误：', error)
    })
    console.log('客户端已连接')
    socket.write('已连接TCP服务\n')
    socket.pipe(socket)
    socket.setNoDelay(true)
})
server.listen(8124, function () {
    console.log('server bound')
})
// 我们通过net.createServer(listener)即可创建一个TCP服务器，listener是连接事件connection的侦听器
/**
 * 服务器事件
 * 对于通过net.createServer()创建的服务器而言，它是一个eventEmitter实例，它的自定义事件有如下几种
 *
 * 1. listeing：在调用server.listen()绑定端口或者Domain Socket后触发，简洁写法为server.listen(port, listeningListener)，通过listen()方法的第二个参数传入
 *
 * 2. connection：每个客户端套接字连接到服务器端时触发，简洁写法为通过net.createServer()，最后一个参数传递
 *
 * 3. close：当服务器关闭时触发，在调用server.close()后，服务器将停止接收新的套接字连接，但保持当前存在的连接，等待所有连接都断开后，会触发该事件
 *
 * 4. error：当服务器发生异常时，将会触发该事件。比如侦听一个使用中的端口，将会触发一个异常，如果不侦听error事件，服务器将会抛出异常
 */
/**
 * 连接事件
 * 服务器可以同时与多个客户端保持连接，对于每个连接而言是典型的可写可读Stream对象。Stream对象可以用于服务器端和客户端之间的通信，既可以通过data事件从一端读取另一端发来的数据，也可以通过write()方法从一端向另一端发送数据。它具有如下自定义事件
 *
 * 1. data：当一端用write()发送数据时，另一端会触发data事件，事件传递的数据即是write()发送的数据
 *
 * 2. connect：该事件用于客户端，当套接字与服务器端连接成功时会被触发
 *
 * 3. end：当连接中的任意一端发送了FIN数据时，将会触发该事件
 *
 * 4. drain：当任意一端调用write()发送数据时，当前这端会触发该事件
 *
 * 5. error：当异常发生时，触发该事件
 *
 * 6. close：当套接字完全关闭时，触发该事件
 *
 * 7. timeout：当一定时间后连接不再活跃时，该事件将会被触发，通知用户当前该连接已经被闲置了
 */