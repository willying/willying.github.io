const fs = require('fs')
const path = require('path')
const filename = '毛不易-无名的人.mggl';
const oldpath = path.join(__dirname, filename);
const newpath = path.join(__dirname, '../', filename);
fs.rename(oldpath, newpath, err => {
  if (!err) {
    console.log('移动成功')
  }
})