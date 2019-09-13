# colorRamp
Create a ramp of lightness and saturation from a single color
Recreates the css color non-seperable blending modes in a js only solution.

Ramp can be altered throguh the genRamp function.  This is where the constant for the grayscale the ramp is based on and the saturation values are held.
The values are returned in an array called colorRamp

-- to use --
var colorscaleramp = require('colorscaleramp');

var colors = colorscaleramp.genRamp('#7986cb');
console.log(colors);

Delete test to instantly save on precious bits!