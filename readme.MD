node-find-file
====

一个nodejs模块，类似find命令，实现了简单的查找功能

```js
var myFind = require('./myFind');

var argPath = '.';
var conf = {
    type:'f',
    name:'json'
};
var result = myFind.findFile(argPath, conf);
```
作用：在当前目录下查找包含'json'的文件。
