var crypto = require('crypto')
var fs = require('fs')

/**
 * crypto模块的目的是为了提供通用的加密和哈希算法，
 * Nodejs用C/C++实现这些算法后，通过cypto这个模块暴露为JavaScript接口，这样用起来方便，运行速度也快。
 */

var txt = 'Hello, world!'

/**
 * md5是一种常见的哈希算法，用于给任意数据一个“签名“，
 * 这个签名通常用一个十六进制的字符串表示，
 * 如果要计算SHA1，只需要把'md5'改成'sha1'，就可以得到SHA1的结果
 */
var hash = crypto.createHash('md5')
// update()方法默认字符串编码为utf-8，也可以传入buffer
hash.update(txt)
console.log('md5: ', hash.digest('hex'))

/**
 * Hmac也是一种哈希算法，可以利用md5或sha1等哈希算法
 * 不同的是，Hmac还需要一个密钥
 * 只要密钥发生了变化，那么同样的输入数据也会得到不同的签名，因此，可以把Hmac理解为用随机数“增强”的哈希算法
 */
var hmac = crypto.createHmac('sha256', 'secret-key')
hmac.update(txt)
console.log('hmac: ', hmac.digest('hex'))

/**
 * aes是一种常用的对称加密算法，加解密都用同一个密钥
 * aes有很多不同的算法，如aes192，aes-128-ecb，aes-256-cbc，除了密钥之外还可以指定IV（Initial Vector），不同的系统只要IV不同，用相同的密钥加密相同的数据得到的加密结果也是不同的。
 * 加密的结果通常有两种表示方法：hex和base64，这些功能Nodejs全部支持
 * 但需要注意，如果加密双方的语言不同，要确认双方是否遵循同样的AES算法，字符串密钥和IV是否相同，加密后的数据是否统一为hex或base64格式
 */
function aesEncrypt(data, key) {
    var cipher = crypto.createCipher('aes192', key)
    var crypted = cipher.update(data, 'utf-8', 'hex')
    crypted += cipher.final('hex')
    return crypted
}
function aesDecrypt(encrypted, key) {
    var decipher = crypto.createDecipher('aes192', key)
    var decrypted = decipher.update(encrypted, 'hex', 'utf-8')
    decrypted += decipher.final('utf-8')
    return decrypted
}
var key = 'Password!'
var encrypted = aesEncrypt(txt, key)
var decrypted = aesDecrypt(encrypted, key)
console.log('Encrypted text: ' + encrypted)
console.log('Decrypted text: ' + decrypted)

/**
 * rsa算法是一种非对称加密算法，由一个私钥和一个公钥构成的密钥对，通过私钥加密，公钥解密，或者公钥加密，私钥解密。其中公钥可以公开，私钥必须保密
 * 非对称加密只需要每个人各自持有自己的私钥，公开自己的公钥，不需要像aes那样由两个人共享同一个密钥
 */
/**
 * 在使用Node进行RSA加密前，我们先要准备好私钥和公钥
 * 首先执行命令：openssl genrsa -aes256 -out rsa-key.pem 2048
 * 根据提示输入密码，这个密码的用来加密rsa密钥的，方式指定为aes256，密钥长度是2048位，输出rsa-key.pem文件
 * 第二步，通过第一步生成的rsa-key.pem文件，可以导出原始的私钥，命令：openssl rsa -in rsa-key.pem -outform PEM -out rsa-prv.pem，需要输入第一步的密码，就可以获得解密后的私钥
 * 第三步，输入命令：openssl rsa -in rsa-key.pem -outform PEM -pubout -out rsa-pub.pem，就获得了原始的公钥
 * 这样我们就得到了私钥文件rsa-prv.pem和公钥文件rsa-pub.pem，接下来实现非对称加密
 */
/**
 * 私钥加密，公钥解密
 */
// 从文件加载key
function loadKey(file) {
    // key实际上就是PEM编码的字符串
    return fs.readFileSync(file, 'utf-8')
}
var prvKey = loadKey('./rsa-prv.pem')
var pubKey = loadKey('./rsa-pub.pem')
// 使用私钥加密
let enc_by_prv = crypto.privateEncrypt(prvKey, Buffer.from(txt, 'utf-8'))
console.log('私钥加密: ', enc_by_prv.toString('hex'))
// 使用公钥解密
let dec_by_pub = crypto.publicDecrypt(pubKey, enc_by_prv)
console.log('公钥解密: ', dec_by_pub.toString('utf-8'))
/**
 * 公钥加密，私钥解密
 */
// 使用公钥加密
var enc_by_pub = crypto.publicEncrypt(pubKey, Buffer.from(txt, 'utf-8'))
console.log('公钥加密: ', enc_by_pub.toString('hex'))
// 使用私钥解密
var dec_by_prv = crypto.privateDecrypt(prvKey, enc_by_pub)
console.log('私钥解密: ', dec_by_prv.toString('utf-8'))

