## HTTP 协议(Hypertext Transfer Protocol)

## http 报文内容

![http请求报文](/http.png)
![http请求行](/请求行.png)

### 请求方法

| 方法      | 作用             |
| --------- | ---------------- |
| GET       | 主要用于获取数据 |
| POST      | 主要用于提交数据 |
| PUT/PATCH | 主要用于更新数据 |
| DELETE    | 主要用于删除数据 |

### URL 统一资源定位符

```js
// https(协议)://www.baidu.com(主机名)/(路径)
// https[协议]://(search.jd.com)[主机名（域名|IP地址）]:443[端口号]/（search）[路径]?（keyword=oneplus&psort=3）[查询字符串]
```
### http版本号

| 版本号      | 发布时间             |
| --------- | ---------------- |
| 1.0       | 1996年 |
| 1.1      | 1999年 |
| 2 | 2015年 |
| 3    | 2018年 |