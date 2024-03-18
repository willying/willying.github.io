const fs = require('fs');

const ws = fs.createWriteStream('观书有感.txt');
ws.write('床前明月光；\n');
ws.write('疑是地上霜；\n');
ws.write('举头望明月；\n');
ws.write('低头思故乡。\n');
ws.end() // 关闭通道

ws.on('finish', () => {
  console.log('写入成功')
})

ws.on('error', (err) => {
  console.log('写入失败', err)
})