var myFind = require('./myFind');

/**
 * main
 */
var argPath = '.';
var conf = {
    type:'f',
    name:'json'
};
var result = myFind.findFile(argPath, conf);

console.log('app.js path:' + argPath);
console.log('       conf:', conf);
console.log('       result:');
for(var i=0;i<result.length;i++) {
    console.log(result[i]);
}
