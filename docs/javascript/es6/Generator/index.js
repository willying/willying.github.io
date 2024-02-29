const path = require('path')
const fs = require('fs')
const path1 = path.join(__dirname, 'index.txt')
const path2 = path.join(__dirname, 'index1.txt')

const thunk = function(pathname) {
  return function(callback) {
    fs.readFile(pathname, 'utf8', callback)
  }
}

function* f() {
  const data1 = yield thunk(path1)
  console.log(data1)
  const data2 = yield thunk(path2)
  console.log(data2)
}

function run(f) {
  const it = f()
  function nextStep(err,data) {
    const result = it.next(data)
    if (result.done) return
    result.value(nextStep)
  }
  nextStep()
}

run(f)