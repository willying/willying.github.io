## path模块
path模块提供了操作路径的功能，我们将介绍如下几个较为常用的api方法:
| API               | 说明       |
| ------------------ | ---------- |
| path.resolve    | 拼接规范的绝对路径 (常用) |
| path.sep | 获取操作系统的路径分隔符 |
| path.parse   | 解析路径并返回对象 |
| path.basename   | 获取路径的基础名称 |
| path.dirname   | 获取路径的目录名称 |
| path.extname   | 获取路径的扩展名 |

示例代码:

```js
const path = require('path');
console.log(path.resolve('a', 'b')); // E:\a\b
console.log(path.sep); // \
console.log(path.parse('E:\\a\\b\\c.html')); // { root: 'E:\\', dir: 'E:\\a\\b', base: 'c.html', ext: '.html', name: 'c' }
console.log(path.basename('E:\\a\\b\\c.html')); // c.html
console.log(path.dirname('E:\\a\\b\\c.html')); // E:\\a\\b
console.log(path.extname('E:\\a\\b\\c.html')); // .html
```

