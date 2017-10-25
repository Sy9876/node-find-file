var fs = require('fs');
var pathObj = require('path');
var debugLevel=0;

var findFile = function(path, conf) {
    if(debugLevel) console.log('findFile. start.  path:' + path);

    // 解析参数，生成过滤器
    if(conf==null) {
        conf={};
    }
    var namePattern = conf.name; // -name 匹配字符串或正则表达式
    var type = conf.type; // -type  f/d
    var size = conf.size; // -size  暂不实现
    var date = conf.date; // -date  暂不实现
    var cb = conf.cb;     // -exec  暂不实现
    // 设置默认回调为打印
    if(! cb) {
        cb = function(data){console.log('[DEBUG] findFile.cb. ' + data)}
    }

    // 检查path
    if(! path) {
        console.error('[ERROR] path can not be empty');
        return [];
    }
    if(! fs.existsSync(path)) {
        console.error('[ERROR] path not exist');
        return [];
    }
    if(! fs.lstatSync(path).isDirectory()) {
        console.error('[ERROR] path is not a directory');
        return [];
    }

    // 根据参数设置过滤器。返回true/false
    var filter = function(filename, stat) {

        // 检查type
        if(type=='f' && !stat.isFile()) {
            return false;
        }
        if(type=='d' && !stat.isDirectory()) {
            return false;
        }

        // 检查name
        if(namePattern && !filename.match(namePattern)) {
            return false;
        }

        return true;
    }

    var result = [];
    processDir(result, path, filter);
    
    if(debugLevel) {
        console.log('findFile. end.  path:' + path);
        console.log('          conf:', conf);
        console.log('          result:');
        for(var i=0;i<result.length;i++) {
            console.log(result[i]);
        }
    }
    
    return result;
}
var processDir = function(result, path, filter) {
    // console.log('processDir. start. path:' + path);
    var files = fs.readdirSync(path);

    for(var i=0;i<files.length;i++) {
        var pathname = path + pathObj.sep + files[i];
        var stat = fs.lstatSync(pathname);
        if(filter(files[i], stat)) {
            result.push(pathname);
        }
        // 递归子目录
        if(stat.isDirectory()) {
            processDir(result, pathname, filter);
        }
    }
}

exports.findFile = findFile;
