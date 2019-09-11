var fs = require('fs');
var colorscaleramp = require('colorscaleramp');


fs.writeFile('test.json', `${colors}`, ()=>{} );
var colors = [];
colors = genRamp('#7986cb');

console.log('I ran');
console.log('this is the ramp',colorscaleramp.genRamp('#7986cb'));
console.log('this is a test',colorRamp);
//genRamp('#3C8081');