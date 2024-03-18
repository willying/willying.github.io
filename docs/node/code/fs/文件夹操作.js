const fs = require('fs')

// fs.mkdir('./page', err => {
//   if (!err) {
//     console.log('创建成功')
//   }
// })

// // 递归创建
// fs.mkdir('./page/a/b/c', { recursive: true }, err => {
//   if(!err) {
//     console.log('递归创建')
//   }
// })

// 读取文件夹

// fs.readdir('./page/a/b/c', (err,data) => {
//   if (!err) {
//     console.log(data)
//   }
// })

// 删除文件夹
// 这个警告是因为在未来版本的Node.js中，fs.rmdir()方法将被弃用，建议使用fs.rm()方法来代替，特别是在需要递归删除目录时。fs.rm()方法提供了更通用的方式来处理文件和目录的删除操作。
fs.rmdir('./page', {recursive: true}, err => {
  if(!err) {
    console.log('删除成功')
  } else {
    console.log(err)
  }
})


