var fs = require('fs');
var colorscaleramp = require('colorscaleramp');

console.log('I ran');
colorscaleramp.genRamp('#7986cb');

console.log('I ran');
console.log('this is the ramp',colorscaleramp.genRamp('#7986cb'));
fs.writeFile('test.txt', `${colorscaleramp.colorRamp}`, ()=>{} );

//genRamp('#3C8081');ofd
