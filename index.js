const fs = require('fs')

// 阻塞型
const txt = fs.readFileSync('input.txt')

console.log('txt', txt);
console.log('txt.toString', txt.toString());

// 非阻塞型