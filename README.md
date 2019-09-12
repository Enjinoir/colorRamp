# colorRamp
Create a ramp of lightness and saturation from a single color

add as dependency and pass a color to the main function to generate the ramp.

Ramp can be altered throguh the genRamp function.  This is where the constant for the grayscale the ramp is based on and the saturation values are held.

returns final color, use like below to call function on single color
example: genRamp('#3C8081');
The values are returned in an array called colorRamp

//genRamp('#3C8081');
//console.log('look at this ramp', colorRamp);