const path = require('path')

console.log(path.resolve(__dirname,'a.html'))
console.log(path.resolve(__dirname,'./a.html'))
console.log(path.resolve(__dirname,'../a.html'))

console.log(path.resolve(__dirname,'/a.html'))

console.log(path.sep)
console.log(path.parse("/Users/will/front/vuepress-starter/docs/node/code/path/a.html"))

console.log(path.basename("/Users/will/front/vuepress-starter/docs/node/code/path/a.html"))
console.log(path.extname("/Users/will/front/vuepress-starter/docs/node/code/path/a.html"))

console.log(path.dirname("/Users/will/front/vuepress-starter/docs/node/code/path/a.html"))