const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, './demo.tsx')
fs.unlink(filePath,err => {
  if (!err) {
    console.log('删除成功')
  }
})