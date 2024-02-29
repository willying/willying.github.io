const { promisify } = require('util')
const path = require('path')
const { readFile } = require('fs')
const file1 = path.join(__dirname,'./index1.txt')
const file2 = path.join(__dirname,'./index2.txt')
const readFileP = promisify(readFile)

function* f() {
  const data1 = yield readFileP(file1, 'utf-8')
  console.log('完成了1，数据是', data1)
  const data2 = yield readFileP(file2, 'utf-8')
  console.log('完成了2，数据是', data2)
}

async function fun () {
  const data1 = await readFileP(file1, 'utf-8')
  console.log('完成了1，数据是', data1)
  const data2 = await readFileP(file2, 'utf-8')
  console.log('完成了2，数据是', data2)
}
fun()
